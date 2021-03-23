import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import SelectList from '../../../components/ui/select'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarationForValidationActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForValidation'
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
 *     filtredTableForValidation,
 *     getfilterDeclarationForValidation,
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
    filtredTableForValidation,
    getfilterDeclarationForValidation,
}) => {
    /* hooks member */
    const type = 'validation'
    const listStatus = [
        {
            label: 'مصادق عليها',
            value: 'validée',
        },
        {
            label: 'تمت مقاربتها',
            value: 'rapprochée',
        },
        {
            label: 'في إنتظار المصادقة',
            value: 'en attente de validation',
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
            label: 'Choisir',
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
        getfilterDeclarationForValidation({
            limit: 5,
            page: 1,
        })
        getUsersByRoleReq('ROLE_VALIDATEUR_DECLARATION')
    }, [])
    /* life cycle */
    useEffect(() => {
        if (filtredTableForValidation) {
            setTable(filtredTableForValidation.data)
            setMeta(filtredTableForValidation.meta)
            setListUsers(userAffect)
        }
    }, [filtredTableForValidation, userAffect])

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
        getfilterDeclarationForValidation({
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
        getfilterDeclarationForValidation({
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
            type: 'validation',
            declarations: arrayDecAff,
        }
        newAffectationReq(data)
        setTimeout(() => {
            getfilterDeclarationForValidation({
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
     * set array users
     *
     * @param {*} array
     */
    const setArrayDecAffecter = array => {
        setArrayDecAff(array)
    }

    /**
     * redirect to page affection
     *
     * @param {*} { id, index }
     */
    const validationAction = ({ id, index }) => {
        history.push({
            pathname: `/affectation_pour_validation/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                type: 'validation',
                role: 'ROLE_REPONSABLE_AFFECTATION_VALIDATION',
                dataDeclaration: filtredTableForValidation.data[index],
                label: 'التوزيع للتثبت',
            },
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterDeclarationForValidation({
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

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="التوزيع للتثبت" />
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
                        onchange={handleSelectUser}
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
                            color="secondary"
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
                    searchData={searchData}
                    setArrayDecAffecter={setArrayDecAffecter}
                    fn={validationAction}
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
        filtredTableForValidation:
            state.declarationGrab.filterDeclarations
                .getFilterDeclarationForValidation.response,
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
    getfilterDeclarationForValidation: payload =>
        dispatch(
            getFilterDeclarationForValidationActions.getFilterDeclarationsForValidationRequest(
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
    filtredTableForValidation: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    userAffect: PropTypes.array,
    filtredTableForValidation: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getUsersByRoleReq: PropTypes.func.isRequired,
    newAffectationReq: PropTypes.func.isRequired,
    getfilterDeclarationForValidation: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
