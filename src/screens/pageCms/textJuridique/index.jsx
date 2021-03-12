import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import ButtonComponent from '../../../components/ui/button'
import getTextJuridiqueActions from '../../../redux/pageCms/textJuridique/getTextJuridique'
import deleteTextJuridiqueActions from '../../../redux/pageCms/textJuridique/deleteTextJuridique'
import Table from '../../../components/ui/table/index'
import PageTitle from '../../../components/ui/pageTitle'
import alertActions from '../../../redux/alert'

/**
 *
 *
 * @param {*} { lng, intl, history, filtredTable, getTextJuridique, alertHide, alertShow }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    getTextJuridique,
    deleteTextJuridique,
    alertHide,
    alertShow,
}) => {
    const type = 'listTextJuridique'
    /* hooks member */
    const [rows, setRows] = useState([])

    const headers = [
        intl.formatMessage({ id: 'typeTextJuridique' }),
        intl.formatMessage({ id: 'nomTextJuridique' }),
        intl.formatMessage({ id: 'descTextJuridique' }),
        intl.formatMessage({ id: 'dateCreaction' }),
        'إختيار',
    ]

    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                nature: item.nature,
                nom: item.nomAr,
                contenuAr: item.contenuAr,
                createdAt: item.createdAt,
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getTextJuridique()
    }, [])

    /* life cycle */
    useEffect(() => {
        if (filtredTable) {
            setTable(filtredTable)
        }
    }, [filtredTable])

    /**
     * screen d'edit
     *
     * @param {*} row
     */
    const editAction = row => {
        history.push({
            pathname: `/textJuridique/edit`,
            state: {
                index: filtredTable[row.index],
            },
        })
    }

    /**
     * delete
     *
     * @param {*} row
     */
    const deleteRef = item => {
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: `هل أنت متأكد من حذف ${item.nom}`,
            onConfirm: () => {
                deleteTextJuridique(item.id)
                setTimeout(() => {
                    alertHide()
                    getTextJuridique()
                }, 2000)
            },
        })
    }

    /**
     * add
     *
     * @param {*} row
     */
    const addTextJuridique = () => {
        history.push({
            pathname: `/textJuridique/new`,
        })
    }

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="النصوص القانونية" />
            </Grid>
            <div style={{ marginTop: '3%' }} />
            <div style={{ marginTop: '42px' }}>
                <ButtonComponent
                    color="white"
                    type="contained"
                    size="medium"
                    label="إضافة"
                    clicked={() => addTextJuridique()}
                />
            </div>
            <Table
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                intl={intl}
                type={type}
                editAction={editAction}
                deleteRef={deleteRef}
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
        filtredTable: state.pageCms.TextJuridique.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getTextJuridique: payload =>
        dispatch(getTextJuridiqueActions.getTextJuridiqueRequest(payload)),
    deleteTextJuridique: payload =>
        dispatch(
            deleteTextJuridiqueActions.deleteTextJuridiqueRequest(payload)
        ),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
    alertHide: () => dispatch(alertActions.alertHide()),
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
    getTextJuridique: PropTypes.func.isRequired,
    deleteTextJuridique: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
