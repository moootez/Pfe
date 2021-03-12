/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import changePasswordActions from '../../../redux/user/changePassword'
import alertActions from '../../../redux/alert'
import RenderForm from '../../../components/user/formChangePassword/userForm'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'

/**
 *
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
    static propTypes = {
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired,
            location: PropTypes.object.isRequired,
        }).isRequired,
        changePasswordRequest: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
        idUser: PropTypes.string.isRequired,
    }

    static defaultProps = {
        response: null,
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
            isError: false,
            errorsList: {},
            payloadState: {},
        }
        this.payload = {}
    }

    /* life cycle */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        /* test error */
        if (nextProps.response && nextProps.response.data.status === 'error') {
            const errorsList = {}
            try {
                Object.keys(nextProps.response.data.data).forEach(key => {
                    const item = nextProps.response.data.data[key]
                    if (item) {
                        const errorText = item.ar
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
        const { errorsList } = this.state
        let valueChanged = value
        if (name === 'confirmerOldPassword') {
            valueChanged = value
            if (valueChanged !== this.payload.oldPassword)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        confirmerOldPassword: (
                            <FormattedMessage id="passwordNonIdentique" />
                        ),
                    },
                })
            else {
                this.payload[name] = valueChanged
                this.setState({
                    isError: false,
                    errorsList: {
                        ...errorsList,
                        confirmerOldPassword: delete errorsList.confirmerOldPassword,
                    },
                })
            }
        }
        if (name === 'oldPassword') {
            valueChanged = value
            if (valueChanged !== this.payload.confirmerOldPassword)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        confirmerOldPassword: (
                            <FormattedMessage id="passwordNonIdentique" />
                        ),
                    },
                })
            else {
                this.setState({
                    isError: false,
                    errorsList: {
                        ...errorsList,
                        confirmerOldPassword: delete errorsList.confirmerOldPassword,
                    },
                })
            }
        }

        if (name === 'confirmerNewPassword') {
            valueChanged = value
            if (valueChanged !== this.payload.newPassword)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        confirmerNewPassword: (
                            <FormattedMessage id="passwordNonIdentique" />
                        ),
                    },
                })
            else {
                this.payload[name] = valueChanged
                this.setState({
                    isError: false,
                    errorsList: {
                        ...errorsList,
                        confirmerNewPassword: delete errorsList.confirmerNewPassword,
                    },
                })
            }
        }
        if (name === 'newPassword') {
            valueChanged = value
            if (valueChanged !== this.payload.confirmerNewPassword)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        confirmerNewPassword: (
                            <FormattedMessage id="passwordNonIdentique" />
                        ),
                    },
                })
            else {
                this.setState({
                    isError: false,
                    errorsList: {
                        ...errorsList,
                        confirmerNewPassword: delete errorsList.confirmerNewPassword,
                    },
                })
            }
        }
        this.payload[name] = valueChanged
        this.setState({ payloadState: this.payload })
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
        this.setState({ payloadState: {} })
    }

    /**
     * Add declaration
     *
     * @memberof Index
     */
    changePassword = () => {
        const { alertShow, changePasswordRequest, idUser } = this.props
        const { isError, payloadState } = this.state
        if (isError)
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                title: 'تذكير',
                message: 'يرجى معالجة الأخطاء',
            })
        else {
            changePasswordRequest({ ...payloadState, id: idUser })
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
        const { intl } = this.props
        const { isError, errorsList, disable, payloadState } = this.state

        return (
            <div className="ctn__declataion">
                <PageTitle label="تعديل كلمة المرور" />
                {[] && (
                    <FormGroup>
                        <div className="centerDiv">
                            <Grid container>
                                <RenderForm
                                    intl={intl}
                                    payload={payloadState}
                                    isError={isError}
                                    errorsList={errorsList}
                                    fieldChangedHandler={
                                        this.fieldChangedHandler
                                    }
                                />
                            </Grid>
                            <div style={{ textAlign: 'center', padding: 20 }}>
                                <Divider />
                                <div>
                                    <ButtonComponent
                                        color="secondary"
                                        type="contained"
                                        size="medium"
                                        label="تأكيد"
                                        clicked={this.changePassword}
                                    />
                                    <ButtonComponent
                                        disabled={disable}
                                        color="secondary"
                                        type="contained"
                                        label="إلغاء"
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
        response: state.users.changePassword.response,
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
    changePasswordRequest: payload =>
        dispatch(changePasswordActions.changePasswordRequest(payload)),
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
