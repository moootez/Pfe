import { Grid } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectList from '../../components/ui/select'
import Table from '../../components/ui/table/table'
import getHistoryActions from '../../redux/history/allHistory/index'
import getHistoryByIDActions from '../../redux/history/historyById/index'
import Modal from '../../components/ui/modal'
import PageTitle from '../../components/ui/pageTitle'

/**
 *
 *
 * @param {*} {
 *     intl,
 *     getHistory,
 *     historyData,
 *     getHistoryByID,
 *     historyByID,
 *     history,
 * }
 * @returns
 */
const Index = ({
    intl,
    getHistory,
    historyData,
    getHistoryByID,
    historyByID,
    history,
}) => {
    /* hooks member */
    const typeScreen = 'history'
    const [rows, setRows] = useState([])
    const [rowsConsult, setRowsConsult] = useState()
    const [meta, setMeta] = useState([])
    const [metaConsult, setMetaConsult] = useState([])
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('declarant')
    const [inputClassName, setInputClassName] = useState('blured')
    const [ColorBorder, setColorBorder] = useState('red')

    const search = intl.formatMessage({ id: 'search' })
    /* list header */
    const headers = [
        {
            id: 'code_inscription',
            label: intl.formatMessage({ id: 'codeDeclaration' }),
        },
        { id: 'nomAr', label: intl.formatMessage({ id: 'nom et prenom' }) },
        {
            id: 'numCin',
            label: intl.formatMessage({ id: 'cinOrPassport' }),
        },
        { id: 'categorie', label: intl.formatMessage({ id: 'categorie' }) },
        { id: 'fonction', label: intl.formatMessage({ id: 'poste' }) },
        { id: 'statut', label: intl.formatMessage({ id: 'situation' }) },
        { label: ' ' },
    ]

    const headerDeclaration = [
        { id: 'code', label: intl.formatMessage({ id: 'codeDeclaration' }) },
        { id: 'nom', label: intl.formatMessage({ id: 'declarant' }) },
        { id: 'cin', label: intl.formatMessage({ id: 'cinOrPassport' }) },
        { id: 'status', label: intl.formatMessage({ id: 'status' }) },
        ' ',
    ]

    const headerConsult = [
        {
            id: 'nom_agent',
            label: 'المستخدم',
        },
        {
            id: 'cin',
            label: intl.formatMessage({ id: 'username' }),
        },
        { id: 'revType', label: 'العملية' },
        { id: 'revType', label: intl.formatMessage({ id: 'dateChangement' }) },
    ]
    /* type list for history */
    const typeList = [
        { label: 'المصرحين', value: 'declarant' },
        { label: 'التصاريح', value: 'declaration' },
    ]

    /**
     * get Index Data when select Index Type
     *
     * @param {*} event
     */
    const handleSelectType = event => {
        const {
            target: { value },
        } = event
        setType(value)

        const path =
            value === 'declarant' ? 'declarant/all' : 'declaration/get/all'
        getHistory({
            payload: { limit: 5, page: 1, order: 'asc' },
            path,
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        const { location } = history
        getHistoryByID({
            limit: index.limit,
            page: index.page,
            order: index.order,
            key: index.key,
            type,
            id: location.state.id,
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
     * update search state
     *
     * @param {*} e
     */
    const searchChangedHandler = ({ target: { value } }) => {
        const path =
            type === 'declarant' ? 'declarant/all' : 'declaration/get/all'
        getHistory({
            payload: {
                limit: 5,
                page: 1,
                order: 'asc',
                searchData: value,
            },
            path,
        })
    }

    /**
     * update table for all history
     *
     * @param {*} arrayFiltred
     */
    const setTab = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            if (type === 'declarant') {
                rowsTmp = arrayFiltred.map(item => ({
                    id: item.id,
                    code_inscription: item.code_inscription,
                    nomAr: `${item.prenomTripartiteAr} ${item.nomAr}`,
                    numCin: item.numCin ? item.numCin : item.numPassport,
                    categorie: item.categorie,
                    fonction: item.fonction,
                    statut:
                        item.statut && intl.formatMessage({ id: item.statut }),
                }))
            } else {
                rowsTmp = arrayFiltred.map(item => ({
                    id: item.id,
                    code: item.code,
                    nom: `${item.nom} ${item.prenom}`,
                    cin: item.cin ? item.cin : item.numPassport,
                    statut:
                        item.statut && intl.formatMessage({ id: item.statut }),
                }))
            }
        }
        setRows(rowsTmp)
    }

    /**
     * convert action
     *
     * @param {*} action
     * @returns
     */
    const convertAction = action => {
        if (action === 'INS') {
            return 'إضافة'
        }
        return 'تغيير'
    }

    /**
     * update table for filtred history by ID
     *
     * @param {*} arrayFiltred
     */
    const setTableConsult = arrayFiltred => {
        let rowsCons = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            if (type === 'declarant') {
                rowsCons = arrayFiltred.map(item => ({
                    nom_agent: `${item.nom_agent} ${item.prenom_agent}`,
                    cin_agent: item.cin_agent,
                    revtype: convertAction(item.revtype),
                    updated_at: item.updated_at,
                }))
            } else {
                rowsCons = arrayFiltred.map(item => ({
                    nom_user: `${item.nom_user} ${item.prenom_user}`,
                    cin_user: item.cin_user,
                    revtype: convertAction(item.revtype),
                    updated_at: item.updated_at,
                }))
            }
        }
        setRowsConsult(rowsCons)
    }
    /* life cycle */
    useEffect(() => {
        if (historyData) {
            setTab(historyData.data)
            setMeta(historyData.meta)
        }
    }, [historyData])
    /* life cycle */
    useEffect(() => {
        if (historyByID) {
            setTableConsult(historyByID.data.data)
            setMetaConsult(historyByID.data.meta)
        }
    }, [historyByID])
    /* life cycle */
    useEffect(() => {
        getHistory({
            payload: { limit: 5, page: 1, order: 'asc' },
            path: 'declarant/all',
        })
    }, [])

    /**
     * open Modal
     *
     */
    const handleOpen = () => {
        setOpen(true)
    }

    /**
     * Close Modal
     *
     */
    const handleClose = () => {
        setOpen(false)
    }

    /**
     * handle tab pagination action for all Index
     *
     * @param {*} index
     */
    const paramTab = index => {
        const path =
            type === 'declarant' ? 'declarant/all' : 'declaration/get/all'
        getHistory({
            payload: {
                limit: index.limit,
                page: index.page,
                order: index.order,
                key: index.key,
            },
            path,
        })
    }

    /**
     * buttun consultation Action
     *
     * @param {*} id
     */
    const consultHistory = id => {
        getHistoryByID({ limit: 5, page: 1, id, type })
        setOpen(true)
        history.push({
            state: {
                id,
            },
        })
    }

    /**
     * describe Modal body
     *
     * @returns
     */
    const getBody = () => {
        return (
            rowsConsult && (
                <Fragment>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '80%',
                            margin: 'auto',
                            color: 'black',
                        }}
                    >
                        <h3>
                            {intl.formatMessage({ id: 'codeDeclaration' })}:{' '}
                            {type === 'declarant'
                                ? historyByID.data.data[0].code_insc
                                : historyByID.data.data[0].code}
                        </h3>
                        <h3>
                            {intl.formatMessage({ id: 'declarant' })}:{' '}
                            {historyByID.data.data[0].nom_declarant}{' '}
                            {historyByID.data.data[0].prenom_declarant}
                        </h3>
                    </div>
                    <Table
                        rowsS={rowsConsult}
                        headers={headerConsult}
                        lng="ar"
                        paramTab={paramConsultTab}
                        meta={metaConsult}
                        intl={intl}
                    />
                </Fragment>
            )
        )
    }

    return (
        <Fragment>
            <Grid className="gridItem">
                <PageTitle label="تاريخ التغييرات" />
            </Grid>
            <div style={{ width: '30%', margin: 'auto' }}>
                <SelectList
                    list={typeList}
                    required={false}
                    label="الفئة"
                    onchange={handleSelectType}
                    selectedItem={type}
                />
            </div>

            <Grid container>
                <div style={{ width: '30%', margin: 'auto' }}></div>
                <Grid item xs={12} md={4} sm={4} className="gridItem" />
                <Grid item xs={12} md={4} sm={4} className="gridItem">
                    <div style={{ marginTop: '42px', marginBottom: '10px' }}>
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
            <Table
                rowsS={rows}
                headers={type === 'declarant' ? headers : headerDeclaration}
                lng="ar"
                paramTab={paramTab}
                meta={meta}
                intl={intl}
                consulterAction={consultHistory}
                type={typeScreen}
            />
            <Modal
                body={getBody()}
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
            />
        </Fragment>
    )
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getHistory: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    historyData: PropTypes.object.isRequired,
    getHistoryByID: PropTypes.func.isRequired,
    historyByID: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getHistory: payload =>
        dispatch(getHistoryActions.getHistoryRequest(payload)),
    getHistoryByID: payload =>
        dispatch(getHistoryByIDActions.getHistoryByIDRequest(payload)),
})
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    historyData: state.history.getAllHistory.response,
    historyByID: state.history.getHistoryByID.response,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
