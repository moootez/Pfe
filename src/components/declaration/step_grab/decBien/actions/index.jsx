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
import getActionsActions from '../../../../../redux/declaration_grab/bien/actions/getActions/index'
import addActionsActions from '../../../../../redux/declaration_grab/bien/actions/addActions/index'
import updateActionsActions from '../../../../../redux/declaration_grab/bien/actions/updateActions/index'
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
            arrayActions: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            listDeclarant: [],
            addedFieldIdMoyen: 0,
            openModalMoyen: false,
        }
        this.payload = {}
    }

    /* life cycle */

    /**
     *
     *
     * @memberof Index
     */

    componentDidMount() {
        /* getResponsableBienReq(); */
        const { getResponsableBienReq, history, getActionsReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getActionsReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof Index
     */
    componentWillReceiveProps(nextProps) {
        // const { isExist } = this.state
        const {
            history,
            getActions,
            getActionsReq,
            responseAdd,
            responseEdit,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable action  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 3 &&
            nextProps.step === 2
        ) {
            getActionsReq(dataDeclaration.id)
        }

        /* get responsable Index  */
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
            nextProps.getActions !== getActions &&
            nextProps.getActions.data.length !== 0
        ) {
            if (nextProps.getActions.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayActions(nextProps.getActions.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getActions.data[0].nothingToDeclare,
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
     * données pour supprimer d'object
     *
     * @memberof Index
     */
    setArrayActions = resActions => {
        const FinalArray = []
        resActions.forEach(action => {
            const objAction = _.omit(action, [
                'status',
                'publierNomRubrique',
                'publierValeurTotaleDateAcquisation',
                'publierMoyenAcquisation',
                'publierDateAcquisation',
                'publierNbreValeur',
                'publierSocieteEmettrice',
                'publierNatureValeur',
                'publierNom',
                'publishedAll',
            ])
            const dec = objAction
            Object.keys(objAction).forEach(key => {
                if (objAction[key] && typeof objAction[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayActions: FinalArray })
    }

    /**
     * check radio bouton
     *
     * @memberof Index
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
     * @memberof Index
     */
    resetForm = () => {
        this.setState({ arrayActions: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayActions } = this.state
        if (Object.keys(arrayActions[0]).length !== 0) {
            this.resetForm()
        } else {
            history.goBack()
        }
    }

    /**
     * set Payload
     *
     * @memberof Index
     */
    fieldChangedHandler = ({ target: { name, value } }, id) => {
        const { arrayActions } = this.state
        if (value === undefined && name === 'moyenAcquisation')
            this.setState({ openModalMoyen: true, addedFieldIdMoyen: id })
        if (value === '') delete arrayActions[id][name]
        else arrayActions[id][name] = value
        this.setState({ arrayActions }, () => {
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
     * ajouter action
     *
     * @memberof Index
     */
    addActionsFn = () => {
        const { arrayActions } = this.state
        this.setState({
            arrayActions: [...arrayActions, {}],
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
     * @memberof Index
     */
    getArrayFromState = () => {
        const { arrayActions } = this.state
        return arrayActions
    }

    /**
     * ajouter
     *
     * @memberof Index
     */
    submitAdd = () => {
        const { arrayActions, isExist, noDec } = this.state
        const { addActionsReq, updateActionsReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arrayActions.map(action => {
            const actionSend = action
            actionSend.declaration = declaration
            actionSend.nothingToDeclare = noDec
            return actionSend
        })
        if (!isExist) addActionsReq(list)
        else updateActionsReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof Index
     */
    subAction = () => {
        const { arrayActions } = this.state
        this.setState({
            arrayActions: arrayActions.slice(0, arrayActions.length - 1),
            errorSaisie: false,
        })
    }

    /**
     * fermer modal
     *
     * @memberof Index
     */
    closeModal = () => {
        this.setState({
            openModalMoyen: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Index
     */

    getAddedField = ({ name, value }, id) => {
        const { arrayActions } = this.state
        arrayActions[id][name] = value
        this.closeModal()
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Index
     */
    render() {
        const { intl, allReferenciels, lng } = this.props
        const {
            noDec,
            listDeclarant,
            errorsList,
            isError,
            errorSaisie,
            arrayActions,
            isExist,
            addedFieldIdMoyen,
            openModalMoyen,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'actions' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayActions.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'actions',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'action',
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
                                                    `action_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `action_${index}`
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
                            openModal={openModalMoyen}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefMoyenAcquisation',
                            }}
                            id={addedFieldIdMoyen}
                            fieldName="moyenAcquisation"
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
                                {arrayActions.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subAction}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addActionsFn}
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
    getActionsReq: id => dispatch(getActionsActions.getActionsRequest(id)),
    addActionsReq: payload =>
        dispatch(addActionsActions.addActionsRequest(payload)),
    updateActionsReq: action =>
        dispatch(updateActionsActions.updateActionsRequest(action)),
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
    getActions: state.declarationGrab.decBien.actions.getActions.response,
    responseAdd: state.declarationGrab.decBien.actions.addActions.response,
    responseEdit: state.declarationGrab.decBien.actions.updateActions.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})
/**
 *  inialisation
 */
Index.defaultProps = {
    getActions: null,
    allReferenciels: {},
    listResponsableRevenus: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getActionsReq: PropTypes.func.isRequired,
    getResponsableBienReq: PropTypes.func.isRequired,
    addActionsReq: PropTypes.func.isRequired,
    updateActionsReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getActions: PropTypes.object,
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
