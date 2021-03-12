import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Divider, Grid, Button } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterDeclarationAssujettiActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarationsAssujetti'
import Table from '../../../components/ui/table/table'
import ButtonComponent from '../../../components/ui/button'
import PageTitle from '../../../components/ui/pageTitle'
import PDF from '../../../assets/icons/pdf.svg'
import EXCEL from '../../../assets/icons/excel.png'
import CSV from '../../../assets/icons/csv.png'
import getExportPdfActions from '../../../redux/declarantInterne/getExportPdf'
import getExporyCsvActions from '../../../redux/declarantInterne/getExportCsv'
import getExportExcelActions from '../../../redux/declarantInterne/getExportExcel'

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
}) => {
    const type = 'listAssujetti'
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
    const {
        etablissement,
        nomEtablissement,
        itemEtablissement,
    } = history.location.state

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
            etablissement,
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
     * redirect to page ajout
     *
     */
    const handleajout = () => {
        history.push({
            pathname: `/declaration_reception_assujetti`,
            state: {
                itemEtablissement,
                type,
            },
        })
    }

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
        getfilterDeclarationAssujetti({
            ...payload,
            [name]: value,
            order,
            limit,
            page,
            key,
            searchData,
            etablissement,
        })
    }
    /**
     * export pdf
     *
     */

    const exportPDF = () => {
        getExportPdfReq({ etablissement })
    }

    /**
     * exort csv
     *
     */
    const exportCSV = () => {
        getExportCsvReq({ etablissement })
    }

    /**
     * export excel
     *
     */
    const exportExcel = () => {
        getExportExcelReq({ etablissement })
    }
    /**
     * set style for input search
     *
     */
    const onFocus = () => {
        setInputClassName('focused')
        setColorBorder('red')
    }
    /**
     * set style for input search
     *
     */
    const onBlur = () => {
        setInputClassName('blured')
        setColorBorder('gray')
    }

    /**
     * set value input search
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
            etablissement,
        })
    }

    /**
     * redirect to page consult dec
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
                type: 'saisieAssujetti',
            },
        })
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
            etablissement,
        })
        setLimit(index.limit)
        setPage(index.page)
        setKey(index.key)
        setOrder(index.order)
    }

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle
                    label={` مراقبة قائمة الخاضعين لواجب التصريح (${nomEtablissement})`}
                />
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
            <div>
                <ButtonComponent
                    bgColor="rgb(226, 33, 37)"
                    color="white"
                    hoverColor="rgb(184, 22, 25)"
                    margin=" 3% 5% 1% "
                    type="contained"
                    size="medium"
                    label="إضافة منخرط"
                    clicked={() => handleajout()}
                />
                <Button onClick={exportPDF}>
                    <img style={{ width: 40 }} src={PDF} alt="exportPDF" />
                </Button>
                <Button onClick={exportExcel}>
                    <img style={{ width: 40 }} src={EXCEL} alt="exportExcel" />
                </Button>
                <Button onClick={exportCSV}>
                    <img style={{ width: 40 }} src={CSV} alt="exportCSV" />
                </Button>
            </div>

            <Table
                lng={lng}
                headers={headers}
                rowsS={rows}
                history={history}
                intl={intl}
                type={type}
                fn={consultationAction}
                paramTab={paramConsultTab}
                meta={meta}
            />
            <div style={{ textAlign: 'center', padding: 20 }}>
                <Divider />
                <div>
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        size="medium"
                        label={intl.formatMessage({
                            id: 'btnRetour',
                        })}
                        clicked={() => history.goBack()}
                    />
                </div>
            </div>
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
