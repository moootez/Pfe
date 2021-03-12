/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import addTextJuridiqueActions from '../../../redux/pageCms/textJuridique/addTextJuridique'
import RenderForm from '../../../components/formPageCMS/textJuridique/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import alertActions from '../../../redux/alert'

/**
 * add text jur
 *
 * @class addTextJuridique
 * @extends {React.Component}
 */
class addTextJuridique extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        addTextJuridiqueReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    /**
     * Creates an instance of addTextJuridique.
     *
     * @param {*} props
     * @memberof addTextJuridique
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorsList: {},
            payloadState: {},
            errorPDF: false,
            namePdf: '',
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
     * @memberof addTextJuridique
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
        if (name === 'fileAr' || name === 'fileFr' || name === 'fileEn') {
            const fileToLoad = files[0]
            const fileReader = new FileReader()
            if (fileToLoad && fileToLoad.size <= 500000) {
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
                    namePdf: name,
                })
                alertShow(true, {
                    warning: false,
                    info: false,
                    error: true,
                    success: false,
                    message: `الرجاء تقليل حجم ملف PDF`,
                })
            }
        }
        console.log('payloadState', payloadState)
        this.setState({
            payloadState: {
                ...payloadState,
                [name]:
                    name === 'fileAr' || name === 'fileFr' || name === 'fileEn'
                        ? base64
                        : value,
            },
        })
    }

    /**
     * Cancel TextJuridique
     *
     * @memberof addTextJuridique
     */
    cancelTextJuridique = () => {
        this.resetForm()
    }

    /**
     * Reset form
     *
     * @memberof addTextJuridique
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
     * Edit TextJuridique
     *
     * @memberof addTextJuridique
     */
    addTextJuridique = () => {
        const { addTextJuridiqueReq, alertShow } = this.props
        const { payloadState, errorPDF, namePdf } = this.state
        const list = [
            { label: 'قانون', value: 1 },
            { label: 'أمر مرسوم', value: 2 },
            { label: 'مذكرة', value: 3 },
        ]
        const natureId = list.filter(index => {
            if (index.label === payloadState.nature) return index.value
            return null
        })
        if (!errorPDF)
            addTextJuridiqueReq({
                ...payloadState,
                nature: natureId[0] && natureId[0].value,
            })
        else
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: `الرجاء تقليل حجم ملف PDF ${namePdf}`,
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
                <PageTitle label="إضافة نص  قانوني" />
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
                                    label="تأكيد"
                                    clicked={this.addTextJuridique}
                                />
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    label="إلغاء"
                                    size="medium"
                                    clicked={this.cancelTextJuridique}
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
        response: state.pageCms.addTextJuridique.error,
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
    addTextJuridiqueReq: payload =>
        dispatch(addTextJuridiqueActions.addTextJuridiqueRequest(payload)),
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
)(injectIntl(addTextJuridique))
