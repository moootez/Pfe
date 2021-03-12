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
import getPartSocialsActions from '../../../../../redux/declaration_grab/bien/partSocials/getPartSocials/index'
import addPartSocialsActions from '../../../../../redux/declaration_grab/bien/partSocials/addPartSocials/index'
import updatePartSocialsActions from '../../../../../redux/declaration_grab/bien/partSocials/updatePartSocials/index'
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
            arrayPartSocials: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            listDeclarant: [],
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
        const { getResponsableBienReq, history, getPartSocialsReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getPartSocialsReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        // const { isExist } = this.state
        const {
            history,
            getPartSocialsReq,
            responseAdd,
            responseEdit,
            getPartSocials,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable pSocials et pSocials  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 4 &&
            nextProps.step === 2
        ) {
            getPartSocialsReq(dataDeclaration.id)
        }
        /* get responsable pSocials  */
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
        /* get pSocials */
        if (
            nextProps.getPartSocials !== getPartSocials &&
            nextProps.getPartSocials.data.length !== 0
        ) {
            if (nextProps.getPartSocials.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayPartSocials(nextProps.getPartSocials.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getPartSocials.data[0].nothingToDeclare,
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

    setArrayPartSocials = resPartSocials => {
        const FinalArray = []
        resPartSocials.forEach(partSocials => {
            const objPartSocials = _.omit(partSocials, [
                'publierValeurTotaleDateAcquisation',
                'publierMoyenAcquisation',
                'publierDateAcquisation',
                'publierNbrePartsSociale',
                'publierEntrepriseEmettrice',
                'publierType',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objPartSocials
            Object.keys(objPartSocials).forEach(key => {
                if (
                    objPartSocials[key] &&
                    typeof objPartSocials[key] === 'object'
                ) {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayPartSocials: FinalArray })
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
        this.setState({ arrayPartSocials: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayPartSocials } = this.state
        if (Object.keys(arrayPartSocials[0]).length !== 0) {
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
        const { arrayPartSocials } = this.state
        if (value === undefined && name === 'moyenAcquisation')
            this.setState({ openModalMoyen: true, addedFieldIdMoyen: id })
        if (value === '') delete arrayPartSocials[id][name]
        else arrayPartSocials[id][name] = value
        this.setState({ arrayPartSocials }, () => {
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
    addPartSocialsFn = () => {
        const { arrayPartSocials } = this.state
        this.setState({
            arrayPartSocials: [...arrayPartSocials, {}],
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
        const { arrayPartSocials } = this.state
        return arrayPartSocials
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayPartSocials, noDec, isExist } = this.state
        const { addPartSocialsReq, updatePartSocialsReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id

        const list = arrayPartSocials.map(partSocials => {
            const partSocialsSend = partSocials
            partSocialsSend.declaration = declaration
            partSocialsSend.nothingToDeclare = noDec
            return partSocialsSend
        })

        if (!isExist) addPartSocialsReq(list)
        else updatePartSocialsReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subPsocial = () => {
        const { arrayPartSocials } = this.state
        this.setState({
            arrayPartSocials: arrayPartSocials.slice(
                0,
                arrayPartSocials.length - 1
            ),
            errorSaisie: false,
        })
    }

    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({
            openModalMoyen: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayPartSocials } = this.state
        arrayPartSocials[id][name] = value
        this.closeModal()
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
            arrayPartSocials,
            isExist,
            openModalMoyen,
            addedFieldIdMoyen,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'pSocial' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayPartSocials.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'pSocial',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'pSocialNum',
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
                                                errorsList[`part_${index}`] !==
                                                undefined
                                                    ? errorsList[
                                                          `part_${index}`
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
                                {arrayPartSocials.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subPsocial}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addPartSocialsFn}
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
    getPartSocialsReq: id =>
        dispatch(getPartSocialsActions.getPartSocialsRequest(id)),
    addPartSocialsReq: payload =>
        dispatch(addPartSocialsActions.addPartSocialsRequest(payload)),
    updatePartSocialsReq: partSocial =>
        dispatch(updatePartSocialsActions.updatePartSocialsRequest(partSocial)),
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
    getPartSocials:
        state.declarationGrab.decBien.partSocials.getPartSocials.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
    responseAdd:
        state.declarationGrab.decBien.partSocials.addPartSocials.response,
    responseEdit:
        state.declarationGrab.decBien.partSocials.updatePartSocials.response,
})

/**
 *  Inialisation
 */
Index.defaultProps = {
    getPartSocials: null,
    allReferenciels: {},
    listResponsableRevenus: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getResponsableBienReq: PropTypes.func.isRequired,
    addPartSocialsReq: PropTypes.func.isRequired,
    updatePartSocialsReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getPartSocials: PropTypes.object,
    getPartSocialsReq: PropTypes.func.isRequired,
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
