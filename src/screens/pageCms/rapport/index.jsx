import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import ButtonComponent from '../../../components/ui/button'
import getRapportContenuActions from '../../../redux/pageCms/rapport/getRapport'
import deleteRapportActions from '../../../redux/pageCms/rapport/deleteRapport'
import Table from '../../../components/ui/table/index'
import PageTitle from '../../../components/ui/pageTitle'
import alertActions from '../../../redux/alert'

/**
 *
 *
 * @param {*} { lng, intl, history, filtredTable, getRapportContenu, alertShow, alertHide }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    getRapportContenu,
    deleteRapport,
    alertShow,
    alertHide,
}) => {
    const type = 'listRapport'
    /* hooks member */
    const [rows, setRows] = useState([])
    const headers = [
        intl.formatMessage({ id: 'nomRapport' }),
        intl.formatMessage({ id: 'dateCreaction' }),
        'إختيار',
    ]

    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                nomAr: item.nomAr,
                createdAt: item.createdAt,
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getRapportContenu()
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
            pathname: `/rapport/edit`,
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
            title: `هل أنت متأكد من حذف ${item.nomAr}`,
            onConfirm: () => {
                deleteRapport(item.id)
                setTimeout(() => {
                    alertHide()
                    getRapportContenu()
                }, 2000)
            },
        })
    }

    /**
     * add
     *
     * @param {*} row
     */
    const addRapport = () => {
        history.push({
            pathname: `/rapport/new`,
        })
    }

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="التقارير " />
            </Grid>
            <div style={{ marginTop: '3%' }} />
            <div style={{ marginTop: '42px' }}>
                <ButtonComponent
                    color="white"
                    type="contained"
                    size="medium"
                    label="إضافة"
                    clicked={() => addRapport()}
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
        filtredTable: state.pageCms.Rapport.response,
        lng: state.info.language,
        allReferenciels: state.referencial.allReferencials.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getRapportContenu: payload =>
        dispatch(getRapportContenuActions.deleteRapportContenuRequest(payload)),
    deleteRapport: payload =>
        dispatch(deleteRapportActions.deleteRapportRequest(payload)),
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
    getRapportContenu: PropTypes.func.isRequired,
    deleteRapport: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
