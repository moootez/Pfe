import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Form from './Form'
import Check from '../../../../ui/checkBox'
import ItemTitle from '../../../../ui/itemCmp'
import ButtonComponent from '../../../../ui/button'
import ButtonPlus from '../../../../ui/buttonPlus/index'
// import getCodePostalByGovActions from '../../../../../redux/referencial/getCodePostalByGov'
import addLiberaleActions from '../../../../../redux/declaration_grab/interets/liberale/addLiberale/index'
import getLiberaleActions from '../../../../../redux/declaration_grab/interets/liberale/getLiberale/index'
import updateLiberaleActions from '../../../../../redux/declaration_grab/interets/liberale/updateLiberale/index'
import getAllCodePostalActions from '../../../../../redux/referencial/getAllCodePostal'
import SubTitle from '../../../../ui/subTitle/index'

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
            arrayLiberale: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
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
        const { getLiberaleReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getLiberaleReq(dataDeclaration.id)
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
            getLiberaleReq,
            responseAdd,
            responseEdit,
            getLiberale,
            stepDeclaration,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable revenus  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 1 &&
            nextProps.step === 3
        ) {
            getLiberaleReq(dataDeclaration.id)
        }
        if (
            nextProps.getLiberale !== getLiberale &&
            nextProps.getLiberale.data.length !== 0
        ) {
            if (nextProps.getLiberale.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayLiberale(nextProps.getLiberale.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getLiberale.data[0].nothingToDeclare,
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
        // /* code postale */
        // if (nextProps.listCodePostal && nextProps.listCodePostal.length > 0)
        //     this.setState({ listCodePostalByGov: nextProps.listCodePostal })
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
        this.setState({ arrayLiberale: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayLiberale } = this.state
        if (Object.keys(arrayLiberale[0]).length !== 0) {
            this.resetForm()
        } else {
            history.goBack()
        }
    }

    setArrayLiberale = resLiberale => {
        // const { getAllCodePostalReq } = this.props
        // getAllCodePostalReq()
        const FinalArray = []
        resLiberale.forEach(liberale => {
            const objLiberale = _.omit(liberale, [
                'publierDateFinFonction',
                'publierDatePriseFonction',
                'publierAdresse',
                'publierGouvernorat',
                'publierCodePostal',
                'publierMatriculeFiscale',
                'publierNature',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objLiberale
            Object.keys(objLiberale).forEach(key => {
                if (objLiberale[key] && typeof objLiberale[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayLiberale: FinalArray })
    }

    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value } }, id) => {
        // const { getCodePostalByGovReq } = this.props
        // if (name === 'gouvernorat') getCodePostalByGovReq(value)
        const { arrayLiberale } = this.state
        if (value === '') delete arrayLiberale[id][name]
        else arrayLiberale[id][name] = value
        this.setState({ arrayLiberale }, () => {
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
    addLiberaleFn = () => {
        const { arrayLiberale } = this.state
        this.setState({
            arrayLiberale: [...arrayLiberale, {}],
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
        const { arrayLiberale } = this.state
        return arrayLiberale
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayLiberale, noDec, isExist } = this.state
        const { addLiberaleReq, updateLiberaleReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id

        const list = arrayLiberale.map(liberale => {
            const Liberalesend = liberale
            Liberalesend.declaration = declaration
            Liberalesend.nothingToDeclare = noDec
            return Liberalesend
        })
        if (!isExist) addLiberaleReq(list)
        else updateLiberaleReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subPro = () => {
        const { arrayLiberale } = this.state
        this.setState({
            arrayLiberale: arrayLiberale.slice(0, arrayLiberale.length - 1),
            errorSaisie: false,
        })
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
            arrayLiberale,
            isExist,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle
                    label={intl.formatMessage({
                        id: 'professionLiberale',
                    })}
                />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayLiberale.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'professionLiberale',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'liberaleNum',
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
                                                    `profession_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `profession_${index}`
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
                                {arrayLiberale.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subPro}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addLiberaleFn}
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
    addLiberaleReq: liberale =>
        dispatch(addLiberaleActions.addLiberaleRequest(liberale)),
    getLiberaleReq: id => dispatch(getLiberaleActions.getLiberaleRequest(id)),
    updateLiberaleReq: liberale =>
        dispatch(updateLiberaleActions.updateLiberaleRequest(liberale)),
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
    listCodePostal: state.referencial.getCodePostalByGov.response,
    lng: state.info.language,
    step: state.stepSaisie.step,
    getLiberale: state.declarationGrab.interets.liberale.getLiberale.response,
    response: state.declarationGrab.interets.liberale.addLiberale.response,
    responseAdd: state.declarationGrab.interets.liberale.addLiberale.response,
    responseEdit:
        state.declarationGrab.interets.liberale.updateLiberale.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getLiberale: null,
    allReferenciels: {},
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    /* changeStep: PropTypes.func.isRequired, */
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // getCodePostalByGovReq: PropTypes.func.isRequired,
    updateLiberaleReq: PropTypes.func.isRequired,
    /* getAllCodePostalReq: PropTypes.func.isRequired, */
    addLiberaleReq: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    getLiberaleReq: PropTypes.func.isRequired,
    getLiberale: PropTypes.object,
    // listCodePostal: PropTypes.array.isRequired,
    /*  allCodePostal: PropTypes.object
         .isRequired, */
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
