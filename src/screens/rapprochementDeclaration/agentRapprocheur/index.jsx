import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import Table from '../../../components/ui/table/table'
import getFilterDeclarationEnAttenteDeRapprochementActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecEnAttenteDeRapprochement'
import PageTitle from '../../../components/ui/pageTitle'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     allReferenciels,
 *     filtredTableEnAttendeDeRapprochement,
 *     getfilterDeclarationEnAttenteDeRapprochement,
 *     idUser,
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    allReferenciels,
    filtredTableEnAttendeDeRapprochement,
    getfilterDeclarationEnAttenteDeRapprochement,
    idUser,
}) => {
    /* hooks member */
    const type = 'rapprocheur'
    const listStatus = [
        {
            label: 'في إنتظار المقاربة',
            value: 'en attente de rapprochement',
        },
        {
            label: 'مقاربة جديدة',
            value: 'nouveau rapprochement',
        },
    ]

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
            id: 'codeDeclaration',
            label: intl.formatMessage({ id: 'codeDeclaration' }),
        },
        {
            id: 'createdAt',
            label: intl.formatMessage({ id: 'dateDec' }),
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
            id: 'status',
            label: intl.formatMessage({ id: 'status' }),
        },
    ]

    const search = intl.formatMessage({ id: 'search' })
    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.declaration.id,
                index,
                codeDeclaration: item.declaration.codeDeclaration,
                dateDec: item.declaration.createdAt,
                user:
                    lng === 'ar'
                        ? `${item.declaration.user.prenomTripartiteAr} ${item.declaration.user.nomAr}`
                        : `${item.declaration.user.nomFr} ${item.declaration.user.prenomTripartiteFr}`,
                numCin: item.declaration.numCin
                    ? item.declaration.numCin
                    : item.declaration.numPassport,
                categorie: item.declaration.categorie.rang,
                fonction:
                    lng === 'ar'
                        ? item.declaration.fonction.intituleAr
                        : item.declaration.fonction.intituleFr,
                status: intl.formatMessage({
                    id: item.declaration.statutDeclaration,
                }),
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getfilterDeclarationEnAttenteDeRapprochement({
            id: idUser,
            data: {},
            limit: 5,
            page: 1,
        })
    }, [])
    /* life cycle */
    useEffect(() => {
        if (filtredTableEnAttendeDeRapprochement) {
            setTable(filtredTableEnAttendeDeRapprochement.data)
            setMeta(filtredTableEnAttendeDeRapprochement.meta)
        }
    }, [filtredTableEnAttendeDeRapprochement])

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
        getfilterDeclarationEnAttenteDeRapprochement({
            id: idUser,
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
        getfilterDeclarationEnAttenteDeRapprochement({
            id: idUser,
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * rediret to page rapprochement declaaration
     *
     * @param {*} { id, index }
     */
    const RapprochementAction = ({ id, index }) => {
        history.push({
            pathname: `/rapprochement_de_declaration/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                type,
                role: 'ROLE_REPONSABLE_AFFECTATION_RAPPROCHEMENT',
                dataDeclaration:
                    filtredTableEnAttendeDeRapprochement.data[index]
                        .declaration,
                label: 'مقاربة التصاريح',
            },
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterDeclarationEnAttenteDeRapprochement({
            ...payload,
            id: idUser,
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
                <PageTitle label="مقاربة التصاريح" />
                <label
                    htmlFor="form"
                    className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
                >
                    {intl.formatMessage({ id: 'dateDec' })}
                </label>
            </Grid>
            <Grid container>
                <Form
                    lng={lng}
                    intl={intl}
                    type={type}
                    listStatus={listStatus}
                    allReferenciels={allReferenciels}
                    fieldChangedHandler={fieldChangedHandler}
                    payload={payload}
                />
            </Grid>
            <div
                className="col-md-4 float-left"
                style={{ paddingBottom: 10, paddingLeft: '5%' }}
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

            <Table
                lng={lng}
                type={type}
                intl={intl}
                rowsS={rows}
                headers={headers}
                history={history}
                fn={RapprochementAction}
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
        filtredTableEnAttendeDeRapprochement:
            state.declarationGrab.filterDeclarations
                .getFilterDeclarationEnAttenteDeRapprochement.response,
        idUser: state.login.response.User.details.id,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getfilterDeclarationEnAttenteDeRapprochement: payload =>
        dispatch(
            getFilterDeclarationEnAttenteDeRapprochementActions.getFilterDeclarationsEnAttenteDeRapprochementRequest(
                payload
            )
        ),
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    filtredTableEnAttendeDeRapprochement: null,
    allReferenciels: {},
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    filtredTableEnAttendeDeRapprochement: PropTypes.array,
    allReferenciels: PropTypes.object,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getfilterDeclarationEnAttenteDeRapprochement: PropTypes.func.isRequired,
    idUser: PropTypes.string.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
