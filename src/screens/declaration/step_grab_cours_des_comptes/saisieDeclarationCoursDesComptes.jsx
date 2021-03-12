import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarationActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarations'
import Table from '../../../components/ui/table/table'
import PageTitle from '../../../components/ui/pageTitle'
import getReceivedActions from '../../../redux/declaration/getReceived'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     filtredTable,
 *     allReferenciels,
 *     getfilterDeclaration,
 *     getReceivedReq,
 * }
 * @returns
 */
const SaisieDeclarationCoursDesComptes = ({
    lng,
    intl,
    history,
    filtredTable,
    allReferenciels,
    getfilterDeclaration,
    getReceivedReq,
}) => {
    /* hooks member */
    const status = 'en attente de saisie'
    const type = 'saisie_declaration'
    const [inputClassName, setInputClassName] = useState('blured')
    const [ColorBorder, setColorBorder] = useState('grey')
    const [searchData, setSearchData] = useState('')
    const [rows, setRows] = useState([])
    const [meta, setMeta] = useState([])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [key, setKey] = useState('')
    const [order, setOrder] = useState('')
    const [payload, setPayload] = useState({
        status,
        limit: 5,
        page: 1,
        externe: true,
    })

    /* header */
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
            id: 'action',
            label: '',
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
                codeDeclaration: item.codeDeclaration,
                createdAt: item.createdAt,
                prenomTripartite: `${item.prenomTripartite} ${item.nom}`,
                numCin: item.numCin ? item.numCin : item.numPassport,
                categorie: item.categorie.rang,
                fonction:
                    lng === 'ar'
                        ? item.fonction.intituleAr
                        : item.fonction.intituleFr,
                statusDeclarationSaisie: item.statutDeclaration,
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getfilterDeclaration(payload)
    }, [])

    /* life cycle */
    useEffect(() => {
        if (filtredTable) {
            setTable(filtredTable.data)
            setMeta(filtredTable.meta)
        }
    }, [filtredTable])

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
        getfilterDeclaration({
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
        setColorBorder('gray')
    }

    /**
     * set value search
     *
     * @param {*} { target: { value } }
     */
    const searchChangedHandler = ({ target: { value } }) => {
        setSearchData(value)
        getfilterDeclaration({
            externe: true,
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * redirect to saisie declaration
     *
     * @param {*} { id, index }
     */
    const saisieAction = ({ id, index }) => {
        history.push({
            pathname: `/cour_des_comptes/declaration_saisie/saisie_details_declaration/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                dataDeclaration: filtredTable.data[index],
            },
        })
    }

    /**
     * redirect to page consult declaration
     *
     * @param {*} { id, index }
     */
    const consultationAction = ({ id, index }) => {
        history.push({
            pathname: `/declaration_saisie/declaration_consultation/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                dataDeclaration: filtredTable.data[index],
                referentiel: allReferenciels,
            },
        })
    }

    /**
     * scan recu
     *
     * @param {*} { id }
     */
    const getReceviedAction = ({ id }) => {
        getReceivedReq(id)
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterDeclaration({
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

    console.log('history', history)

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="إدخال البيانات ( إدارة المحاسبات )" />
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
                    allReferenciels={allReferenciels}
                    fieldChangedHandler={fieldChangedHandler}
                    payload={payload}
                />
            </Grid>
            <div>
                <div
                    style={{
                        marginRight: '1%',
                        marginBottom: '-3%',
                        marginTop: '2%',
                    }}
                ></div>
            </div>

            <div
                className="col-md-4 float-left"
                style={{
                    marginTop: '40px',
                    marginRight: '55px',
                    marginBottom: '5px',
                    marginLeft: '3%',
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
            <Table
                lng={lng}
                headers={headers}
                rowsS={rows}
                intl={intl}
                history={history}
                saisieAction={saisieAction}
                fn={consultationAction}
                getReceviedAction={getReceviedAction}
                paramTab={paramConsultTab}
                status={status}
                type={type}
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
        filtredTable:
            state.declarationGrab.filterDeclarations.getFilterDeclaration
                .response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getfilterDeclaration: payload =>
        dispatch(
            getFilterDeclarationActions.getFilterDeclarationsRequest(payload)
        ),
    getReceivedReq: payload =>
        dispatch(getReceivedActions.getReceivedRequest(payload)),
})
/**
 *  Inialisation
 */
SaisieDeclarationCoursDesComptes.defaultProps = {
    filtredTable: [],
}
/**
 *  declaration des props
 */
SaisieDeclarationCoursDesComptes.propTypes = {
    intl: PropTypes.object.isRequired,
    filtredTable: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getfilterDeclaration: PropTypes.func.isRequired,
    getReceivedReq: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(SaisieDeclarationCoursDesComptes))
