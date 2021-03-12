import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getSalarieActions from '../../../../../redux/declaration_grab/interets/salarie/getSalarie/index'
import addSalarieActions from '../../../../../redux/declaration_grab/interets/salarie/addSalarie/index'
import updateSalarieActions from '../../../../../redux/declaration_grab/interets/salarie/updateSalarie/index'
import SubTitle from '../../../../ui/subTitle/index'
import ButtonPlus from '../../../../ui/buttonPlus/index'
import ItemTitle from '../../../../ui/itemCmp'

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
            arraySalarie: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
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
        const { history, getSalarieReq } = this.props
        const { dataDeclaration } = history.location.state
        getSalarieReq(dataDeclaration.id)
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
            getSalarieReq,
            responseAdd,
            responseEdit,
            getSalarie,
            stepDeclaration,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable revenus  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 2 &&
            nextProps.step === 3
        ) {
            getSalarieReq(dataDeclaration.id)
        }
        if (
            nextProps.getSalarie !== getSalarie &&
            nextProps.getSalarie.data.length !== 0
        ) {
            if (nextProps.getSalarie.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArraySalarie(nextProps.getSalarie.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getSalarie.data[0].nothingToDeclare,
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

    setArraySalarie = resSalarie => {
        const FinalArray = []
        resSalarie.forEach(salarie => {
            const objSalarie = _.omit(salarie, [
                'publierDateFinFonction',
                'publierdatePriseFonction',
                'publierPoste',
                'publierSecteurActivite',
                'publierSociete',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objSalarie
            Object.keys(objSalarie).forEach(key => {
                if (objSalarie[key] && typeof objSalarie[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arraySalarie: FinalArray })
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
        this.setState({ arraySalarie: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arraySalarie } = this.state
        if (Object.keys(arraySalarie[0]).length !== 0) {
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
        const { arraySalarie } = this.state
        if (value === '') delete arraySalarie[id][name]
        else arraySalarie[id][name] = value
        this.setState({ arraySalarie }, () => {
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
    addSalarieFn = () => {
        const { arraySalarie } = this.state
        this.setState({
            arraySalarie: [...arraySalarie, {}],
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
                Object.keys(item).length === 5 ||
                (Object.keys(item).length === 7 &&
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
        const { arraySalarie } = this.state
        return arraySalarie
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arraySalarie, noDec, isExist } = this.state
        const { addSalarieReq, updateSalarieReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arraySalarie.map(salarie => {
            const salarieSend = salarie
            salarieSend.declaration = declaration
            salarieSend.nothingToDeclare = noDec
            return salarieSend
        })
        if (!isExist) addSalarieReq(list)
        else updateSalarieReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subSalarie = () => {
        const { arraySalarie } = this.state
        this.setState({
            arraySalarie: arraySalarie.slice(0, arraySalarie.length - 1),
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
        const { intl, lng } = this.props
        const {
            noDec,
            errorsList,
            isError,
            errorSaisie,
            arraySalarie,
            isExist,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle
                    label={intl.formatMessage({
                        id: 'salarie',
                    })}
                />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arraySalarie.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'salarie',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`${intl.formatMessage({
                                                    id: 'salarieNum',
                                                })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            payload={child}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `salarie_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `salarie_${index}`
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
                                {arraySalarie.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subSalarie}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addSalarieFn}
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
    getSalarieReq: id => dispatch(getSalarieActions.getSalarieRequest(id)),
    addSalarieReq: payload =>
        dispatch(addSalarieActions.addSalarieRequest(payload)),
    updateSalarieReq: salarie =>
        dispatch(updateSalarieActions.updateSalarieRequest(salarie)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    lng: state.info.language,
    step: state.stepSaisie.step,
    getSalarie: state.declarationGrab.interets.salarie.getSalarie.response,
    responseAdd: state.declarationGrab.interets.salarie.addSalarie.response,
    responseEdit: state.declarationGrab.interets.salarie.updateSalarie.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getSalarie: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    addSalarieReq: PropTypes.func.isRequired,
    updateSalarieReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getSalarieReq: PropTypes.func.isRequired,
    getSalarie: PropTypes.object,
    history: PropTypes.object.isRequired,
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
