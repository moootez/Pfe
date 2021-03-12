import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import getAllReferencesActions from '../../redux/referencial/getAllReferencial'
import deleteReferencesActions from '../../redux/referencial/deleteReferencial'
import alertActions from '../../redux/alert'
import Table from '../../components/table'
import SelectList from '../../components/ui/selectListRef'
import PageTitle from '../../components/ui/pageTitle'
import ReferencialAr from '../../translations/referentiel.json'

/**
 *
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
    static defaultProps = {
        referencial: [],
    }

    constructor(props) {
        super(props)
        this.state = {
            referencial: [],
            categorie: props.selectedRef,
            headers: [],
            rows: [],
            searchValue: '',
            inputClassName: 'blured',
            ColorBorder: 'red',
        }
        this.search = ' بحث ...'
        this.listItems = []
        this.listItemsAr = {}
    }

    /* componenent life cycle */
    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getAllReference, referencial } = this.props
        if (referencial === null) {
            getAllReference()
        } else {
            if (referencial.categories)
                referencial.categories.forEach(categorie => {
                    if (ReferencialAr.transaltion[categorie]) {
                        this.listItems.push(
                            ReferencialAr.transaltion[categorie]
                        )
                        Object.assign(this.listItemsAr, {
                            [ReferencialAr.transaltion[categorie]]: categorie,
                        })
                    }
                })
            this.setTableSwitchProps(this.props)
        }
    }

    /* componenent life cycle */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.referencial) {
            this.setTableSwitchProps(nextProps)
        }
    }

    /* functions */
    /**
     * set table
     *
     * @memberof Index
     */
    setTableSwitchProps = ({ referencial, selectedRef }) => {
        this.setState({ referencial }, () => this.setTable(selectedRef))
    }

    /**
     * set selected categorie
     *
     * @memberof Index
     */
    selectCategorie = categorie => {
        this.setState({ categorie: this.listItemsAr[categorie] }, () =>
            this.setTable(this.listItemsAr[categorie])
        )
    }

    /**
     * set table refere
     *
     * @memberof Index
     */
    setTable = categorie => {
        document.getElementById('search-refs').value = ''
        const { referencial } = this.state
        if (typeof referencial.referenciels[categorie] === 'undefined') {
            this.setState({ headers: [], rows: [] })
        } else {
            this.setState({
                headers: Object.keys(referencial.referenciels[categorie][0]),
                rows: referencial.referenciels[categorie].filter(
                    index => index.publiable !== false
                ),
            })
            console.log('rows', referencial.referenciels[categorie])
        }
        const { changeSelectedReferencial } = this.props

        changeSelectedReferencial(categorie)
    }

    /**
     * redirect to page edit
     *
     * @memberof Index
     */
    editAction = row => {
        const { history } = this.props
        const { categorie, headers } = this.state
        history.push({
            pathname: 'referencial/edit',
            state: {
                categorie,
                listInputs: headers,
                id: row.id,
                values: row,
            },
        })
    }

    /**
     * set value search
     *
     * @memberof Index
     */
    searchChangedHandler = ({ target: { value } }) => {
        this.setState({ searchValue: value })
    }

    /**
     * set style input search
     *
     * @memberof Index
     */
    onFocus = () => {
        this.setState({ inputClassName: 'focused', ColorBorder: 'red' })
    }

    /**
     * set style input search
     *
     * @memberof Index
     */
    onBlur = () => {
        this.setState({ inputClassName: 'blured', ColorBorder: 'black' })
    }

    /**
     * delete referen
     *
     * @memberof Index
     */
    deleteRef = id => {
        const { alertShow, deleteReferenceRequest, alertHide } = this.props
        alertShow(true, {
            warning: false,
            info: false,
            error: true,
            success: false,
            title: 'هل أنت متأكد أنك تريد الحذف؟',
            onConfirm: () => {
                deleteReferenceRequest(id)
                alertHide()
            },
        })
    }

    /* render */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const {
            ColorBorder,
            categorie,
            headers,
            rows,
            searchValue,
            inputClassName,
        } = this.state
        const { history, lng, intl, selectedRef } = this.props
        const ok = true

        return (
            <div>
                <div className="column col-md-12">
                    <PageTitle
                        label={intl.formatMessage({
                            id: 'listGategories',
                        })}
                    />
                    <div className="col-md-4 ">
                        <SelectList
                            required={false}
                            width={300}
                            selectedVal={this.listItemsAr[categorie]}
                            placeholder={ReferencialAr.transaltion[selectedRef]}
                            label={intl.formatMessage({
                                id: 'listGategories',
                            })}
                            list={this.listItems}
                            onchange={c => this.selectCategorie(c)}
                            noDefaultValue={false}
                            noChooseItem
                        />
                    </div>
                    <div
                        className="col-md-4 float-left"
                        style={{ paddingBottom: 10 }}
                    >
                        <input
                            onBlur={this.onBlur}
                            style={{
                                borderColor: ColorBorder,
                                height: 'calc(0.5em + 1.5rem + 2px)',
                            }}
                            onFocus={this.onFocus}
                            type="text"
                            className={`${'form-control  inputSearch '}${inputClassName}`}
                            onChange={this.searchChangedHandler}
                            id="search-refs"
                            placeholder={this.search}
                        />
                    </div>
                </div>
                <Table
                    headers={headers}
                    rows={rows}
                    lng={lng}
                    editAction={this.editAction}
                    deleteAction={this.deleteRef}
                    searchValue={searchValue}
                    referencial={ok}
                    history={history}
                    categorie={categorie}
                />
            </div>
        )
    }
}

/* redux */

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getAllReference: () =>
        dispatch(getAllReferencesActions.getAllReferenceRequest()),
    changeSelectedReferencial: categorie =>
        dispatch(getAllReferencesActions.changeSelectedReferencial(categorie)),
    deleteReferenceRequest: payload =>
        dispatch(deleteReferencesActions.deleteReferenceRequest(payload)),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
    alertHide: () => dispatch(alertActions.alertHide()),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ referencial, info }) => ({
    referencial: referencial.allReferencials.response,
    selectedRef: referencial.allReferencials.selectedRef,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    getAllReference: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
    referencial: PropTypes.object,
    deleteReferenceRequest: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    selectedRef: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    changeSelectedReferencial: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
