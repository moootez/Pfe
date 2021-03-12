import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import SelectList from '../../../components/ui/select'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarationForVerificationtionActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForVerification'
import getUsersByRoleActions from '../../../redux/user/getUsersByRole/index'
import newAffectationActions from '../../../redux/affectation/newAffectation'
import Table from '../../../components/ui/table/table'
import ButtonComponent from '../../../components/ui/button'
import PageTitle from '../../../components/ui/pageTitle'

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
 *     newAffectationReq,
 *     filtredTableForVerification,
 *     getfilterDeclarationForVerification,
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
    newAffectationReq,
    filtredTableForVerification,
    getfilterDeclarationForVerification,
}) => {
    /* hooks member */
    const type = 'verification'
    const listStatus = [
        {
            label: 'مصادق عليها',
            value: 'validée',
        },
        {
            label: 'في إنتظار  التثبت',
            value: 'en attente de vérification',
        },
        {
            label: 'تامة التثبت',
            value: 'vérifiée',
        },
    ]
    const [inputClassName, setInputClassName] = useState('blured')
    const [ColorBorder, setColorBorder] = useState('red')
    const [searchData, setSearchData] = useState('')
    const [rows, setRows] = useState([])
    const [payload, setPayload] = useState({})
    const [user, setUser] = useState()
    const [listUser, setListUser] = useState([])
    const [arrayDecAff, setArrayDecAff] = useState([])
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
            id: 'statutDeclaration',
            label: intl.formatMessage({ id: 'status' }),
        },
        {
            id: 'action',
            label: 'إختيار',
        },
    ]

    const search = intl.formatMessage({ id: 'search' })
    /* set table */
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
                statutDeclaration: intl.formatMessage({
                    id: item.statutDeclaration,
                }),
            }))
        }
        setRows(rowsTmp)
    }

    /**
     * set list users
     *
     * @param {*} listUsers
     */
    const setListUsers = listUsers => {
        if (listUsers && listUsers.length > 0)
            setListUser(
                listUsers.map(item => ({
                    label: lng === 'ar' ? item.nomAr : item.nomFr,
                    value: item.id,
                }))
            )
    }

    /* life cycle */
    useEffect(() => {
        getfilterDeclarationForVerification({
            limit: 5,
            page: 1,
        })
        getUsersByRoleReq('ROLE_CONTROLEUR')
    }, [])
    /* life cycle */
    useEffect(() => {
        if (filtredTableForVerification) {
            setTable(filtredTableForVerification.data)
            setMeta(filtredTableForVerification.meta)
            setListUsers(userAffect)
        }
    }, [filtredTableForVerification, userAffect])

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
        getfilterDeclarationForVerification({
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
        getfilterDeclarationForVerification({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * select user
     *
     * @param {*} { target: { value } }
     */
    const handleSelectUser = ({ target: { value } }) => {
        setUser(value)
    }

    /**
     * affecter declaration to user
     *
     */
    const affectUserFn = () => {
        const data = {
            user,
            type: 'vérification',
            declarations: arrayDecAff,
        }
        newAffectationReq(data)
        setTimeout(() => {
            getfilterDeclarationForVerification({
                order,
                limit,
                page,
                key,
                searchData,
            })
            setArrayDecAff([])
            setTable([])
        }, 2000)
    }

    /**
     * set list declarations
     *
     * @param {*} array
     */
    const setArrayDecAffecter = array => {
        setArrayDecAff(array)
    }

    /**
     * redirect to page consule declaration
     *
     * @param {*} { id, index }
     */
    const VerificationAction = ({ id, index }) => {
        history.push({
            pathname: `/affectation_pour_verification/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                type: 'vérification',
                role: 'ROLE_RESPONSABLE_ATTRIBUTION_VERIFICATION',
                dataDeclaration: filtredTableForVerification.data[index],
                label: 'التوزيع للمراقبة',
            },
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterDeclarationForVerification({
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
                <PageTitle label="التوزيع للمراقبة" />
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
                    allReferenciels={allReferenciels}
                    fieldChangedHandler={fieldChangedHandler}
                    payload={payload}
                />
            </Grid>
            <Grid container>
                <Grid item xs={12} md={4} sm={4} className="gridItem">
                    <SelectList
                        onchange={e => {
                            handleSelectUser(e)
                        }}
                        selectedItem={user}
                        name="user"
                        required={false}
                        label="تعيين للتأكيد"
                        list={listUser}
                    />
                </Grid>
                <Grid item xs={12} md={4} sm={4} className="gridItem">
                    <div style={{ marginTop: '42px' }}>
                        <ButtonComponent
                            disabled={!user || arrayDecAff.length === 0}
                            color="white"
                            type="contained"
                            size="medium"
                            label="تأكيد "
                            clicked={() => affectUserFn()}
                        />
                    </div>
                </Grid>
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
                    setArrayDecAffecter={setArrayDecAffecter}
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
        filtredTableForVerification:
            state.declarationGrab.filterDeclarations
                .getFilterDeclarationForVerification.response,
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
    getfilterDeclarationForVerification: payload =>
        dispatch(
            getFilterDeclarationForVerificationtionActions.getFilterDeclarationsForVerificationRequest(
                payload
            )
        ),
    getUsersByRoleReq: payload =>
        dispatch(getUsersByRoleActions.getUsersByRoleRequest(payload)),
    newAffectationReq: payload =>
        dispatch(newAffectationActions.newAffectationRequest(payload)),
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    userAffect: null,
    filtredTableForVerification: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    userAffect: PropTypes.array,
    filtredTableForVerification: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getUsersByRoleReq: PropTypes.func.isRequired,
    newAffectationReq: PropTypes.func.isRequired,
    getfilterDeclarationForVerification: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
