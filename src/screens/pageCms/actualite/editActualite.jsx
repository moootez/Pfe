/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import editActualiteActions from '../../../redux/pageCms/actualite/editActualite'
import RenderForm from '../../../components/formPageCMS/actualite/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import alertActions from '../../../redux/alert'

/**
 * edit actualité
 *
 * @class editActualite
 * @extends {React.Component}
 */
class editActualite extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        editActualiteReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    /**
     * Creates an instance of editActualite.
     *
     * @param {*} props
     * @memberof editActualite
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorPDF: false,
            errorsList: {},
            payloadState: {},
            idActualite: {},
            imageState: null,
        }

        this.payload = {}
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
        const { index } = history.location.state
        this.payload = index
        const { image, ...restePayload } = index
        this.setState({
            payloadState: restePayload,
            imageState: image,
            idActualite: index.id,
        })
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

    /**
     * Field change hander
     *
     * @param {object} target
     * @memberof editActualite
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value, files } }) => {
        const { payloadState } = this.state
        const { alertShow } = this.props
        const base64 = []
        if (name === 'image') {
            const fileToLoad = files[0]
            const fileReader = new FileReader()
            if (fileToLoad && fileToLoad.size <= 150000) {
                let file = ''
                // eslint-disable-next-line func-names
                fileReader.onload = function(fileLoadedEvent) {
                    file = fileLoadedEvent.target.result
                    base64.push(file)
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
                    message: `الرجاء تقليل حجم الصورة`,
                })
            }
        }
        this.setState({
            payloadState: {
                ...payloadState,
                [name]: name === 'image' ? base64 : value,
            },
        })
    }

    /**
     * Cancel Actualite
     *
     * @memberof editActualite
     */
    cancelActualite = () => {
        this.resetForm()
    }

    /**
     * Reset form
     *
     * @memberof editActualite
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
     * @memberof editActualite
     */
    editActualite = () => {
        const { editActualiteReq, alertShow } = this.props
        const { payloadState, idActualite, errorPDF } = this.state

        if (!errorPDF) editActualiteReq({ ...payloadState, id: idActualite })
        else
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: `الرجاء تقليل حجم الصورة`,
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
        const { isError, errorsList, payloadState, imageState } = this.state

        return (
            <div className="ctn__declataion">
                <PageTitle label="Modifier l'actualité" />
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
                                imageState={imageState}
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
                                    clicked={this.editActualite}
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
        response: state.pageCms.editActualite.response,
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
    editActualiteReq: payload =>
        dispatch(editActualiteActions.editActualiteRequest(payload)),
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
)(injectIntl(editActualite))
