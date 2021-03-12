/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import editFaqActions from '../../../redux/pageCms/faq/editFaq'
import RenderForm from '../../../components/formPageCMS/faq/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'

/**
 * edit FAQ
 *
 * @class editFaq
 * @extends {React.Component}
 */
class editFaq extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        editFaqReq: PropTypes.func.isRequired,
        allReferenciels: PropTypes.object.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    /**
     * Creates an instance of editFaq.
     *
     * @param {*} props
     * @memberof editFaq
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorsList: {},
            payloadState: {},
            idFaq: {},
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
        this.setState({
            payloadState: {
                ...index,
                sujet: index.sujet.id,
                theme: index.theme.id,
            },
            idFaq: index.id,
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
        /* test errror */
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
     * @memberof editFaq
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value, files } }) => {
        const { payloadState } = this.state
        const base64 = []
        if (name === 'image') {
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
                [name]: name === 'image' ? base64 : value,
            },
        })
    }

    /**
     * Cancel Faq
     *
     * @memberof editFaq
     */
    cancelFaq = () => {
        this.resetForm()
    }

    /**
     * Reset form
     *
     * @memberof editFaq
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
     * Edit Faq
     *
     * @memberof editFaq
     */
    editFaq = () => {
        const { editFaqReq } = this.props
        const { payloadState, idFaq } = this.state
        editFaqReq({ ...payloadState, id: idFaq })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { lng, intl, allReferenciels } = this.props
        const { isError, errorsList, payloadState } = this.state

        return (
            <div className="ctn__declataion">
                <PageTitle label="تعددل الاسئلة/الاجوبة" />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            <RenderForm
                                lng={lng}
                                allReferenciels={allReferenciels}
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
                                    clicked={this.editFaq}
                                />
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    label="إلغاء"
                                    size="medium"
                                    clicked={this.cancelFaq}
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
        response: state.pageCms.editFaq.response,
        lng: state.info.language,
        allReferenciels: state.referencial.allReferencials.response,
    }
}
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    editFaqReq: payload => dispatch(editFaqActions.editFaqRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(editFaq))
