import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarantActions from '../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarant'
import getUsersByRoleActions from '../../redux/user/getUsersByRole/index'
import publierDeclarantActions from '../../redux/publication/publierDeclarant'
import alertActions from '../../redux/alert'
import Table from '../../components/ui/table/table'
import ButtonComponent from '../../components/ui/button'
import PageTitle from '../../components/ui/pageTitle'

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
 *     publierDeclarantReq,
 *     filtredTableDeclarant,
 *     getfilterDeclarant,
 *     alertShow,
 *     alertHide,
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
    publierDeclarantReq,
    filtredTableDeclarant,
    getfilterDeclarant,
    alertShow,
    alertHide,
}) => {
    /* hooks member */
    const type = 'publierDeclarant'
    const listStatus = [
        {
            label: 'تم إنجاز التصريح',
            value: 'déclaration accomplie',
        },
        {
            label: 'لم يتم إنجاز التصريح',
            value: 'non accomplie',
        },
    ]
    const listStatusPublicationDec = [
        {
            label: ' تم النشر',
            value: true,
        },
        {
            label: 'لم يتم النشر',
            value: false,
        },
    ]
    const [inputClassName, setInputClassName] = useState('blured')
    const [ColorBorder, setColorBorder] = useState('red')
    const [searchData, setSearchData] = useState('')
    const [rows, setRows] = useState([])
    const [payload, setPayload] = useState({})
    const [arrayPubDec, setArrayPubDec] = useState([])
    const [meta, setMeta] = useState([])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [key, setKey] = useState('')
    const [order, setOrder] = useState('')
    /* list header */
    const headers = [
        {
            id: 'codeDeclaration',
            label: intl.formatMessage({ id: 'codeDeclaration' }),
        },
        {
            id: 'user',
            label: intl.formatMessage({ id: 'declarant' }),
        },
        {
            id: 'numCin',
            label: intl.formatMessage({ id: 'cinOrPassport' }),
        },
        {
            id: 'categorie',
            label: intl.formatMessage({ id: 'categorie' }),
        },
        {
            id: 'fonction',
            label: intl.formatMessage({ id: 'fonction' }),
        },
        {
            id: 'etablissement',
            label: intl.formatMessage({ id: 'etablissement' }),
        },
        {
            id: 'declarant',
            label: intl.formatMessage({ id: 'status' }),
        },
        {
            id: 'publishedDeclarant',
            label: intl.formatMessage({ id: 'stautPublication' }),
        },
        {
            id: 'action',
            label: 'Choisir',
        },
    ]
    /* set table and input search */
    const search = intl.formatMessage({ id: 'search' })
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                codeDeclaration: item.codeInsc,
                nom: `${item.prenomTripartiteAr} ${item.nomAr}`,
                cin: item.numCin ? item.numCin : item.numPassport,
                categorie: item.categorie.rang,
                fonction:
                    lng === 'ar'
                        ? item.fonction.intituleAr
                        : item.fonction.intituleFr,
                etablissement:
                    lng === 'ar'
                        ? item.etablissement.intituleAr
                        : item.etablissement.intituleFr,
                declarant:
                    item.declarant === true
                        ? 'تم إنجاز التصريح'
                        : 'لم يتم إنجاز التصريح',
                publishedDeclarant:
                    item.publishedDeclarant === true
                        ? 'تم النشر'
                        : 'لم يتم النشر',
            }))
        }
        setRows(rowsTmp)
    }
    /* life cycle */
    useEffect(() => {
        getfilterDeclarant({
            limit: 5,
            page: 1,
        })
        getUsersByRoleReq('ROLE_RESPONSABLE_PUBLICATION')
    }, [])
    /* life cycle */
    useEffect(() => {
        if (filtredTableDeclarant) {
            setTable(filtredTableDeclarant.data)
            setMeta(filtredTableDeclarant.meta)
        }
    }, [filtredTableDeclarant, userAffect])

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
        getfilterDeclarant({
            ...payload,
            [name]: value,
            order,
            limit,
            page,
            key,
            searchData,
        })
    }
    /**
     * set style input search
     *
     */
    const onFocus = () => {
        setInputClassName('focused')
        setColorBorder('red')
    }
    /**
     * set style input search
     *
     */
    const onBlur = () => {
        setInputClassName('blured')
        setColorBorder('black')
    }

    /**
     * set value search
     *
     * @param {*} { target: { value } }
     */
    const searchChangedHandler = ({ target: { value } }) => {
        setSearchData(value)
        getfilterDeclarant({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * publier declarant
     *
     */
    const publierDeclarantFn = () => {
        const data = {
            type: 'publierDeclarant',
            users: arrayPubDec,
        }
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: 'هل أنت متأكد من تأكيد نشر القائمة المختارة',
            onConfirm: () => {
                publierDeclarantReq(data)
                setTimeout(() => {
                    getfilterDeclarant({ order, limit, page, key, searchData })
                    setArrayPubDec([])
                    alertHide()
                    setTable([])
                }, 2000)
            },
        })
    }

    /**
     * set array users
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
        getfilterDeclarant({
            ...payload,
            limit: index.limit,
            page: index.page,
            order: index.order,
            key: index.key,
            searchData,
        })
        setLimit(index.limit)
        setPage(index.page)
        setKey(index.key)
        setOrder(index.order)
    }

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="نشر المصرحين" />
                <label
                    htmlFor="form"
                    className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
                >
                    {intl.formatMessage({ id: 'dateDec' })}
                </label>
            </Grid>
            <Grid container>
                <Form
                    type={type}
                    lng={lng}
                    intl={intl}
                    listStatus={listStatus}
                    listStatusPublicationDec={listStatusPublicationDec}
                    allReferenciels={allReferenciels}
                    fieldChangedHandler={fieldChangedHandler}
                    payload={payload}
                />
            </Grid>
            <Grid container>
                <Grid item xs={12} md={4} sm={4} className="gridItem">
                    <div style={{ marginTop: '42px' }}>
                        <ButtonComponent
                            disabled={arrayPubDec.length === 0}
                            color="white"
                            type="contained"
                            size="medium"
                            label="نشر"
                            clicked={() => publierDeclarantFn()}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={4} sm={4} className="gridItem" />
                <Grid item xs={12} md={4} sm={4} className="gridItem">
                    <div style={{ marginTop: '42px' }}>
                        <input
                            onBlur={onBlur}
                            style={{
                                borderColor: ColorBorder,
                                height: 'calc(0.5em + 1.5rem + 2px)',
                            }}
                            onFocus={onFocus}
                            type="text"
                            className={`${'form-control  inputSearch '}${inputClassName}`}
                            onChange={searchChangedHandler}
                            id="search-refs"
                            placeholder={search}
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
                />
            )}
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
        filtredTableDeclarant:
            state.declarationGrab.filterDeclarations.getFilterDeclarant
                .response,
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
    getfilterDeclarant: payload =>
        dispatch(getFilterDeclarantActions.getFilterDeclarantRequest(payload)),
    getUsersByRoleReq: payload =>
        dispatch(getUsersByRoleActions.getUsersByRoleRequest(payload)),
    publierDeclarantReq: payload =>
        dispatch(publierDeclarantActions.publierDeclarantRequest(payload)),
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
    filtredTableDeclarant: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    userAffect: PropTypes.array,
    filtredTableDeclarant: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getUsersByRoleReq: PropTypes.func.isRequired,
    publierDeclarantReq: PropTypes.func.isRequired,
    getfilterDeclarant: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
