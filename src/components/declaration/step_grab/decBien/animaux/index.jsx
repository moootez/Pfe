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
import getAnimauxActions from '../../../../../redux/declaration_grab/bien/animaux/getAnimaux/index'
import addAnimauxActions from '../../../../../redux/declaration_grab/bien/animaux/addAnimaux/index'
import updateAnimauxActions from '../../../../../redux/declaration_grab/bien/animaux/updateAnimaux/index'
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
            arrayAnimaux: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            listDeclarant: [],
            openModalAnimaux: false,
            addedFieldIdAnimaux: 0,
        }
        this.payload = {}
    }

    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        /* getResponsableBienReq(); */
        const { getResponsableBienReq, history, getAnimauxReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getAnimauxReq(dataDeclaration.id)
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
            getAnimaux,
            getAnimauxReq,
            responseAdd,
            responseEdit,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable Index  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 7 &&
            nextProps.step === 2
        ) {
            getAnimauxReq(dataDeclaration.id)
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
            nextProps.getAnimaux !== getAnimaux &&
            nextProps.getAnimaux.data.length !== 0
        ) {
            if (nextProps.getAnimaux.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayAnimaux(nextProps.getAnimaux.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getAnimaux.data[0].nothingToDeclare,
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
     * @memberof Index
     */
    setArrayAnimaux = resPartSocials => {
        const FinalArray = []
        resPartSocials.forEach(animal => {
            const objAnimal = _.omit(animal, [
                'publierValeurApproximative',
                'publierNombre',
                'publierType',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objAnimal
            Object.keys(objAnimal).forEach(key => {
                if (objAnimal[key] && typeof objAnimal[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayAnimaux: FinalArray })
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
        this.setState({ arrayAnimaux: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayAnimaux } = this.state
        if (Object.keys(arrayAnimaux[0]).length !== 0) {
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
        const { arrayAnimaux } = this.state
        if (value === undefined && name === 'type')
            this.setState({ openModalAnimaux: true, addedFieldIdAnimaux: id })
        if (value === '') delete arrayAnimaux[id][name]
        else arrayAnimaux[id][name] = value
        this.setState({ arrayAnimaux }, () => {
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
     * add animaux
     *
     * @memberof Index
     */
    addAnimalFn = () => {
        const { arrayAnimaux } = this.state
        this.setState({
            arrayAnimaux: [...arrayAnimaux, {}],
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
                Object.keys(item).length === 4 ||
                (Object.keys(item).length === 6 &&
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
        const { arrayAnimaux } = this.state
        return arrayAnimaux
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayAnimaux, noDec, isExist } = this.state
        const { addAnimauxReq, updateAnimauxReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arrayAnimaux.map(animal => {
            const animalSend = animal
            animalSend.declaration = declaration
            animalSend.nothingToDeclare = noDec
            return animalSend
        })
        if (!isExist) addAnimauxReq(list)
        else updateAnimauxReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subAnimal = () => {
        const { arrayAnimaux } = this.state
        this.setState({
            arrayAnimaux: arrayAnimaux.slice(0, arrayAnimaux.length - 1),
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
            openModalAnimaux: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayAnimaux } = this.state
        arrayAnimaux[id][name] = value
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
            arrayAnimaux,
            isExist,
            openModalAnimaux,
            addedFieldIdAnimaux,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'animeaux' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayAnimaux.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'animeaux',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'addAnimau',
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
                                                    `animaux_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `animaux_${index}`
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
                            openModal={openModalAnimaux}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefTypeAnimale',
                            }}
                            id={addedFieldIdAnimaux}
                            fieldName="type"
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
                                {arrayAnimaux.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subAnimal}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addAnimalFn}
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
    getAnimauxReq: id => dispatch(getAnimauxActions.getAnimauxRequest(id)),
    addAnimauxReq: payload =>
        dispatch(addAnimauxActions.addAnimauxRequest(payload)),
    updateAnimauxReq: animal =>
        dispatch(updateAnimauxActions.updateAnimauxRequest(animal)),
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
    getAnimaux: state.declarationGrab.decBien.animaux.getAnimaux.response,
    responseAdd: state.declarationGrab.decBien.animaux.addAnimaux.response,
    responseEdit: state.declarationGrab.decBien.animaux.updateAnimaux.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getAnimaux: null,
    allReferenciels: {},
    listResponsableRevenus: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getAnimauxReq: PropTypes.func.isRequired,
    addAnimauxReq: PropTypes.func.isRequired,
    updateAnimauxReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getAnimaux: PropTypes.object,
    getResponsableBienReq: PropTypes.func.isRequired,
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
