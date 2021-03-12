import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getResponsableBienActions from '../../../../../redux/declaration_grab/bien/revenus/getResponsableRevenu'
import getPretsActions from '../../../../../redux/declaration_grab/bien/prets/getPrets/index'
import addPretsActions from '../../../../../redux/declaration_grab/bien/prets/addPrets/index'
import updatePretsActions from '../../../../../redux/declaration_grab/bien/prets/updatePrets/index'
import changeStepActions from '../../../../../redux/step_saisie/index'
import SubTitle from '../../../../ui/subTitle/index'
import ButtonPlus from '../../../../ui/buttonPlus/index'
import ItemTitle from '../../../../ui/itemCmp'
import PopupAutre from '../../popupAutre'

/**
 *
 *
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noDec: false,
            arrayPrets: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            listDeclarant: [],
            openModal: false,
            addedFieldId: 0,
            openModalMoyen: false,
            addedFieldIdMoyen: 0,
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
        /* getResponsableBienReq(); */
        const { getResponsableBienReq, history, getPretsReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getPretsReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const {
            history,
            getPrets,
            getPretsReq,
            responseAdd,
            responseEdit,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable Animaux  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 11 &&
            nextProps.step === 2
        ) {
            getPretsReq(dataDeclaration.id)
        }

        /* get responsable Animaux  */

        if (
            nextProps.listResponsableRevenus !== listResponsableRevenus &&
            Object.keys(nextProps.listResponsableRevenus).length > 0
        ) {
            const array = Object.values(nextProps.listResponsableRevenus)
            const listDeclarant = _.concat(
                array[0].length !== 0
                    ? array[0][0].length !== 0
                        ? array[0][0].value !== ' '
                            ? array[0]
                            : []
                        : []
                    : [],
                array[1].length !== 0
                    ? array[1][0].length !== 0
                        ? array[1][0].value !== ' '
                            ? array[1]
                            : []
                        : []
                    : [],
                array[2].length !== 0
                    ? array[2][0].length !== 0
                        ? array[2][0].value !== ' '
                            ? array[2]
                            : []
                        : []
                    : []
            )
            this.setState({ listDeclarant })
        }
        if (
            nextProps.getPrets !== getPrets &&
            nextProps.getPrets.data.length !== 0
        ) {
            if (nextProps.getPrets.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayPrets(nextProps.getPrets.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getPrets.data[0].nothingToDeclare,
                })
            }
        }
        /* response add */
        if (
            nextProps.responseAdd !== responseAdd &&
            nextProps.responseAdd.data.status === 'error'
        ) {
            this.setState({
                isError: true,
                errorsList: nextProps.responseAdd.data.data,
            })
        }
        /* response edit */
        if (
            nextProps.responseEdit !== responseEdit &&
            nextProps.responseEdit.data.status === 'error'
        ) {
            this.setState({
                isError: true,
                errorsList: nextProps.responseEdit.data.data,
            })
        }
    }

    /* functions */

    /**
     *
     *
     * @memberof Animaux
     */

    setArrayPrets = resPrets => {
        const FinalArray = []
        resPrets.forEach(pret => {
            const objPrets = _.omit(pret, [
                'publierDateRemboursement',
                'publierDureeRemboursement',
                'publierMontant',
                'publierNature',
                'publierValeur',
                'publierSocieteEmettrice',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objPrets
            Object.keys(objPrets).forEach(key => {
                if (objPrets[key] && typeof objPrets[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayPrets: FinalArray })
    }

    /**
     * check radio bouton
     *
     * @memberof
     */
    setCheck = (name, checked) => {
        this.setState({ [name]: checked, errorSaisie: !checked })
        if (checked) {
            this.resetForm()
        }
    }

    /**
     * retouner objet
     *
     * @memberof
     */
    resetForm = () => {
        this.setState({ arrayPrets: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayPrets } = this.state
        if (Object.keys(arrayPrets[0]).length !== 0) {
            this.resetForm()
        } else {
            history.goBack()
        }
    }

    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value } }, id) => {
        const { arrayPrets } = this.state
        if (value === undefined && name === 'societeEmettrice')
            this.setState({ openModal: true, addedFieldId: id })
        if (value === undefined && name === 'nature')
            this.setState({ openModalMoyen: true, addedFieldIdMoyen: id })
        if (value === '') delete arrayPrets[id][name]
        else arrayPrets[id][name] = value
        this.setState({ arrayPrets }, () => {
            const tmp = this.getArrayFromState()
            if (this.verifIfOk(tmp)) {
                this.setState({
                    errorSaisie: false,
                })
            } else
                this.setState({
                    errorSaisie: true,
                })
        })
    }

    /**
     * ajouter sous rubrique
     *
     * @memberof Immeubles
     */
    addPretsFn = () => {
        const { arrayPrets } = this.state
        this.setState({
            arrayPrets: [...arrayPrets, {}],
            errorSaisie: true,
        })
    }

    /**
     * vérification des donnée input
     *
     * @memberof
     */
    verifIfOk = array => {
        const a = []
        array.forEach(item => {
            if (
                Object.keys(item).length === 7 ||
                (Object.keys(item).length === 9 &&
                    Object.keys(item).includes('declaration') &&
                    Object.keys(item).includes('id'))
            ) {
                a.push(item)
            }
        })
        return a.length === array.length
    }

    /**
     * render array
     *
     * @memberof
     */
    getArrayFromState = () => {
        const { arrayPrets } = this.state
        return arrayPrets
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayPrets, noDec, isExist } = this.state
        const { addPretsReq, updatePretsReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arrayPrets.map(pret => {
            const pretsSend = pret
            pretsSend.declaration = declaration
            pretsSend.nothingToDeclare = noDec
            return pretsSend
        })
        if (!isExist) addPretsReq(list)
        else updatePretsReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subPrets = () => {
        const { arrayPrets } = this.state
        this.setState({
            arrayPrets: arrayPrets.slice(0, arrayPrets.length - 1),
            errorSaisie: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayPrets } = this.state
        arrayPrets[id][name] = value
        this.closeModal()
    }

    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({ openModal: false, openModalMoyen: false })
    }

    /* render */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { intl, allReferenciels, lng } = this.props
        const {
            noDec,
            listDeclarant,
            errorsList,
            isError,
            errorSaisie,
            arrayPrets,
            openModal,
            addedFieldId,
            isExist,
            openModalMoyen,
            addedFieldIdMoyen,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'prets' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayPrets.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'prets',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'pretsNum',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            payload={child}
                                            listDeclarant={listDeclarant}
                                            allReferenciels={allReferenciels}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `PretAcquis_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `PretAcquis_${index}`
                                                      ]
                                                    : {}
                                            }
                                            fieldChangedHandler={
                                                this.fieldChangedHandler
                                            }
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            className="gridItem"
                            style={{ marginTop: '15px' }}
                        >
                            <Check
                                selectedValue={noDec}
                                label={intl.formatMessage({ id: 'rien' })}
                                name="noDec"
                                onchange={(name, checked) =>
                                    this.setCheck(name, checked)
                                }
                            />
                        </Grid>
                        <PopupAutre
                            openModal={openModal}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefBanque',
                            }}
                            id={addedFieldId}
                            fieldName="societeEmettrice"
                        />
                        <PopupAutre
                            openModal={openModalMoyen}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefNaturePret',
                            }}
                            id={addedFieldIdMoyen}
                            fieldName="nature"
                        />
                        <Grid>
                            <center>
                                {errorSaisie && (
                                    <span
                                        style={{
                                            color: 'red',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {intl.formatMessage({
                                            id: 'errsaisie',
                                        })}
                                    </span>
                                )}
                            </center>
                            <div className="d-flex justify-content-center">
                                {arrayPrets.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subPrets}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addPretsFn}
                                    />
                                )}
                            </div>
                        </Grid>
                        <div style={{ textAlign: 'center', padding: 20 }}>
                            <Divider />
                            <div>
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    size="medium"
                                    label={intl.formatMessage({
                                        id: 'BtnValider',
                                    })}
                                    clicked={this.submitAdd}
                                />
                                <ButtonComponent
                                    // disabled={disable}
                                    color="secondary"
                                    type="contained"
                                    size="medium"
                                    label={intl.formatMessage({
                                        id: 'btnAnnuer',
                                    })}
                                    clicked={this.cancelForm}
                                />
                            </div>
                        </div>
                    </div>
                </FormGroup>
            </div>
        )
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getResponsableBienReq: payload =>
        dispatch(
            getResponsableBienActions.getResponsableRevenusRequest(payload)
        ),
    getPretsReq: id => dispatch(getPretsActions.getPretsRequest(id)),
    addPretsReq: payload => dispatch(addPretsActions.addPretsRequest(payload)),
    updatePretsReq: pret =>
        dispatch(updatePretsActions.updatePretsRequest(pret)),
    changeStep: step => dispatch(changeStepActions.changeStepSaisie(step)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    allReferenciels: state.referencial.allReferencials.response,
    listResponsableRevenus:
        state.declarationGrab.getResponsableRevenus.response,
    lng: state.info.language,
    step: state.stepSaisie.step,
    getPrets: state.declarationGrab.decBien.prets.getPrets.response,
    responseAdd: state.declarationGrab.decBien.prets.addPrets.response,
    responseEdit: state.declarationGrab.decBien.prets.updatePrets.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getPrets: null,
    listResponsableRevenus: null,
    allReferenciels: {},
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getResponsableBienReq: PropTypes.func.isRequired,
    addPretsReq: PropTypes.func.isRequired,
    updatePretsReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getPretsReq: PropTypes.func.isRequired,
    getPrets: PropTypes.object,
    history: PropTypes.object.isRequired,
    /* getResponsableBienReq: PropTypes.func.isRequired, */
    allReferenciels: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
    lng: PropTypes.string.isRequired,
    stepDeclaration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
