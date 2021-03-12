import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../components/declaration/step_grab/homePage/Form'
import getFilterEtablissementActions from '../../redux/etablissement/getFiltreEtablissement'
import getUsersByRoleActions from '../../redux/user/getUsersByRole/index'
import addEtablissementActions from '../../redux/etablissement/addEtablissement'
import deleteEtablissementActions from '../../redux/etablissement/deleteEtablissement'
import publierEtablissementActions from '../../redux/etablissement/publierEtablissement'
import Table from '../../components/ui/table/table'
import ButtonComponent from '../../components/ui/button'
import PageTitle from '../../components/ui/pageTitle'
import alertActions from '../../redux/alert'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     userAffect,
 *     allReferenciels,
 *     getUsersByRoleReq,
 *     addEtablissementReq,
 *     filtredEtablissement,
 *     getfilterEtablissement,
 *     publierEtablissementReq,
 *     deleteEtablissementReq,
 *     alertHide
 *     alertShow
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    userAffect,
    allReferenciels,
    getUsersByRoleReq,
    addEtablissementReq,
    filtredEtablissement,
    getfilterEtablissement,
    publierEtablissementReq,
    deleteEtablissementReq,
    alertHide,
    alertShow,
}) => {
    /* hooks member */
    const type = 'publicationEtablissement'
    const [rows, setRows] = useState([])
    const [payload, setPayload] = useState({})
    const [arrayPubDec, setArrayPubDec] = useState([])
    const [meta, setMeta] = useState([])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [key, setKey] = useState('')
    const [order, setOrder] = useState('')
    const disabled = !!payload.ministere && !!payload.etablissement
    const listStatus = [
        {
            label: 'تم النشر',
            value: true,
        },
        {
            label: 'لم يتم النشر',
            value: false,
        },
    ]

    const headers = [
        {
            id: 'nomEtablissement',
            label: intl.formatMessage({ id: 'nomEtablissement' }),
        },
        {
            id: 'status',
            label: intl.formatMessage({ id: 'statusEtablissement' }),
        },
        {
            id: 'action',
            label: 'إختيار',
        },
    ]
    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                nomEtablissement: item.etablissement.intituleAr,
                status: item.published === true ? 'تم النشر' : 'لم يتم النشر',
            }))
        }
        setRows(rowsTmp)
    }
    /* life cycle */
    useEffect(() => {
        getfilterEtablissement({
            limit: 5,
            page: 1,
        })
        getUsersByRoleReq('ROLE_RESPONSABLE_PUBLICATION')
    }, [])
    /* life cycle */
    useEffect(() => {
        if (filtredEtablissement) {
            setTable(filtredEtablissement.data)
            setMeta(filtredEtablissement.meta)
        }
    }, [filtredEtablissement, userAffect])

    /* functions */

    /**
     * set payload
     *
     * @param {*} { target: { name, value } }
     */
    const fieldChangedHandler = ({ target: { name, value } }) => {
        if (name === 'categorie') {
            setPayload({ ...payload, [name]: value, fonction: [] })
            payload.fonction = []
        } else setPayload({ ...payload, [name]: value })
        if (name !== 'ministere' && name !== 'etablissement')
            getfilterEtablissement({
                ...payload,
                [name]: value,
                order,
                limit,
                page,
                key,
            })
    }

    /**
     * publier etablissement
     *
     */
    const publierEtablissementFn = () => {
        const data = {
            type: 'publicationEtablissement',
            listEtablissements: arrayPubDec,
        }
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: 'هل أنت متأكد من تأكيد نشر القائمة المختارة',
            onConfirm: () => {
                publierEtablissementReq(data)
                setTimeout(() => {
                    getfilterEtablissement({ order, limit, page, key })
                    setArrayPubDec([])
                    alertHide()
                    setTable([])
                }, 2000)
            },
        })
    }

    /**
     * supprimer etablissement
     *
     */
    const supprimerEtablissementFn = () => {
        const data = {
            type: 'publicationEtablissement',
            listEtablissements: arrayPubDec,
        }
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: 'هل أنت متأكد من حذف القائمة المختارة',
            onConfirm: () => {
                deleteEtablissementReq({ data })
                setTimeout(() => {
                    getfilterEtablissement({ order, limit, page, key })
                    setArrayPubDec([])
                    alertHide()
                    setTable([])
                }, 2000)
            },
        })
    }

    /**
     * add etablissement
     *
     */
    const addEtablissementFn = () => {
        addEtablissementReq(payload)
        setTimeout(() => {
            getfilterEtablissement({ order, limit, page, key })
            setArrayPubDec([])
            setTable([])
        }, 2000)
    }

    /**
     * set array etablissement
     *
     * @param {*} array
     */
    const setArrayPublicationDec = array => {
        setArrayPubDec(array)
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterEtablissement({
            ...payload,
            limit: index.limit,
            page: index.page,
            order: index.order,
            key: index.key,
        })
        setLimit(index.limit)
        setPage(index.page)
        setKey(index.key)
        setOrder(index.order)
    }

    /**
     *
     * cancel array
     */
    const cancel = () => {
        setArrayPubDec([])
        setTable([])
        getfilterEtablissement({
            ...payload,
            order,
            limit,
            page,
            key,
        })
    }
    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label=" المؤسسات المعنية بتضارب المصالح" />
            </Grid>
            <Grid container>
                <Form
                    type={type}
                    lng={lng}
                    intl={intl}
                    listStatus={listStatus}
                    allReferenciels={allReferenciels}
                    fieldChangedHandler={fieldChangedHandler}
                    payload={payload}
                />
            </Grid>
            <Grid container>
                <Grid item xs={12} md={3} sm={1} className="gridItem"></Grid>
                <Grid item xs={12} md={3} sm={5} className="gridItem">
                    <div style={{ marginTop: '42px' }}>
                        <ButtonComponent
                            disabled={!disabled}
                            color="white"
                            type="contained"
                            size="medium"
                            label="إضافة"
                            clicked={() => addEtablissementFn()}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={3} sm={5} className="gridItem">
                    <div style={{ marginTop: '42px' }}>
                        <ButtonComponent
                            disabled={arrayPubDec.length === 0}
                            color="white"
                            type="contained"
                            size="medium"
                            label="حذف"
                            clicked={() => supprimerEtablissementFn()}
                        />
                    </div>
                </Grid>
            </Grid>
            {(rows.length !== 0 || meta.pages === 0) && (
                <Table
                    lng={lng}
                    headers={headers}
                    rowsS={rows}
                    history={history}
                    intl={intl}
                    type={type}
                    setArrayDecAffecter={setArrayPublicationDec}
                    paramTab={paramConsultTab}
                    meta={meta}
                    array={arrayPubDec}
                />
            )}
            <Grid container>
                <Grid item xs={12} md={4} sm={4} className="gridItem"></Grid>
                <Grid item xs={12} md={2} sm={4} className="gridItem">
                    <div style={{ marginTop: '20px' }}>
                        <ButtonComponent
                            disabled={arrayPubDec.length === 0}
                            color="white"
                            type="contained"
                            size="medium"
                            label="إلغاء"
                            clicked={() => cancel()}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={2} sm={4} className="gridItem">
                    <div style={{ marginTop: '20px' }}>
                        <ButtonComponent
                            disabled={arrayPubDec.length === 0}
                            color="white"
                            type="contained"
                            size="medium"
                            label="نشر"
                            clicked={() => publierEtablissementFn()}
                        />
                    </div>
                </Grid>
            </Grid>
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
        filtredEtablissement:
            state.etablissement.getFilterEtablissement.response,
        userAffect: state.users.getUsersByRole.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getfilterEtablissement: payload =>
        dispatch(
            getFilterEtablissementActions.getFilterEtablissementRequest(payload)
        ),
    getUsersByRoleReq: payload =>
        dispatch(getUsersByRoleActions.getUsersByRoleRequest(payload)),
    addEtablissementReq: payload =>
        dispatch(addEtablissementActions.addEtablissementRequest(payload)),
    publierEtablissementReq: payload =>
        dispatch(
            publierEtablissementActions.publierEtablissementRequest(payload)
        ),
    deleteEtablissementReq: payload =>
        dispatch(
            deleteEtablissementActions.deleteEtablissementRequest(payload)
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
    userAffect: null,
    filtredEtablissement: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    userAffect: PropTypes.array,
    filtredEtablissement: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getUsersByRoleReq: PropTypes.func.isRequired,
    addEtablissementReq: PropTypes.func.isRequired,
    getfilterEtablissement: PropTypes.func.isRequired,
    publierEtablissementReq: PropTypes.func.isRequired,
    deleteEtablissementReq: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
