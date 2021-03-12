import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import getGuideActions from '../../../redux/pageCms/guide/getGuide'
import Table from '../../../components/ui/table/index'
import PageTitle from '../../../components/ui/pageTitle'

/**
 *
 *
 * @param {*} { lng, intl, history, filtredTable, getGuide }
 * @returns
 */
const Index = ({ lng, intl, history, filtredTable, getGuide }) => {
    const type = 'listQuide'
    /* hooks member */
    const [rows, setRows] = useState([])

    const headers = [
        intl.formatMessage({ id: 'nomGuide' }),
        intl.formatMessage({ id: 'typeGuide' }),
        intl.formatMessage({ id: 'dateCreaction' }),
        'إختيار',
    ]

    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                nomAr: item.nomAr,
                descriptionAr: item.descriptionAr,
                createdAt: item.createdAt,
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getGuide()
    }, [])
    /* life cycle */
    useEffect(() => {
        if (filtredTable) {
            setTable(filtredTable)
        }
    }, [filtredTable])
    /* functions */
    /**
     * screen d'edit
     *
     * @param {*} row
     */
    const editAction = row => {
        history.push({
            pathname: `/guide/edit`,
            state: {
                index: filtredTable[row.index],
            },
        })
    }

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="دليل المصرح" />
            </Grid>
            <div style={{ marginTop: '3%' }} />
            <Table
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                intl={intl}
                type={type}
                editAction={editAction}
                pagination={false}
            />
        </div>
    )
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        allReferenciels: state.referencial.allReferencials.response,
        lng: state.info.language,
        filtredTable: state.pageCms.guide.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getGuide: payload => dispatch(getGuideActions.getGuideRequest(payload)),
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    filtredTable: [],
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    filtredTable: PropTypes.array,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getGuide: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
