import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getActConjointActions from '../../../../../redux/declaration_grab/interets/actConjoint/getActConjoint/index'
import addActConjointActions from '../../../../../redux/declaration_grab/interets/actConjoint/addActConjoint/index'
import updateActConjointActions from '../../../../../redux/declaration_grab/interets/actConjoint/updateActConjoint/index'
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
            arrayActConjoint: [{}],
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
        const { history, getActConjointReq } = this.props
        const { dataDeclaration } = history.location.state
        getActConjointReq(dataDeclaration.id)
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
            getActConjointReq,
            responseAdd,
            responseEdit,
            getActConjoint,
            stepDeclaration,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable revenus  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 3 &&
            nextProps.step === 3
        ) {
            getActConjointReq(dataDeclaration.id)
        }
        if (
            nextProps.getActConjoint !== getActConjoint &&
            nextProps.getActConjoint.data.length !== 0
        ) {
            if (nextProps.getActConjoint.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayActConjoint(nextProps.getActConjoint.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getActConjoint.data[0].nothingToDeclare,
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

    setArrayActConjoint = resActConjoint => {
        const FinalArray = []
        resActConjoint.forEach(actConjoint => {
            const objActConjoint = _.omit(actConjoint, [
                'publierDatePriseFonction',
                'publierDateFinFonction',
                'publierPoste',
                'publierSecteurActivite',
                'publierSociete',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objActConjoint
            Object.keys(objActConjoint).forEach(key => {
                if (
                    objActConjoint[key] &&
                    typeof objActConjoint[key] === 'object'
                ) {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayActConjoint: FinalArray })
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
        this.setState({ arrayActConjoint: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayActConjoint } = this.state
        if (Object.keys(arrayActConjoint[0]).length !== 0) {
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
        const { arrayActConjoint } = this.state
        if (value === '') delete arrayActConjoint[id][name]
        else arrayActConjoint[id][name] = value
        this.setState({ arrayActConjoint }, () => {
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
    addActConjointFn = () => {
        const { arrayActConjoint } = this.state
        this.setState({
            arrayActConjoint: [...arrayActConjoint, {}],
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
        const { arrayActConjoint } = this.state
        return arrayActConjoint
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayActConjoint, noDec, isExist } = this.state
        const { addActConjointReq, updateActConjointReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arrayActConjoint.map(actConjoint => {
            const actConjointSend = actConjoint
            actConjointSend.declaration = declaration
            actConjointSend.nothingToDeclare = noDec
            return actConjointSend
        })
        if (!isExist) addActConjointReq(list)
        else updateActConjointReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subActConjoints = () => {
        const { arrayActConjoint } = this.state
        this.setState({
            arrayActConjoint: arrayActConjoint.slice(
                0,
                arrayActConjoint.length - 1
            ),
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
            arrayActConjoint,
            isExist,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle
                    label={intl.formatMessage({
                        id: 'acivitéProfessionnelConjoint',
                    })}
                />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayActConjoint.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'acivitéProfessionnelConjoint',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'actCnjNum',
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
                                                    `activiteproconjoint_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `activiteproconjoint_${index}`
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
                                {arrayActConjoint.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subActConjoints}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addActConjointFn}
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
    getActConjointReq: id =>
        dispatch(getActConjointActions.getActConjointRequest(id)),
    addActConjointReq: payload =>
        dispatch(addActConjointActions.addActConjointRequest(payload)),
    updateActConjointReq: actCnj =>
        dispatch(updateActConjointActions.updateActConjointRequest(actCnj)),
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
    getActConjoint:
        state.declarationGrab.interets.actConjoint.getActConjoint.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
    responseAdd:
        state.declarationGrab.interets.actConjoint.addActConjoint.response,
    responseEdit:
        state.declarationGrab.interets.actConjoint.updateActConjoint.response,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getActConjoint: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    addActConjointReq: PropTypes.func.isRequired,
    updateActConjointReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getActConjointReq: PropTypes.func.isRequired,
    getActConjoint: PropTypes.object,
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
