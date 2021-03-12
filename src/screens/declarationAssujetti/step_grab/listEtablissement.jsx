import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../../components/declaration/step_grab/homePage/Form'
import getFilterEtablissementAssujettiActions from '../../../redux/etablissement/getFilterEtablissementAssujetti'
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
 *     getfilterEtablissementAssujetti,
 * }
 * @returns
 */
const ListEtablissement = ({
    lng,
    intl,
    history,
    filtredTable,
    allReferenciels,
    getfilterEtablissementAssujetti,
}) => {
    const type = 'saisieAssujetti'
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
            id: 'intituleAr',
            label: intl.formatMessage({ id: 'etablissement' }),
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
                intituleAr: item.intituleAr,
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getfilterEtablissementAssujetti({
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
        getfilterEtablissementAssujetti({
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
     * set syle input search
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
        getfilterEtablissementAssujetti({
            order,
            limit,
            page,
            key,
            searchData: value,
        })
    }

    /**
     * redirect to page consult declaration
     *
     * @param {*} { index }
     */
    const consultationAction = ({ index }) => {
        history.push({
            pathname: `/declaration_assujetti_saisie_declarant`,
            state: {
                etablissement: filtredTable.data[index].id,
                nomEtablissement: filtredTable.data[index].intituleAr,
                itemEtablissement: filtredTable.data[index],
            },
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getfilterEtablissementAssujetti({
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
                <PageTitle label="مراقبة قائمة الخاضعين لواجب التصريح" />
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
            state.etablissement.getFilterEtablissementAssujetti.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getfilterEtablissementAssujetti: payload =>
        dispatch(
            getFilterEtablissementAssujettiActions.getFilterEtablissementAssujettiRequest(
                payload
            )
        ),
})
/**
 *  Inialisation
 */
ListEtablissement.defaultProps = {
    filtredTable: [],
}
/**
 *  declaration des props
 */
ListEtablissement.propTypes = {
    intl: PropTypes.object.isRequired,
    filtredTable: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getfilterEtablissementAssujetti: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ListEtablissement))
