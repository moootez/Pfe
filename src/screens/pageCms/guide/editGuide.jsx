/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import editGuideActions from '../../../redux/pageCms/guide/editGuide'
import RenderForm from '../../../components/formPageCMS/guide/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import alertActions from '../../../redux/alert'

/**
 * edit guide
 *
 * @class editGuide
 * @extends {React.Component}
 */
class editGuide extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        editGuideReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    /**
     * Creates an instance of editGuide.
     *
     * @param {*} props
     * @memberof editGuide
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorPDF: false,
            namePdf: '',
            errorsList: {},
            showFile: null,
            payloadState: {},
            idGuide: {},
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
        const { fileAr, fileFr, fileEn, ...restePayload } = index
        this.setState({
            payloadState: restePayload,
            showFile: { fileAr, fileFr, fileEn },
            idGuide: index.id,
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

    /* function */
    /**
     * Field change hander
     *
     * @param {object} target
     * @memberof editGuide
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
            if (fileToLoad && fileToLoad.size <= 500000) {
                const fileReader = new FileReader()
                let file = ''
                // eslint-disable-next-line func-names
                fileReader.onload = function(fileLoadedEvent) {
                    file = fileLoadedEvent.target.result
                    base64.push(file)
                }
                this.setState({
                    errorPDF: false,
                })
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad)
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
     * Cancel Guide
     *
     * @memberof editGuide
     */
    cancelGuide = () => {
        this.resetForm()
    }

    /**
     * Reset form
     *
     * @memberof editGuide
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
     * Edit Guide
     *
     * @memberof editGuide
     */
    editGuide = () => {
        const { editGuideReq, alertShow } = this.props
        const { payloadState, idGuide, errorPDF, namePdf } = this.state
        if (!errorPDF) editGuideReq({ ...payloadState, id: idGuide })
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
        const { isError, errorsList, payloadState, showFile } = this.state

        return (
            <div className="ctn__declataion">
                <PageTitle label="تعددل دليل المصرح" />
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
                                showFile={showFile}
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
                                    clicked={this.editGuide}
                                />
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    label="إلغاء"
                                    size="medium"
                                    clicked={this.cancelGuide}
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
        response: state.pageCms.editGuide.response,
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
    editGuideReq: payload =>
        dispatch(editGuideActions.editGuideRequest(payload)),
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
)(injectIntl(editGuide))
