import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getAllRapportActions from '../../../redux/rapport/getAllRapport/index'
import Table from '../../../components/ui/table/table'
import PageTitle from '../../../components/ui/pageTitle'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     allReferenciels,
 *     getAllRapport,
 *     getAllRapportReq,
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    allReferenciels,
    getAllRapport,
    getAllRapportReq,
}) => {
    /* hooks member */
    const type = 'validateurRapport'
    const listStatus = [
        {
            label: 'مصادق عليها',
            value: 'validée',
        },
        {
            label: 'تقرير مصادق عليه',
            value: 'new',
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
            id: 'declarant',
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
            id: 'controleur',
            label: intl.formatMessage({ id: 'controleur' }),
        },
        {
            id: 'rapport_De_Contrôle',
            label: intl.formatMessage({ id: 'rapport de contrôle' }),
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
                codeDeclaration: item.codedeclaration,
                dateDec: item.createdat,
                declarant: item.declarant,
                numCin: item.declaration.numCin
                    ? item.declaration.numCin
                    : item.declaration.numPassport,
                categorie: item.categorie,
                fonction: item.fonction,
                controleur: item.controleur,
                rapport_De_Contrôle: 'التثبت',
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getAllRapportReq({
            limit: 5,
            page: 1,
        })
    }, [])
    /* life cycle */
    useEffect(() => {
        if (getAllRapport) {
            setTable(getAllRapport.data)
            setMeta(getAllRapport.meta)
        }
    }, [getAllRapport])

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
        getAllRapportReq({
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
        getAllRapportReq({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * redirect to page consult rapport
     *
     * @param {*} { index }
     */
    const ConsulterRapport = ({ index }) => {
        history.push({
            pathname: `/list_rapport/consultation`,
            state: {
                lang: lng,
                type,
                step: 4,
                dataDeclaration: getAllRapport.data[index].declaration,
                label: 'تثبيت تقرير',
            },
        })
    }
    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getAllRapportReq({
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
                <PageTitle label="تثبيت تقرير" />
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
                headers={headers}
                rowsS={rows}
                history={history}
                intl={intl}
                type={type}
                fn={ConsulterRapport}
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
        getAllRapport: state.rapport.getAllRapport.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getAllRapportReq: data =>
        dispatch(getAllRapportActions.getAllRapportRequest(data)),
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getAllRapport: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    getAllRapport: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getAllRapportReq: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
