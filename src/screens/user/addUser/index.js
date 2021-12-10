/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { injectIntl, FormattedMessage } from 'react-intl'
import addUserActions from '../../../redux/user/addUser'
import editUserActions from '../../../redux/user/editUser'
import alertActions from '../../../redux/alert'
import RenderFormEdit from '../../../components/user/form/userForm'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import RenderFormAdd from '../../../components/user/form/userFormAjout'

/**
 *
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        responseEdit: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired,
            location: PropTypes.object.isRequired,
        }).isRequired,
        addUserRequest: PropTypes.func.isRequired,
        editUserRequest: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
        responseEdit: null,
    }

    /**
     * Creates an instance of Index.
     *
     * @param {*} props
     * @memberof Index
     */
    constructor(props) {
        super(props)
        this.state = {
            isExist: false,
            disable: false,
            isError: false,
            errorsList: {},
            isEditDeclaration: false,
            role: ['userRoles'],
            payloadState: {},
        }
        this.payload = { enable: false }
    }

    /* life cycle */
    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { history } = this.props
        const { type } = history.location.state
        if (type === 'edit')
            this.setState({ payloadState: history.location.state.user })
        // getAllRolesReq()
    }

    /* life cycle */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { history } = this.props
        /* test error add */
        if (nextProps.response && nextProps.response.data.status === 'error') {
            const errorsList = {}
            try {
                Object.keys(nextProps.response.data.data).forEach(key => {
                    const item = nextProps.response.data.data[key]
                    if (item) {
                        const errorText = item.fr
                        errorsList[key] = errorText
                    }
                })
            } catch (e) {
                console.log(e)
            }
            this.setState({ isError: true, errorsList })
        }
        /* test error edit */
        if (
            nextProps.responseEdit &&
            nextProps.responseEdit.data.status === 'error' &&
            history.location.state.type === 'edit'
        ) {
            const errorsList = {}
            try {
                Object.keys(nextProps.responseEdit.data.data).forEach(key => {
                    const item = nextProps.responseEdit.data.data[key]
                    if (item) {
                        const errorText = item.fr
                        errorsList[key] = errorText
                    }
                })
            } catch (e) {
                console.log(e)
            }
            this.setState({ isError: true, errorsList })
        }
    }

    /* functions */

    /**
     * Set object after filter
     *
     * @param {object} spy
     * @memberof Index
     */
    setObjectAfterFilter = spy => {
        const dec = spy
        Object.keys(spy).forEach(key => {
            if (spy[key] && typeof spy[key] !== 'string') {
                dec[key] = dec[key].id
            }
        })
        return dec
    }

    /**
     * On change number tel
     *
     * @param {string} tel
     * @param {boolean} status
     * @memberof Index
     */
    onChangeNumberTel = (tel, status) => {
        const { history } = this.props
        const { payloadState } = this.state
        if (history.location.state.type === 'edit') {
            this.payload = payloadState
            this.setState({ payloadState: { ...this.payload, tel } })
        } else {
            if (status) this.payload.tel = tel
            else {
                delete this.payload.tel
            }
            this.setState({ payloadState: this.payload })
        }
    }

    /**
     * Set check
     *
     * @param {strig} name
     * @param {boolean} checked
     * @memberof Index
     */
    /**
     * check radio bouton
     *
     * @memberof
     */
    setCheck = (name, checked) => {
        const { history } = this.props
        const { payloadState } = this.state

        if (history.location.state.type === 'edit') {
            const enable = checked
            this.payload = payloadState
            this.setState({
                payloadState: { ...this.payload, enable },
            })
            console.log(payloadState.enable, 'payloadState')
        } else {
            this.payload[name] = checked
            this.setState({ [name]: checked })
        }
    }

    /**
     * Field change hander
     *
     * @param {object} target
     * @param {strig} nameInput
     * @param {number} tunNatioId
     * @memberof Index
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value } }) => {
        const { history } = this.props
        const { itemToSend, errorsList, payloadState, role } = this.state
        let valueChanged = value
        /* test input password */
        if (name === 'confirmerPassword') {
            valueChanged = value
            if (valueChanged !== payloadState.password)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        confirmerPassword: (
                            <FormattedMessage id="passwordNonIdentique" />
                        ),
                    },
                })
            else {
                this.setState({
                    payloadState: { ...this.payload, [name]: valueChanged },
                })
                this.setState({
                    isError: false,
                    errorsList: {
                        ...errorsList,
                        confirmerPassword: delete errorsList.confirmerPassword,
                    },
                })
            }
        }
        /* test input password */
        if (name === 'password') {
            valueChanged = value
            if (valueChanged !== payloadState.confirmerPassword)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        confirmerPassword: (
                            <FormattedMessage id="passwordNonIdentique" />
                        ),
                    },
                })
            else {
                this.setState({
                    payloadState: { ...this.payload, [name]: valueChanged },
                })
                this.setState({
                    isError: false,
                    errorsList: {
                        ...errorsList,
                        confirmerPassword: delete errorsList.confirmerPassword,
                    },
                })
            }
        }
        if (history.location.state.type === 'edit') {
            this.payload = payloadState
            if (_.includes(itemToSend, name))
                this.setState({
                    payloadState: { ...this.payload, [name]: { id: value } },
                })
            else if (_.includes(role, name))
                this.setState({
                    payloadState: { ...this.payload, [name]: [{ id: value }] },
                })
            else
                this.setState({
                    payloadState: { ...this.payload, [name]: value },
                })
        } else {
            if (_.includes(itemToSend, name)) this.setState({ [name]: value })
            this.payload[name] = valueChanged
            this.setState({ payloadState: this.payload })
        }
    }

    /**
     * Cancel user
     *
     * @memberof Index
     */
    cancelAjout = () => {
        const { history } = this.props
        if (Object.keys(this.payload).length === 0) {
            history.goBack()
        } else {
            this.resetForm()
        }
    }

    /**
     * Reset form
     *
     * @memberof Index
     */
    /**
     * retouner objet
     *
     * @memberof
     */
    resetForm = () => {
        this.payload = {}
        this.setState({ payloadState: {}, isExist: false })
    }

    /**
     * Add declaration
     *
     * @memberof Index
     */
    addUser = () => {
        const { alertShow, addUserRequest } = this.props
        const { isError } = this.state
        if (isError)
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                title: 'Avertissement',
                message: 'Merci de corriger les erreurs',
            })
        else {
            addUserRequest(this.payload)
        }
    }

    /**
     * edit user
     *
     * @memberof addUser
     */
    editUser = () => {
        const { alertShow, editUserRequest } = this.props
        const { isError, payloadState } = this.state
        if (isError)
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                title: 'Avertissement',
                message: 'Merci de corriger les erreurs',
            })
        else {
            editUserRequest(payloadState)
        }
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { lng, intl, history } = this.props
        const {
            isError,
            errorsList,
            isExist,
            disable,
            isEditDeclaration,
            payloadState,
        } = this.state

        return (
            <div className="ctn__declataion">
                {history.location.state.type === 'edit' ? (
                    <PageTitle label="Modifier utilisateur" />
                ) : (
                    <PageTitle label="Ajouter utilisateur" />
                )}
                {[] && (
                    <FormGroup>
                        <div className="centerDiv">
                            <Grid container>
                                {history.location.state.type === 'edit' ? (
                                    <RenderFormEdit
                                        lng={lng}
                                        intl={intl}
                                        onChangeNumberTel={
                                            this.onChangeNumberTel
                                        }
                                        setCheck={this.setCheck}
                                        isExist={isExist}
                                        isEditDeclaration={isEditDeclaration}
                                        payload={payloadState}
                                        isError={isError}
                                        errorsList={errorsList}
                                        fieldChangedHandler={
                                            this.fieldChangedHandler
                                        }
                                        type={history.location.state.type}
                                    />
                                ) : (
                                    <RenderFormAdd
                                        lng={lng}
                                        intl={intl}
                                        onChangeNumberTel={
                                            this.onChangeNumberTel
                                        }
                                        setCheck={this.setCheck}
                                        isExist={isExist}
                                        isEditDeclaration={isEditDeclaration}
                                        payload={payloadState}
                                        isError={isError}
                                        errorsList={errorsList}
                                        fieldChangedHandler={
                                            this.fieldChangedHandler
                                        }
                                        type={history.location.state.type}
                                    />
                                )}
                            </Grid>
                            <div style={{ textAlign: 'center', padding: 20 }}>
                                <Divider />
                                <div>
                                    <ButtonComponent
                                        color="secondary"
                                        type="contained"
                                        size="medium"
                                        label="Confirmer"
                                        clicked={
                                            history.location.state.type ===
                                            'edit'
                                                ? this.editUser
                                                : this.addUser
                                        }
                                    />
                                    <ButtonComponent
                                        disabled={disable}
                                        color="secondary"
                                        type="contained"
                                        label="Annuler"
                                        size="medium"
                                        clicked={this.cancelAjout}
                                    />
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                )}
            </div>
        )
    }
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
        response: state.users.addUser.response,
        responseEdit: state.users.editUser.response,
        lng: state.info.language,
    }
}
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    addUserRequest: payload => dispatch(addUserActions.addUserRequest(payload)),
    editUserRequest: payload =>
        dispatch(editUserActions.editUserRequest(payload)),
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
