import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import ButtonComponent from '../../../components/ui/button'
import getFaqActions from '../../../redux/pageCms/faq/getFaq'
import deleteFaqActions from '../../../redux/pageCms/faq/deleteFaq'
import Table from '../../../components/ui/table/index'
import PageTitle from '../../../components/ui/pageTitle'
import alertActions from '../../../redux/alert'

/**
 *
 *
 * @param {*} { lng, intl, history, filtredTable, getFaq, alertHide, alertShow }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    getFaq,
    deleteFaq,
    alertHide,
    alertShow,
}) => {
    const type = 'listFaq'
    /* hooks member */
    const [rows, setRows] = useState([])

    const headers = [
        'المحور',
        'الموضوع',
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
                theme: item.theme && item.theme.intituleAr,
                sujet: item.sujet && item.sujet.intituleAr,
                createdAt: item.createdAt && item.createdAt.substr(0, 11),
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getFaq()
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
            pathname: `/faq/edit`,
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
        console.log(item)
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: `هل أنت متأكد من حذف موضوع ${item.sujet}`,
            onConfirm: () => {
                deleteFaq(item.id)
                setTimeout(() => {
                    alertHide()
                    getFaq()
                }, 2000)
            },
        })
    }

    /**
     * add
     *
     * @param {*} row
     */
    const addFaq = () => {
        history.push({
            pathname: `/faq/new`,
        })
    }

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="اسئلة/اجوبة" />
            </Grid>
            <div style={{ marginTop: '3%' }} />
            <div style={{ marginTop: '42px' }}>
                <ButtonComponent
                    color="white"
                    type="contained"
                    size="medium"
                    label="إضافة"
                    clicked={() => addFaq()}
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
        filtredTable: state.pageCms.Faq.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getFaq: payload => dispatch(getFaqActions.getFaqRequest(payload)),
    deleteFaq: payload => dispatch(deleteFaqActions.deleteFaqRequest(payload)),
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
    getFaq: PropTypes.func.isRequired,
    deleteFaq: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
