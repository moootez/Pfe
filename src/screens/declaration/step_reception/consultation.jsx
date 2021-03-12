/* eslint-disable radix */
import React from 'react'
import { Grid, FormGroup, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import getDeclarantionActions from '../../../redux/declaration/declarant'
import addDeclarantionActions from '../../../redux/declaration/addDeclaration'
import Form from '../../../components/declaration/step_reception/consultation/consultationForm'
import ButtonComponent from '../../../components/ui/button'
import FormAssujetti from '../../../components/declaration/step_reception/consultationAssujetti/consultationForm'
import deleteDeclarantionActions from '../../../redux/declaration/deleteDeclarationAssujetti'

/**
 * Declaration Reception Consultation
 *
 * @class Consultation
 * @extends {React.Component}
 */
class Consultation extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
    }

    /**
     * Creates an instance of Consultation.
     *
     * @param {*} props
     * @memberof Consultation
     */
    constructor(props) {
        super(props)
        this.state = {}
        this.declarantForm = props.history.location.state.dataDeclaration
        this.payload = {}
    }

    /**
     * add declaration assujetti
     *
     * @memberof Consultation
     */
    addDeclarationAssujetti = () => {
        const {
            addDeclarantionReq,
            history,
            deleteDeclarantionReq,
        } = this.props
        addDeclarantionReq({
            ...history.location.state.dataDeclaration,
            nationalite:
                history.location.state.dataDeclaration.user.nationalite,
            adresseNaissance:
                history.location.state.dataDeclaration.user.adresseNaissance,
            situationCivile:
                history.location.state.dataDeclaration.user.situationCivile,
            tel: history.location.state.dataDeclaration.user.tel,
        })
        setTimeout(() => {
            deleteDeclarantionReq(history.location.state.dataDeclaration)
        }, 7000)
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { intl, history } = this.props
        return (
            <div className="ctn__declataion">
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {history.location.state.type ===
                                'validationAssujetti' ||
                            history.location.state.type ===
                                'saisieAssujetti' ? (
                                <FormAssujetti payload={this.declarantForm} />
                            ) : (
                                <Form payload={this.declarantForm} />
                            )}
                        </Grid>
                        <Grid>
                            <div style={{ textAlign: 'center', padding: 20 }}>
                                <div>
                                    <Divider />
                                    {history.location.state.type ===
                                    'validationAssujetti' ? (
                                        <ButtonComponent
                                            color="secondary"
                                            type="contained"
                                            size="medium"
                                            label="تأكيد"
                                            clicked={
                                                this.addDeclarationAssujetti
                                            }
                                        />
                                    ) : null}
                                    <ButtonComponent
                                        color="secondary"
                                        type="contained"
                                        size="medium"
                                        label={intl.formatMessage({
                                            id: 'btnRetour',
                                        })}
                                        clicked={() => {
                                            history.goBack()
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>
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
const mapStateToProps = state => ({
    declarant: state.declarationReception.getDeclarant.response,
})
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    ConsulterDeclaration: payload =>
        dispatch(getDeclarantionActions.getDeclarationRequest(payload)),
    addDeclarantionReq: payload =>
        dispatch(addDeclarantionActions.addDeclarationRequest(payload)),
    deleteDeclarantionReq: payload =>
        dispatch(
            deleteDeclarantionActions.deleteDeclarationAssujettiRequest(payload)
        ),
})
/**
 *  declaration des props
 */
Consultation.propTypes = {
    intl: PropTypes.object.isRequired,
    addDeclarantionReq: PropTypes.func.isRequired,
    deleteDeclarantionReq: PropTypes.func.isRequired,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Consultation))
