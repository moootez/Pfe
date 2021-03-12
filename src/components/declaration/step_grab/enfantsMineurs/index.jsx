import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Form from './Form'
import Check from '../../../ui/checkBox'
import ItemTitle from '../../../ui/itemCmp'
import ButtonComponent from '../../../ui/button'
import ButtonPlus from '../../../ui/buttonPlus/index'
// import getCodePostalByGovActions from '../../../../redux/referencial/getCodePostalByGov'
import addEnfantMineurActions from '../../../../redux/declaration_grab/enfantsMineurs/addEnfantMineur/index'
import getEnfantMineurActions from '../../../../redux/declaration_grab/enfantsMineurs/getEnfantMineur/index'
import updateEnfantMineurActions from '../../../../redux/declaration_grab/enfantsMineurs/updateEnfantMineur/index'
import getAllCodePostalActions from '../../../../redux/referencial/getAllCodePostal'
import alertActions from '../../../../redux/alert'
import PopupAutre from '../popupAutre'

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
            arrayChildren: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            openModalGouvernoratResidence: false,
            addedFieldIdGouvernoratResidence: 0,
            openModalCodePostaleResidence: false,
            addedFieldIdCodePostaleResidence: 0,
            openModalDelegationResidence: false,
            addedFieldIdDelegationResidence: 0,
            // listCodePostalByGov: [],
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
        const { getEnfantMineurReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getEnfantMineurReq(dataDeclaration.user.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const {
            getEnfant,
            responseAdd,
            responseEdit,
            getEnfantMineurReq,
            history,
            step,
        } = this.props
        /* get Enfant request */
        const { dataDeclaration } = history.location.state
        if (nextProps.step !== step && nextProps.step === 1) {
            getEnfantMineurReq(dataDeclaration.user.id)
        }
        /* update State from props */
        // if (nextProps.listCodePostal && nextProps.listCodePostal.length > 0)
        //     this.setState({ listCodePostalByGov: nextProps.listCodePostal })
        if (
            nextProps.getEnfant !== getEnfant &&
            nextProps.getEnfant.data.length !== 0
        ) {
            if (nextProps.getEnfant.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayChildren(nextProps.getEnfant.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getEnfant.data[0].nothingToDeclare,
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
        this.setState({ arrayChildren: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayChildren } = this.state
        if (Object.keys(arrayChildren[0]).length !== 0) {
            this.resetForm()
        } else {
            history.goBack()
        }
    }

    setArrayChildren = resChildren => {
        // const { getAllCodePostalReq } = this.props
        // getAllCodePostalReq()
        const FinalArray = []
        resChildren.forEach(enfant => {
            const objEnfant = _.omit(enfant, [
                'qrCode',
                'publishedAll',
                'publierNom',
                'publierPrenomTripartite',
                'publierDateNaissance',
                'publierAdresseResidence',
                'publierLieuNaissance',
                'publierGouvernoratResidence',
                'publierCodePostaleResidence',
                'publierNomRubrique',
            ])
            const dec = objEnfant
            Object.keys(objEnfant).forEach(key => {
                if (objEnfant[key] && typeof objEnfant[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })

        this.setState({ arrayChildren: FinalArray })
    }

    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value } }, id) => {
        // const { getCodePostalByGovReq } = this.props
        // if (name === 'gouvernoratResidence') getCodePostalByGovReq(value)
        const { arrayChildren } = this.state
        if (value === undefined && name === 'gouvernoratResidence')
            this.setState({
                openModalGouvernoratResidence: true,
                addedFieldIdGouvernoratResidence: id,
            })
        if (value === undefined && name === 'delegationResidence')
            this.setState({
                openModalDelegationResidence: true,
                addedFieldIdDelegationResidence: id,
            })
        if (value === undefined && name === 'codePostaleResidence')
            this.setState({
                openModalCodePostaleResidence: true,
                addedFieldIdCodePostaleResidence: id,
            })
        if (value === '') delete arrayChildren[id][name]
        else arrayChildren[id][name] = value
        this.setState({ arrayChildren }, () => {
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

    addChildren = () => {
        const { arrayChildren } = this.state
        this.setState({
            arrayChildren: [...arrayChildren, {}],
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
                    Object.keys(item).includes('declarant') &&
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
        const { arrayChildren } = this.state
        return arrayChildren
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayChildren, noDec, isExist } = this.state
        const {
            addEnfantMineurReq,
            updateEnfantMineurReq,
            history,
        } = this.props
        const { dataDeclaration } = history.location.state
        const declarant = dataDeclaration.user.id
        if (!isExist) {
            const listToAdd = arrayChildren.map(enfant => {
                const enfsend = enfant
                enfsend.declarant = declarant
                enfsend.nothingToDeclare = noDec
                return enfsend
            })
            addEnfantMineurReq(listToAdd)
        } else {
            const listToEdit = arrayChildren.map(enfant => {
                const enfsend = enfant
                enfsend.declarant = declarant
                enfsend.nothingToDeclare = noDec
                return enfsend
            })
            updateEnfantMineurReq(listToEdit)
        }
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subChildren = () => {
        const { arrayChildren } = this.state
        this.setState({
            arrayChildren: arrayChildren.slice(0, arrayChildren.length - 1),
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
            openModalGouvernoratResidence: false,
            openModalDelegationResidence: false,
            openModalCodePostaleResidence: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayChildren } = this.state
        arrayChildren[id][name] = value
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
            // listCodePostalByGov,
            errorSaisie,
            errorsList,
            isError,
            arrayChildren,
            isExist,
            openModalGouvernoratResidence,
            addedFieldIdGouvernoratResidence,
            openModalCodePostaleResidence,
            addedFieldIdCodePostaleResidence,
            openModalDelegationResidence,
            addedFieldIdDelegationResidence,
        } = this.state
        const falseBool = false
        console.log('arrayChildren', arrayChildren, this.payload)

        return (
            <div style={{ paddingTop: '1em' }}>
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayChildren.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'enfantNum',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'enfantNum',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            intl={intl}
                                            lng={lng}
                                            id={index}
                                            disabled={noDec}
                                            payload={child}
                                            // listCodePostalByGov={
                                            //     listCodePostalByGov
                                            // }
                                            allReferenciels={allReferenciels}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `enfant_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `enfant_${index}`
                                                      ]
                                                    : {}
                                            }
                                            fieldChangedHandler={
                                                this.fieldChangedHandler
                                            }
                                        />
                                        <PopupAutre
                                            openModal={
                                                openModalGouvernoratResidence
                                            }
                                            onClickAway={this.closeModal}
                                            AddedField={this.getAddedField}
                                            payload={{
                                                publier: false,
                                                categorie: 'RefGouvernorat',
                                            }}
                                            id={
                                                addedFieldIdGouvernoratResidence
                                            }
                                            fieldName="gouvernoratResidence"
                                        />
                                        <PopupAutre
                                            openModal={
                                                openModalDelegationResidence
                                            }
                                            onClickAway={this.closeModal}
                                            AddedField={this.getAddedField}
                                            payload={{
                                                publier: false,
                                                categorie: 'RefDelegation',
                                                parent: {
                                                    id:
                                                        arrayChildren &&
                                                        arrayChildren[index]
                                                            .gouvernoratResidence,
                                                },
                                            }}
                                            id={addedFieldIdDelegationResidence}
                                            fieldName="delegationResidence"
                                        />
                                        <PopupAutre
                                            openModal={
                                                openModalCodePostaleResidence
                                            }
                                            onClickAway={this.closeModal}
                                            AddedField={this.getAddedField}
                                            payload={{
                                                publier: false,
                                                categorie: 'RefCodePostale',
                                                parent: {
                                                    id:
                                                        arrayChildren &&
                                                        arrayChildren[index]
                                                            .delegationResidence,
                                                },
                                            }}
                                            id={
                                                addedFieldIdCodePostaleResidence
                                            }
                                            fieldName="codePostaleResidence"
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>

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
                                {arrayChildren.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subChildren}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addChildren}
                                    />
                                )}
                            </div>
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
    // getCodePostalByGovReq: payload =>
    //     dispatch(getCodePostalByGovActions.getCodePostalByGovRequest(payload)),
    getAllCodePostalReq: () =>
        dispatch(getAllCodePostalActions.getAllCodePostalRequest()),
    addEnfantMineurReq: enfant =>
        dispatch(
            addEnfantMineurActions.addEnfantMineurDeclarationsRequest(enfant)
        ),
    getEnfantMineurReq: id =>
        dispatch(getEnfantMineurActions.getEnfantRequest(id)),
    updateEnfantMineurReq: enfant =>
        dispatch(updateEnfantMineurActions.updateEnfantRequest(enfant)),
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

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    allReferenciels: state.referencial.allReferencials.response,
    allCodePostal: state.referencial.allCodePostal.response,
    // listCodePostal: state.referencial.getCodePostalByGov.response,
    lng: state.info.language,
    step: state.stepSaisie.step,
    getEnfant:
        state.declarationGrab.enfantsMineur.getEnfantMineurDeclaration.response,
    responseAdd:
        state.declarationGrab.enfantsMineur.addEnfantMineurDeclaration.response,
    responseEdit:
        state.declarationGrab.enfantsMineur.updateEnfantMineurDeclaration
            .response,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getEnfant: null,
    // listCodePostal: null,
    allReferenciels: {},
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // getCodePostalByGovReq: PropTypes.func.isRequired,
    updateEnfantMineurReq: PropTypes.func.isRequired,
    /* getAllCodePostalReq: PropTypes.func.isRequired, */
    addEnfantMineurReq: PropTypes.func.isRequired,
    getEnfantMineurReq: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    getEnfant: PropTypes.object,
    // listCodePostal: PropTypes.array,
    /*  allCodePostal: PropTypes.object
         .isRequired, */
    lng: PropTypes.string.isRequired,
    /* alertShow: PropTypes.func.isRequired, */
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
    step: PropTypes.number.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
