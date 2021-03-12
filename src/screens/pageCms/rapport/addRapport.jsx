/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import addRapportContenuActions from '../../../redux/pageCms/rapport/addRapport'
import RenderForm from '../../../components/formPageCMS/rapport/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'

/**
 * add rapport
 *
 * @class addRapport
 * @extends {React.Component}
 */
class addRapport extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        addRapportReq: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    /**
     * Creates an instance of addRapport.
     *
     * @param {*} props
     * @memberof addRapport
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

    /* functions */
    /**
     * Field change hander
     *
     * @param {object} target
     * @memberof addRapport
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value, files } }) => {
        const { payloadState } = this.state
        const base64 = []
        if (name === 'fileAr' || name === 'fileFr' || name === 'fileEn') {
            const fileToLoad = files[0]
            const fileReader = new FileReader()
            let file = ''
            // eslint-disable-next-line func-names
            fileReader.onload = function(fileLoadedEvent) {
                file = fileLoadedEvent.target.result
                base64.push(file)
            }
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad)
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
     * Cancel Rapport
     *
     * @memberof addRapport
     */
    cancelRapport = () => {
        this.resetForm()
    }

    /**
     * Reset form
     *
     * @memberof addRapport
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
     * Edit Rapport
     *
     * @memberof addRapport
     */
    addRapport = () => {
        const { addRapportReq } = this.props
        const { payloadState } = this.state
        addRapportReq(payloadState)
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
                <PageTitle label="إضافة تقرير" />
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
                                    clicked={this.addRapport}
                                />
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    label="إلغاء"
                                    size="medium"
                                    clicked={this.cancelRapport}
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
        response: state.pageCms.addRapport.error,
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
    addRapportReq: payload =>
        dispatch(addRapportContenuActions.addRapportContenuRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(addRapport))
