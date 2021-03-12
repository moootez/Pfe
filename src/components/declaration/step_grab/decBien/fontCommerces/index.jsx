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
// import getCodePostalByGovActions from '../../../../../redux/referencial/getCodePostalByGov'
import getFontsActions from '../../../../../redux/declaration_grab/bien/fonts/getFonts'
import addFontsActions from '../../../../../redux/declaration_grab/bien/fonts/addFonts/index'
import updateFontsActions from '../../../../../redux/declaration_grab/bien/fonts/updateFonts/index'
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
            arrayFonts: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            // listCodePostalByGov: [],
            listDeclarant: [],
            openModalType: false,
            addedFieldIdType: 0,
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
        const { getResponsableBienReq, history, getFontsReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getFontsReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        // const { isExist } = this.state
        // /* get code Postal */
        // if (nextProps.listCodePostal && nextProps.listCodePostal.length > 0)
        //     this.setState({ listCodePostalByGov: nextProps.listCodePostal })
        // else this.setState({ listCodePostalByGov: [] })
        const {
            history,
            getFonts,
            getFontsReq,
            responseAdd,
            responseEdit,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable valeurs  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 6 &&
            nextProps.step === 2
        ) {
            getFontsReq(dataDeclaration.id)
        }

        /* get responsable Valeurs  */
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
            nextProps.getFonts !== getFonts &&
            nextProps.getFonts.data.length !== 0
        ) {
            if (nextProps.getFonts.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayFonts(nextProps.getFonts.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getFonts.data[0].nothingToDeclare,
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

    setArrayFonts = resFonts => {
        const FinalArray = []
        resFonts.forEach(font => {
            const objFont = _.omit(font, [
                'publierValeurDateAcquisation',
                'publierCodePostale',
                'publierGouvernorat',
                'publierAdresse',
                'publierType',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objFont
            Object.keys(objFont).forEach(key => {
                if (objFont[key] && typeof objFont[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayFonts: FinalArray })
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
        this.setState({ arrayFonts: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayFonts } = this.state
        if (Object.keys(arrayFonts[0]).length !== 0) {
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
        // const { getCodePostalByGovReq } = this.props
        const { arrayFonts } = this.state
        if (value === undefined && name === 'type')
            this.setState({ openModalType: true, addedFieldIdType: id })
        // if (name === 'gouvernorat') getCodePostalByGovReq(value)
        if (value === '') delete arrayFonts[id][name]
        else arrayFonts[id][name] = value
        this.setState({ arrayFonts }, () => {
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
     * @memberof Index
     */
    addFontFn = () => {
        const { arrayFonts } = this.state
        this.setState({
            arrayFonts: [...arrayFonts, {}],
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
                Object.keys(item).length === 6 ||
                (Object.keys(item).length === 8 &&
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
        const { arrayFonts } = this.state
        return arrayFonts
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayFonts, noDec, isExist } = this.state
        const { addFontsReq, updateFontsReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arrayFonts.map(font => {
            const fontSend = font
            fontSend.declaration = declaration
            fontSend.nothingToDeclare = noDec
            return fontSend
        })
        if (!isExist) addFontsReq(list)
        else updateFontsReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subFonts = () => {
        const { arrayFonts } = this.state
        this.setState({
            arrayFonts: arrayFonts.slice(0, arrayFonts.length - 1),
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
            openModalType: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayFonts } = this.state
        arrayFonts[id][name] = value
        this.closeModal()
    }

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
            // listCodePostalByGov,
            errorSaisie,
            arrayFonts,
            isExist,
            openModalType,
            addedFieldIdType,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'fontCommerce' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayFonts.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'fontCommerce',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'fontNum',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            payload={child}
                                            // listCodePostalByGov={
                                            //     listCodePostalByGov
                                            // }
                                            listDeclarant={listDeclarant}
                                            allReferenciels={allReferenciels}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `fondsCommerce_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `fondsCommerce_${index}`
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
                            openModal={openModalType}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefTypeFond',
                            }}
                            id={addedFieldIdType}
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
                                {arrayFonts.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subFonts}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addFontFn}
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
    // getCodePostalByGovReq: payload =>
    //     dispatch(getCodePostalByGovActions.getCodePostalByGovRequest(payload)),
    getFontsReq: id => dispatch(getFontsActions.getFontsRequest(id)),
    addFontsReq: payload => dispatch(addFontsActions.addFontsRequest(payload)),
    updateFontsReq: font =>
        dispatch(updateFontsActions.updateFontsRequest(font)),
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
    getFonts: state.declarationGrab.decBien.fonts.getFonts.response,
    listCodePostal: state.referencial.getCodePostalByGov.response,
    responseAdd: state.declarationGrab.decBien.fonts.addFonts.response,
    responseEdit: state.declarationGrab.decBien.fonts.updateFonts.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})

/**
 *  Inialisation
 */
Index.defaultProps = {
    getFonts: null,
    allReferenciels: {},
    listResponsableRevenus: null,
    // listCodePostal: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    // getCodePostalByGovReq: PropTypes.func.isRequired,
    getResponsableBienReq: PropTypes.func.isRequired,
    addFontsReq: PropTypes.func.isRequired,
    updateFontsReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getFontsReq: PropTypes.func.isRequired,
    getFonts: PropTypes.object,
    history: PropTypes.object.isRequired,
    /* getResponsableBienReq: PropTypes.func.isRequired, */
    allReferenciels: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
    lng: PropTypes.string.isRequired,
    // listCodePostal: PropTypes.array,
    stepDeclaration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
