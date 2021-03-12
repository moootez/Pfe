// !atteste ||

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarantInterneActions from '../../../redux/declarantInterne/getDeclarantInterne'
import Table from '../../../components/ui/table/table'
import ButtonComponent from '../../../components/ui/button'
import PageTitle from '../../../components/ui/pageTitle'
import { Post } from '../../../serveur/axios'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     filtredTable,
 *     allReferenciels,
 *     getfilterDeclarantInterne,
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    allReferenciels,
    getfilterDeclarantInterne,
}) => {
    const type = 'declarantInterne'
    /* List status */
    const listStatusDeclarant = [
        {
            label: 'مصرح',
            value: true,
        },
        {
            label: 'غير مصرح',
            value: false,
        },
    ]
    /* hooks member */
    const [inputClassName, setInputClassName] = useState('blured')
    const [ColorBorder, setColorBorder] = useState('grey')
    const [searchData, setSearchData] = useState('')
    const [rows, setRows] = useState([])
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
    })
    const [meta, setMeta] = useState([])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [key, setKey] = useState('')
    const [order, setOrder] = useState('')

    /* header */
    const headers = [
        {
            id: 'codeInsc',
            label: intl.formatMessage({ id: 'codeDeclaration' }),
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
            id: 'datePriseFonction',
            label: intl.formatMessage({ id: 'dateDebut' }),
        },
        {
            id: 'dateFinFonction',
            label: intl.formatMessage({ id: 'dateDepart' }),
        },
    ]

    /* set table and placeholder search */
    const search = intl.formatMessage({ id: 'search' })
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                codeInsc: item.codeInsc,
                prenomTripartiteAr: `${item.prenomTripartiteAr} ${item.nomAr}`,
                numCin: item.numCin ? item.numCin : item.numPassport,
                categorie: item.categorie && item.categorie.rang,
                fonction: item.fonction && item.fonction.intituleAr,
                datePriseFonction:
                    item.datePriseFonction &&
                    item.datePriseFonction.substr(0, 11),
                dateFinFonction: item.dateFinFonction
                    ? item.dateFinFonction.substr(0, 11)
                    : '',
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */

    useEffect(() => {
        getfilterDeclarantInterne(payload)
    }, [])

    useEffect(() => {
        if (filtredTable) {
            setTable(filtredTable.data)
            setMeta(filtredTable.meta)
        }
    }, [filtredTable])

    /* functions */

    /**
     * ajout declarant interne
     *
     */
    const handleajout = () => {
        history.push('/add_declarant')
    }

    /**
     * set payload
     *
     * @param {*} { target: { name, value } }
     */
    const fieldChangedHandler = ({ target: { name, value } }) => {
        /* test sur name categorie */
        if (name === 'categorie') {
            setPayload({ ...payload, [name]: value, fonction: [] })
            payload.fonction = []
        } else setPayload({ ...payload, [name]: value })
        getfilterDeclarantInterne({
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
     * change input search
     *
     */
    const onFocus = () => {
        setInputClassName('focused')
        setColorBorder('red')
    }

    /**
     * change input search
     *
     */
    const onBlur = () => {
        setInputClassName('blured')
        setColorBorder('gray')
    }

    /**
     * input search
     *
     * @param {*} { target: { value } }
     */
    const searchChangedHandler = ({ target: { value } }) => {
        setSearchData(value)
        getfilterDeclarantInterne({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * consulter declarant interne
     *
     * @param {*} { id, index }
     */
    const consultationAction = ({ id, index }) => {
        history.push({
            pathname: `/declarant_interne_details/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                dataDeclaration: filtredTable.data[index],
                referentiel: allReferenciels,
                type: 'declarantInterne',
            },
        })
    }

    /**
     * generate pdf
     *
     */
    const generateCsv = () => {
        Post('declarant/export_file_csv').then(res => {
            if (res.status === 201 || res.status === 200) {
                window.open(res.data.result, '_blank')
            }
        })
    }
    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterDeclarantInterne({
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
                <PageTitle label=" قائمة المصرحين" />
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
                    listStatusDeclarant={listStatusDeclarant}
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
            <div>
                <ButtonComponent
                    bgColor="rgb(226, 33, 37)"
                    color="white"
                    hoverColor="rgb(184, 22, 25)"
                    margin=" 3% 5% 1% "
                    type="contained"
                    size="medium"
                    label="إضافة مصرح"
                    clicked={() => handleajout()}
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
            <ButtonComponent
                bgColor="#e0e0e0"
                color="rgba(0, 0, 0, 0.87)"
                hoverColor="rgb(184, 22, 25)"
                margin=" 1% 5% 1% "
                type="contained"
                size="medium"
                label="إستخراج القائمة"
                clicked={generateCsv}
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
            state.declarantInterne.getFiltredDeclarantInterne.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getfilterDeclarantInterne: payload =>
        dispatch(
            getFilterDeclarantInterneActions.getFilterDeclarantInterneRequest(
                payload
            )
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
    getfilterDeclarantInterne: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
