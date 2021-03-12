import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Form from '../../components/declaration/step_grab/homePage/Form'
import Table from '../../components/ui/table/table'
import PageTitle from '../../components/ui/pageTitle'
import getFilterDecEnAttenteDeValidationActions from '../../redux/declaration_grab/getfilterDeclaration/getFilterDecEnAttenteDeValidation'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     allReferenciels,
 *     filtredTableDecValide,
 *     getFilterDecEnAttenteDeValidation,
 *     // getReceivedRecuReq,
 *     idUser,
 * }
 * @returns
 */
const ListDecValideCoursDesComptes = ({
    lng,
    intl,
    history,
    allReferenciels,
    filtredTableDecValide,
    getFilterDecEnAttenteDeValidation,
    idUser,
}) => {
    /* hooks member */

    const listStatus = [
        {
            label: 'مصادق عليها',
            value: 'validée',
        },
        {
            label: 'في إنتظار المصادقة',
            value: 'en attente de validation',
        },
    ]
    const listStatusCoursDesComptes = [
        {
            label: 'داخلي',
            value: false,
        },
        {
            label: 'خارجي',
            value: true,
        },
    ]
    const type = 'validateurCoursDesComptes'
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
    /* set table */

    const search = intl.formatMessage({ id: 'search' })
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                codeDeclaration: item.codeDeclaration,
                dateDec: item.createdAt,
                user:
                    lng === 'ar'
                        ? `${item.user.prenomTripartiteAr} ${item.user.nomAr}`
                        : `${item.user.nomFr} ${item.user.prenomTripartiteFr}`,
                numCin: item.numCin ? item.numCin : item.numPassport,
                categorie: item.categorie.rang,
                fonction:
                    lng === 'ar'
                        ? item.fonction.intituleAr
                        : item.fonction.intituleFr,
                status: intl.formatMessage({
                    id: item.statutDeclaration,
                }),
                isDisabled:
                    item.statutDeclaration === 'en attente de validation',
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getFilterDecEnAttenteDeValidation({
            id: idUser,
            data: {},
            limit: 5,
            page: 1,
            externe: true,
        })
    }, [])

    /* life cycle */
    useEffect(() => {
        if (filtredTableDecValide) {
            setTable(filtredTableDecValide.data)
            setMeta(filtredTableDecValide.meta)
        }
    }, [filtredTableDecValide])

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
        getFilterDecEnAttenteDeValidation({
            id: idUser,
            externe: true,
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
        getFilterDecEnAttenteDeValidation({
            externe: true,
            order,
            limit,
            page,
            key,
            searchData: value,
            id: idUser,
        })
    }

    /**
     * redirect to page validation declaration
     *
     * @param {*} { id, index }
     */
    const ValidationAction = ({ id, index }) => {
        history.push({
            pathname: `/cour_des_comptes/validation_de_declaration/${id}`,
            state: {
                idDeclaration: id,
                lang: lng,
                type,
                dataDeclaration: filtredTableDecValide.data[index],
                label: 'تثبت التصاريح',
            },
        })
    }

    /**
     * handle pagination action for consultation tab
     *
     * @param {*} index
     */
    const paramConsultTab = index => {
        getFilterDecEnAttenteDeValidation({
            externe: true,
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
                <PageTitle label="التصاريح المثبتة" />
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
                    listStatusCoursDesComptes={listStatusCoursDesComptes}
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
                fn={ValidationAction}
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
        filtredTableDecValide:
            state.declarationGrab.filterDeclarations
                .getFilterDeclarationEnAttenteDeValidationCDC.response,
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
    getFilterDecEnAttenteDeValidation: payload =>
        dispatch(
            getFilterDecEnAttenteDeValidationActions.getFilterDeclarationsEnAttenteDeValidationRequest(
                payload
            )
        ),
})
/**
 *  Inialisation
 */
ListDecValideCoursDesComptes.defaultProps = {
    filtredTableDecValide: null,
}
/**
 *  declaration des props
 */
ListDecValideCoursDesComptes.propTypes = {
    intl: PropTypes.object.isRequired,
    filtredTableDecValide: PropTypes.array,
    allReferenciels: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getFilterDecEnAttenteDeValidation: PropTypes.func.isRequired,
    idUser: PropTypes.string.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ListDecValideCoursDesComptes))
