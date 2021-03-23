/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarationAssujettiActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarationsAssujetti'
import Table from '../../../components/ui/table/table'
import PageTitle from '../../../components/ui/pageTitle'
import PDF from '../../../assets/icons/pdf.svg'
import EXCEL from '../../../assets/icons/excel.png'
import CSV from '../../../assets/icons/csv.png'
import getExportPdfActions from '../../../redux/declarantInterne/getExportPdf'
import getExporyCsvActions from '../../../redux/declarantInterne/getExportCsv'
import getExportExcelActions from '../../../redux/declarantInterne/getExportExcel'
import ButtonComponent from '../../../components/ui/button'
import confirmeListAssujettiActions from '../../../redux/declaration_grab/getfilterDeclaration/confirmeListAssujetti'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     filtredTable,
 *     allReferenciels,
 *     getfilterDeclarationAssujetti,
 *     getExportPdfReq,
 *     getExportCsvReq,
 *     getExportExcelReq,
 *     confirmeListAssujetti,
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    allReferenciels,
    getfilterDeclarationAssujetti,
    getExportPdfReq,
    getExportCsvReq,
    getExportExcelReq,
    confirmeListAssujetti,
}) => {
    /* hooks member */
    const type = 'validationAssujetti'
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
    const [arrayDec, setArrayDec] = useState([])

    /* list header */
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
                codeDeclaration: item.codeDeclaration,
                createdAt: item.createdAt,
                prenomTripartite: `${item.prenomTripartite} ${item.nom}`,
                numCin: item.numCin ? item.numCin : item.numPassport,
                categorie:
                    item.categorie &&
                    allReferenciels.referenciels &&
                    allReferenciels.referenciels.RefCategorie.find(
                        // eslint-disable-next-line radix
                        e => e.id === parseInt(item.categorie)
                    ).rang,
                fonction:
                    item.fonction &&
                    allReferenciels.referenciels &&
                    allReferenciels.referenciels.RefFonction.find(
                        // eslint-disable-next-line radix
                        e => e.id === parseInt(item.fonction)
                    ).intituleAr,
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getfilterDeclarationAssujetti({
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
     *
     *
     * @param {*} { target: { name, value } }
     */
    const fieldChangedHandler = ({ target: { name, value } }) => {
        if (name === 'categorie') {
            setPayload({ ...payload, [name]: value, fonction: [] })
            payload.fonction = []
        } else setPayload({ ...payload, [name]: value })
        getfilterDeclarationAssujetti({
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
     * set syle input search
     *
     */
    const onFocus = () => {
        setInputClassName('focused')
        setColorBorder('red')
    }
    /**
     * set syle input search
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
        getfilterDeclarationAssujetti({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * export pdf
     *
     */
    const exportPDF = () => {
        getExportPdfReq()
    }

    /**
     * exort csv
     *
     */
    const exportCSV = () => {
        getExportCsvReq()
    }

    /**
     * export excel
     *
     */
    const exportExcel = () => {
        getExportExcelReq()
    }

    /**
     * redirect to page consult declaration
     *
     * @param {*} { id, index }
     */
    const consultationAction = ({ id, index }) => {
        history.push({
            pathname: `/declaration_assujetti_saisie/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                dataDeclaration: filtredTable.data[index],
                referentiel: allReferenciels,
                type: 'validationAssujetti',
            },
        })
    }

    /**
     * confirme list
     *
     */
    const confirmerDeclarant = () => {
        const arrayForDelete = arrayDec.map(index => index.id)
        confirmeListAssujetti({ arrayDec, arrayForDelete })
        setTimeout(() => {
            setTable([])
            getfilterDeclarationAssujetti({
                order,
                limit,
                page,
                key,
                searchData,
            })
        }, 2500)
    }

    /**
     * set array declarant
     *
     * @param {*} array
     */
    const setArrayDecAffecter = array => {
        setArrayDec(array)
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterDeclarationAssujetti({
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
                <PageTitle label="تثبيت قائمة الخاضعين لواجب التصريح" />
            </Grid>
            <Grid container>
                <Form
                    type={type}
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
            <div
                style={{
                    paddingTop: '2%',
                }}
            >
                <ButtonComponent
                    disabled={arrayDec.length === 0}
                    color="secondary"
                    type="contained"
                    size="medium"
                    label="قبول القائمة"
                    clicked={confirmerDeclarant}
                />
                <Button onClick={exportPDF}>
                    <img style={{ width: 40 }} src={PDF} />
                </Button>
                <Button onClick={exportExcel}>
                    <img style={{ width: 40 }} src={EXCEL} />
                </Button>
                <Button onClick={exportCSV}>
                    <img style={{ width: 40 }} src={CSV} />
                </Button>
            </div>
            {(rows.length !== 0 || meta.pages === 0) && (
                <Table
                    lng={lng}
                    headers={headers}
                    rowsS={rows}
                    history={history}
                    intl={intl}
                    type={type}
                    fn={consultationAction}
                    setArrayDecAffecter={setArrayDecAffecter}
                    paramTab={paramConsultTab}
                    meta={meta}
                    filtredTable={filtredTable && filtredTable.data}
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
        filtredTable:
            state.declarationGrab.filterDeclarations
                .getFilterDeclarationAssujetti.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getfilterDeclarationAssujetti: payload =>
        dispatch(
            getFilterDeclarationAssujettiActions.getFilterDeclarationsAssujettiRequest(
                payload
            )
        ),
    getExportPdfReq: payload =>
        dispatch(getExportPdfActions.getExportPdfRequest(payload)),
    getExportCsvReq: payload =>
        dispatch(getExporyCsvActions.getExportCsvRequest(payload)),
    getExportExcelReq: payload =>
        dispatch(getExportExcelActions.getExportExcelRequest(payload)),
    confirmeListAssujetti: payload =>
        dispatch(
            confirmeListAssujettiActions.confirmeListAssujettiRequest(payload)
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
    getfilterDeclarationAssujetti: PropTypes.func.isRequired,
    getExportPdfReq: PropTypes.func.isRequired,
    getExportCsvReq: PropTypes.func.isRequired,
    getExportExcelReq: PropTypes.func.isRequired,
    confirmeListAssujetti: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
