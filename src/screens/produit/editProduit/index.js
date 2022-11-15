import React from 'react'
import { Grid, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import RenderForm from '../../../components/formProduit/produit/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import alertActions from '../../../redux/alert'
import { Patch } from '../../../serveur/axios'

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
            errorsList: {},
            payloadState: {},
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
        const { name } = history.location.state
        this.payload = name
        this.setState({
            payloadState: name,
            imageState: name,
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
        const { imageState } = this.state

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
            }
            // else {
            //     this.setState({
            //         errorPDF: true,
            //     })
            //     alertShow(true, {
            //         warning: false,
            //         info: false,
            //         error: true,
            //         success: false,
            //         message: `Image de grande taille, il faut choisir une image de taille inférieure à 150Ko`,
            //     })
            // }
        }
        this.setState({
            payloadState: {
                name: imageState,
                base64: name === 'image' ? base64 : value,
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
        const { alertShow, history } = this.props
        const { payloadState } = this.state
        Patch('article/editPicture', {
            name: `${payloadState.name}.png`,
            base64: payloadState.base64[0],
        }).then(res => {
            if (res.status === 201 || res.status === 200) {
                alertShow(true, {
                    onConfirm: false,
                    warning: false,
                    info: false,
                    error: false,
                    success: true,
                    message: 'Import fait avec succés',
                })
                history.push({
                    pathname: 'produit',
                })
                window.location.reload()
            }
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
                <PageTitle label="Modifier image" />
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
