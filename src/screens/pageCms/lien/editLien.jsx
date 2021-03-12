/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import editLienActions from '../../../redux/pageCms/lien/editLien'
import RenderForm from '../../../components/formPageCMS/lien/form'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'

/**
 * edit lien
 *
 * @class editLien
 * @extends {React.Component}
 */
class editLien extends React.Component {
    static propTypes = {
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        editLienReq: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    /**
     * Creates an instance of editLien.
     *
     * @param {*} props
     * @memberof editLien
     */
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorsList: {},
            payloadState: {},
            idLien: {},
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
        this.setState({ payloadState: index, idLien: index.id })
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
     * Field change hander
     *
     * @param {object} target
     * @memberof editLien
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
     * Cancel Lien
     *
     * @memberof editLien
     */
    cancelLien = () => {
        this.resetForm()
    }

    /**
     * Reset form
     *
     * @memberof editLien
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
     * Edit Lien
     *
     * @memberof editLien
     */
    editLien = () => {
        const { editLienReq } = this.props
        const { payloadState, idLien } = this.state
        editLienReq({ ...payloadState, id: idLien })
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
                <PageTitle label="تعديل الموقع الإلكتروني" />
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
                                    clicked={this.editLien}
                                />
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    label="إلغاء"
                                    size="medium"
                                    clicked={this.cancelLien}
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
        response: state.pageCms.editLien.response,
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
    editLienReq: payload => dispatch(editLienActions.editLienRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(editLien))
