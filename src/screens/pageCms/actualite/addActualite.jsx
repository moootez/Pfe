/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import addActualiteActions from '../../../redux/pageCms/actualite/addActualite'
import RenderForm from '../../../components/formPageCMS/actualite/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import alertActions from '../../../redux/alert'

/**
 * page add actualité
 *
 * @class addActualite
 * @extends {React.Component}
 */
class addActualite extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        addActualiteReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    /**
     * Creates an instance of addActualite.
     *
     * @param {*} props
     * @memberof addActualite
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorPDF: false,
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
        if (
            nextProps.response &&
            nextProps.response.response &&
            nextProps.response.response.data.status === 'error'
        ) {
            const errorsList = {}
            try {
                Object.keys(nextProps.response.response.data.data).forEach(
                    key => {
                        const item = nextProps.response.response.data.data[key]
                        if (item) {
                            const errorText = item.ar
                            errorsList[key] = errorText
                        }
                    }
                )
            } catch (e) {
                console.log(e)
            }
            this.setState({ isError: true, errorsList })
        }
    }

    /**
     * Field change hander
     *
     * @param {object} target
     * @memberof addActualite
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value, files } }) => {
        const { payloadState } = this.state
        const { alertShow } = this.props

        if (name === 'image') {
            const fileToLoad = files[0]
            const fileReader = new FileReader()
            if (fileToLoad && fileToLoad.size <= 150000) {
                // eslint-disable-next-line func-names
                fileReader.onload = fileLoadedEvent => {
                    this.setState({
                        payloadState: {
                            ...payloadState,
                            image: fileLoadedEvent.target.result,
                        },
                    })
                }
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad)
                this.setState({
                    errorPDF: false,
                })
            } else {
                this.setState({
                    errorPDF: true,
                })
                alertShow(true, {
                    warning: false,
                    info: false,
                    error: true,
                    success: false,
                    message: `Image de grande taille, il faut choisir une image de taille inferieur à 150000ko`,
                })
            }
        } else {
            this.setState({
                payloadState: {
                    ...payloadState,
                    [name]: value,
                },
            })
        }
    }

    /**
     * Cancel Actualite
     *
     * @memberof addActualite
     */
    cancelActualite = () => {
        this.resetForm()
    }

    /**
     * Reset form
     *
     * @memberof addActualite
     */
    /**
     * retouner objet
     *
     * @memberof
     */
    resetForm = () => {
        const { history } = this.props
        const { payloadState } = this.state
        if (Object.keys(payloadState).length === 0) {
            history.goBack()
        } else {
            this.payload = {}
            this.setState({ payloadState: this.payload })
        }
    }

    /**
     * Edit Actualite
     *
     * @memberof addActualite
     */
    addActualite = () => {
        const { addActualiteReq, alertShow } = this.props
        const { payloadState, errorPDF } = this.state

        if (!errorPDF) addActualiteReq(payloadState)
        else
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: `Image de grande taille, il faut choisir une image de taille inferieur à 150000ko`,
            })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { lng, intl } = this.props
        const { isError, errorsList, payloadState } = this.state

        return (
            <div className="ctn__declataion">
                <PageTitle
                    label="
Ajouter des Actualite "
                />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            <RenderForm
                                lng={lng}
                                intl={intl}
                                payload={payloadState}
                                isError={isError}
                                errorsList={errorsList}
                                fieldChangedHandler={this.fieldChangedHandler}
                            />
                        </Grid>
                        <div style={{ textAlign: 'center', padding: 20 }}>
                            <Divider />
                            <div>
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    size="medium"
                                    label="Confirmer"
                                    clicked={this.addActualite}
                                />
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    label="Annuler"
                                    size="medium"
                                    clicked={this.cancelActualite}
                                />
                            </div>
                        </div>
                    </div>
                </FormGroup>
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
        response: state.pageCms.addActualite.error,
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
    addActualiteReq: payload =>
        dispatch(addActualiteActions.addActualiteRequest(payload)),
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
)(injectIntl(addActualite))
