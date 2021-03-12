import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterInscriptionActions from '../../../redux/inscription/getFiltreInscription'
import Table from '../../../components/ui/table/table'
import PageTitle from '../../../components/ui/pageTitle'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     filtredTable,
 *     allReferenciels,
 *     getfilterInscription,
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    allReferenciels,
    getfilterInscription,
}) => {
    const type = 'inscription'
    /* list status */
    const listStatusInscription = [
        {
            label: 'في انتظار القبول',
            value: "en_attente_d'acceptation",
        },
        {
            label: 'مقبول',
            value: 'autorisée',
        },
        {
            label: 'غير مقبول',
            value: 'non autorisée',
        },
    ]
    /* hooks member */
    const [inputClassName, setInputClassName] = useState('blured')
    const [ColorBorder, setColorBorder] = useState('grey')
    const [searchData, setSearchData] = useState('')
    const [rows, setRows] = useState([])
    const [payload, setPayload] = useState({})
    const [meta, setMeta] = useState([])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [key, setKey] = useState('')
    const [order, setOrder] = useState('')
    /* list header */
    const headers = [
        {
            id: 'codeInsc',
            label: intl.formatMessage({ id: 'codeDeclaration' }),
        },
        {
            id: 'dateInscription',
            label: intl.formatMessage({ id: 'dateDec' }),
        },
        {
            id: 'prenomTripartiteAr',
            label: intl.formatMessage({ id: 'nom et prenom' }),
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
            label: intl.formatMessage({ id: 'poste' }),
        },
        {
            id: 'etablissement',
            label: intl.formatMessage({ id: 'structureOpérateur' }),
        },
        {
            id: 'statutDemande',
            label: intl.formatMessage({ id: 'situation' }),
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
                codeInsc: item.codeInsc,
                dateInscription: item.dateInscription.substr(0, 11),
                prenomTripartiteAr: `${item.prenomTripartiteAr} ${item.nomAr}`,
                numCin: item.numCin ? item.numCin : item.numPassport,
                categorie: item.categorie && item.categorie.rang,
                fonction: item.fonction && item.fonction.intituleAr,
                etablissement:
                    item.etablissement && item.etablissement.intituleAr,
                statutDemande:
                    item.statutDemande &&
                    intl.formatMessage({ id: item.statutDemande }),
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getfilterInscription({
            limit: 5,
            page: 1,
        })
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
        getfilterInscription({
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
        getfilterInscription({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * redirect to page consult
     *
     * @param {*} { id, index }
     */
    const consultationAction = ({ id, index }) => {
        history.push({
            pathname: `/validation_inscription/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                dataInscription: filtredTable.data[index],
                type: 'validation_inscription',
            },
        })
    }
    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterInscription({
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
                <PageTitle label="مطالب التسجيل بالمنظومة" />
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
                    allReferenciels={allReferenciels}
                    fieldChangedHandler={fieldChangedHandler}
                    payload={payload}
                    listStatusInscription={listStatusInscription}
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
                history={history}
                intl={intl}
                fn={consultationAction}
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
        filtredTable: state.inscription.getFiltreInscription.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getfilterInscription: payload =>
        dispatch(
            getFilterInscriptionActions.getFilterInscriptionRequest(payload)
        ),
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
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getfilterInscription: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
