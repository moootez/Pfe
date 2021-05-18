import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import PageTitle from '../../../components/ui/pageTitle'
import Button from '../../../components/ui/button'
import getAllUsersActions from '../../../redux/user/getAllUsers'
import getAllRolesActions from '../../../redux/roles/getAllRoles'
// import ButtonComponent from '../../../components/ui/button'
import Table from '../../../components/ui/table/table'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     allReferenciels,
 *     getAllUsersReq,
 *     getAllRolesReq,
 *     allRoles,
 *     allUsers,
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    allReferenciels,
    getAllUsersReq,
    getAllRolesReq,
    allRoles,
    allUsers,
    syncUsers,
}) => {
    /* hooks member */
    const type = 'user'
    const [inputClassName, setInputClassName] = useState('blured')
    const [ColorBorder, setColorBorder] = useState('red')
    const [searchData, setSearchData] = useState('')
    const [rows, setRows] = useState([])
    const [payload, setPayload] = useState({})
    const [meta, setMeta] = useState([])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [key, setKey] = useState('')
    const [order, setOrder] = useState('')

    const headers = [
        {
            id: 'prenomTripartiteAr',
            label: intl.formatMessage({ id: 'labelPrenomTri' }),
        },
        {
            id: 'nomAr',
            label: intl.formatMessage({ id: 'labelNom' }),
        },
        {
            id: 'username',
            label: intl.formatMessage({ id: 'username' }),
        },
        {
            id: 'email',
            label: intl.formatMessage({ id: 'labelAdressemail' }),
        },
        {
            id: 'userRoles',
            label: intl.formatMessage({ id: 'role' }),
        },
    ]

    const search = intl.formatMessage({ id: 'Recherche' })
    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map(item => ({
                id: item.id,
                prenomTripartiteAr: item.prenomTripartiteAr,
                nomAr: item.nomAr,
                username: item.username,
                email: item.email,
                userRoles: item.userRoles.length > 0 && item.userRoles[0].role,
                users: item,
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getAllRolesReq()
        getAllUsersReq({ limit: 5, page: 1 })
    }, [])

    /* life cycle */
    useEffect(() => {
        if (allUsers) {
            setTable(allUsers.data)
            setMeta(allUsers.meta)
        }
    }, [allUsers])

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
        getAllUsersReq({
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
        getAllUsersReq({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * redirect to page add
     *
     */
    const handleajout = () => {
        history.push({
            pathname: 'ajout_user',
            state: {
                type: 'add',
            },
        })
    }

    /**
     * redirect to page edit
     *
     * @param {*} row
     */
    const editAction = row => {
        history.push({
            pathname: 'edit_user',
            state: {
                user: row.users,
                id: row.id,
                type: 'edit',
            },
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getAllUsersReq({
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
                <PageTitle label="Gestion des client" />
            </Grid>
            <Grid container>
                <Form
                    type={type}
                    lng={lng}
                    intl={intl}
                    allReferenciels={allReferenciels}
                    fieldChangedHandler={fieldChangedHandler}
                    payload={payload}
                    roles={allRoles}
                />
            </Grid>
            <div
                className="col-md-6 float-left"
                style={{
                    paddingTop: 20,
                    paddingRight: '5%',
                    paddingBottom: 20,
                }}
            >
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

            <div className="float-right m-3">
                <Button
                    clicked={syncUsers}
                    label="Synchronisation utilisateurs"
                />
            </div>
            <div className="float-right m-3">
                <Button
                    color="white"
                    margin=" 3% 5% 1% "
                    type="contained"
                    size="medium"
                    label="Ajouter utilisateur"
                    clicked={() => handleajout()}
                />
            </div>

            <Table
                lng={lng}
                headers={headers}
                rowsS={rows}
                history={history}
                intl={intl}
                type={type}
                editAction={editAction}
                paramTab={paramConsultTab}
                meta={meta}
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
        allUsers: state.users.allUsers.response,
        allRoles: state.roles.getAllRoles.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getAllUsersReq: payload =>
        dispatch(getAllUsersActions.getAllUsersRequest(payload)),
    getAllRolesReq: () => dispatch(getAllRolesActions.getAllRolesRequest()),
    syncUsers: () => dispatch({ type: 'SYNC_USERS' }),
})
/**
 *  Inialisation
 */
Index.defaultProps = {}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getAllUsersReq: PropTypes.func.isRequired,
    getAllRolesReq: PropTypes.func.isRequired,
    allRoles: PropTypes.object.isRequired,
    allUsers: PropTypes.object.isRequired,
    syncUsers: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
