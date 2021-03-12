/* eslint-disable radix */
import React from 'react'
import { Grid, FormGroup, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import getDeclarantionActions from '../../../redux/declaration/declarant'
import addDeclarantionActions from '../../../redux/declaration/addDeclaration'
import Form from '../../../components/declarantInterne/consultation/consultationForm'
import ButtonComponent from '../../../components/ui/button'
import ItemTitle from '../../../components/ui/itemCmp'
import deleteDeclarantionActions from '../../../redux/declaration/deleteDeclarationAssujetti'
import TableAvis from '../getAvis'
import TableSanction from '../getSanction'
import PopupAdd from '../popup/popupAdd'
import PageTitle from '../../../components/ui/pageTitle'

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
        this.state = {
            visibleAddSanction: false,
            visibleAddAvis: false,
            typeSanction: 'declarantInterneSanction',
            typeAvis: 'declarantInterneAvis',
        }
        this.declarantForm = props.history.location.state.dataDeclaration
        this.payload = {}
    }

    /**
     *
     * editer declarant
     * @memberof Consultation
     */
    editDeclarant = () => {
        const { history } = this.props
        const { state } = history.location
        history.push({
            pathname: `/declarant_interne_edit/${state.idDeclaration}`,
            state: {
                ...state,
            },
        })
    }

    /**
     * set data sanction (declarant)
     *
     * @memberof Consultation
     */
    addDeclarantSancation = () => {
        this.setState({ visibleAddSanction: true, visibleAddAvis: false })
    }

    /**
     * set data avis (declarant)
     *
     * @memberof Consultation
     */
    addDeclarantAvis = () => {
        this.setState({ visibleAddSanction: false, visibleAddAvis: true })
    }

    /**
     * close modal
     *
     * @memberof Consultation
     */
    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({ visibleAddSanction: false, visibleAddAvis: false })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { intl, history, filtredTableAvis } = this.props
        const {
            typeSanction,
            typeAvis,
            visibleAddSanction,
            visibleAddAvis,
        } = this.state

        return (
            <div className="ctn__declataion">
                <Grid className="gridItem">
                    <PageTitle label="الإطلاع على معلومات المصرح" />
                </Grid>
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            <ItemTitle label="معطيات شخصية" />
                            <div>
                                <Divider />
                                <Grid container>
                                    <Form payload={this.declarantForm} />
                                </Grid>
                            </div>
                        </Grid>
                        {this.declarantForm.declarant === true && (
                            <div>
                                <div>
                                    <Divider />
                                </div>
                                <Grid container>
                                    <ItemTitle label="التنابيه" />
                                </Grid>
                                <Grid container>
                                    <TableAvis history={this.declarantForm} />
                                    {this.declarantForm.declarant === true && (
                                        <ButtonComponent
                                            color="secondary"
                                            type="contained"
                                            size="medium"
                                            label="تسجيل تنبيه"
                                            clicked={this.addDeclarantAvis}
                                        />
                                    )}
                                </Grid>
                                <div>
                                    <Divider />
                                </div>
                                <Grid container>
                                    <ItemTitle label="العقوبات المسجلة" />
                                </Grid>
                                <Grid container>
                                    <TableSanction
                                        history={this.declarantForm}
                                    />
                                    {this.declarantForm.declarant === true &&
                                        (filtredTableAvis &&
                                            filtredTableAvis.length > 0) && (
                                            <ButtonComponent
                                                color="secondary"
                                                type="contained"
                                                size="medium"
                                                label="تسجيل عقوبة"
                                                clicked={
                                                    this.addDeclarantSancation
                                                }
                                            />
                                        )}
                                </Grid>
                            </div>
                        )}
                        <Grid>
                            <div style={{ textAlign: 'center', padding: 20 }}>
                                <div>
                                    <Divider />
                                    <ButtonComponent
                                        color="secondary"
                                        type="contained"
                                        size="medium"
                                        label="تحيين"
                                        clicked={this.editDeclarant}
                                    />
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
                <PopupAdd
                    visible={visibleAddSanction}
                    onClickAway={this.closeModal}
                    type={typeSanction}
                    payload={this.declarantForm}
                    form="ajout"
                />
                <PopupAdd
                    visible={visibleAddAvis}
                    onClickAway={this.closeModal}
                    type={typeAvis}
                    payload={this.declarantForm}
                    form="ajout"
                />
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
    filtredTableAvis: state.declarantInterne.getDeclarantAvis.response,
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
    filtredTableAvis: PropTypes.object.isRequired,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Consultation))
