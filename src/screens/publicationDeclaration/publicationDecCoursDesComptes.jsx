import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarationForPublicationActions from '../../redux/declaration_grab/getfilterDeclaration/getFilterDecForPublication'
import getUsersByRoleActions from '../../redux/user/getUsersByRole/index'
import publierDeclarationActions from '../../redux/publication/publierDeclaration'
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
 *     publierDeclarationReq,
 *     filtredTableForPublication,
 *     getfilterDeclarationForDeclaration,
 *     alertShow,
 *     alertHide,
 * }
 * @returns
 */
const PublicationDecCoursDesComptes = ({
    lng,
    intl,
    history,
    userAffect,
    allReferenciels,
    getUsersByRoleReq,
    publierDeclarationReq,
    filtredTableForPublication,
    getfilterDeclarationForDeclaration,
    alertShow,
    alertHide,
}) => {
    /* hook memeber */
    const type = 'publication'
    const listStatus = [
        {
            label: 'أول تصريح',
            value: 'premiere declaration',
        },
        {
            label: 'تغيير جوهري',
            value: 'changement substantiel',
        },
        {
            label: 'تجديد',
            value: 'renouvellement',
        },
        {
            label: 'رحيل',
            value: 'declaration depart',
        },
    ]
    const listStatusPublication = [
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
    const [payload, setPayload] = useState({ externe: true })
    const [arrayPubDec, setArrayPubDec] = useState([])
    const [meta, setMeta] = useState([])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [key, setKey] = useState('')
    const [order, setOrder] = useState('')

    const headers = [
        {
            id: 'codeDeclaration',
            label: intl.formatMessage({ id: 'codeDeclaration' }),
        },
        {
            id: 'createdAt',
            label: intl.formatMessage({ id: 'dateDec' }),
        },
        {
            id: 'prenomTripartite',
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
            id: 'status',
            label: intl.formatMessage({ id: 'status' }),
        },
        {
            id: 'listStatusPublication',
            label: intl.formatMessage({ id: 'stautPublication' }),
        },
        {
            id: 'action',
            label: 'إختيار',
        },
    ]
    /* set table */
    const search = intl.formatMessage({ id: 'search' })
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                codeDeclaration: item.codeDeclaration,
                createdAt: item.createdAt,
                prenomTripartite: `${item.prenomTripartite} ${item.nom}`,
                numCin: item.numCin ? item.numCin : item.numPassport,
                categorie: item.categorie.rang,
                fonction:
                    lng === 'ar'
                        ? item.fonction.intituleAr
                        : item.fonction.intituleFr,
                status: intl.formatMessage({ id: item.statutDeclaration }),
                listStatusPublication:
                    item.published === true ? 'تم النشر' : 'لم يتم النشر',
            }))
        }
        setRows(rowsTmp)
    }
    /* life cycle */
    useEffect(() => {
        getfilterDeclarationForDeclaration({
            externe: true,
            limit: 5,
            page: 1,
        })
        getUsersByRoleReq('ROLE_RESPONSABLE_PUBLICATION')
    }, [])

    /* life cycle */
    useEffect(() => {
        if (filtredTableForPublication) {
            setTable(filtredTableForPublication.data)
            setMeta(filtredTableForPublication.meta)
        }
    }, [filtredTableForPublication, userAffect])

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
        getfilterDeclarationForDeclaration({
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
        getfilterDeclarationForDeclaration({
            order,
            limit,
            page,
            key,
            searchData: value,
            externe: true,
        })
    }

    /**
     * publier declarations
     *
     */
    const publierDeclarationFn = () => {
        const data = {
            type: 'publication',
            declarations: arrayPubDec,
        }
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: 'هل أنت متأكد من تأكيد نشر القائمة المختارة',
            onConfirm: () => {
                publierDeclarationReq(data)
                setTimeout(() => {
                    getfilterDeclarationForDeclaration({
                        order,
                        limit,
                        page,
                        key,
                        searchData,
                        externe: true,
                    })
                    setArrayPubDec([])
                    alertHide()
                    setTable([])
                }, 2000)
            },
        })
    }

    /**
     * set array declarations
     *
     * @param {*} array
     */
    const setArrayPublicationDec = array => {
        setArrayPubDec(array)
    }

    /**
     * redirect to page verification declaration
     *
     * @param {*} { id, index }
     */
    const VerificationAction = ({ id, index }) => {
        history.push({
            pathname: `/cour_des_comptes/publication_du_declaration/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                type: 'publication',
                role: 'ROLE_RESPONSABLE_PUBLICATION',
                dataDeclaration: filtredTableForPublication.data[index],
                label: 'التصاريح',
            },
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterDeclarationForDeclaration({
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
                <PageTitle label="نشر التصاريح" />
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
                    listStatusPublication={listStatusPublication}
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
                            clicked={() => publierDeclarationFn()}
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
                    fn={VerificationAction}
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
        filtredTableForPublication:
            state.declarationGrab.filterDeclarations
                .getFilterDeclarationForPublication.response,
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
    getfilterDeclarationForDeclaration: payload =>
        dispatch(
            getFilterDeclarationForPublicationActions.getFilterDeclarationsForPublicationRequest(
                payload
            )
        ),
    getUsersByRoleReq: payload =>
        dispatch(getUsersByRoleActions.getUsersByRoleRequest(payload)),
    publierDeclarationReq: payload =>
        dispatch(publierDeclarationActions.publierDeclarationRequest(payload)),
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
PublicationDecCoursDesComptes.defaultProps = {
    userAffect: null,
    filtredTableForPublication: null,
}
/**
 *  declaration des props
 */
PublicationDecCoursDesComptes.propTypes = {
    intl: PropTypes.object.isRequired,
    userAffect: PropTypes.array,
    filtredTableForPublication: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getUsersByRoleReq: PropTypes.func.isRequired,
    publierDeclarationReq: PropTypes.func.isRequired,
    getfilterDeclarationForDeclaration: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(PublicationDecCoursDesComptes))
