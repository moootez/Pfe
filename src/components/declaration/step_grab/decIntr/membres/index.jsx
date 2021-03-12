import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getMembresActions from '../../../../../redux/declaration_grab/interets/membres/getMembres/index'
import addMembresActions from '../../../../../redux/declaration_grab/interets/membres/addMembres/index'
import updateMembresActions from '../../../../../redux/declaration_grab/interets/membres/updateMembres/index'
import getResponsableBienActions from '../../../../../redux/declaration_grab/bien/revenus/getResponsableRevenu'
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
            arrayMembres: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            listDeclarant: [],
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
        const { history, getMembresReq, getResponsableBienReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getMembresReq(dataDeclaration.id)
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
            getMembresReq,
            responseAdd,
            responseEdit,
            getMembres,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable revenus  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 4 &&
            nextProps.step === 3
        ) {
            getMembresReq(dataDeclaration.id)
        }
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
            nextProps.getMembres !== getMembres &&
            nextProps.getMembres.data.length !== 0
        ) {
            if (nextProps.getMembres.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayMembres(nextProps.getMembres.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getMembres.data[0].nothingToDeclare,
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

    setArrayMembres = resMembres => {
        const FinalArray = []
        resMembres.forEach(membre => {
            const objMembres = _.omit(membre, [
                'publierPoste',
                'publierAnnee',
                'publierDomaine',
                'publierOrgane',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objMembres
            Object.keys(objMembres).forEach(key => {
                if (objMembres[key] && typeof objMembres[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayMembres: FinalArray })
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
        this.setState({ arrayMembres: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayMembres } = this.state
        if (Object.keys(arrayMembres[0]).length !== 0) {
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
        const { arrayMembres, errorsList } = this.state
        if (name === 'annee') {
            const valueChanged = value.toString()
            if (valueChanged.length !== 4)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        annee: { ar: 'الرجاء إدخال 4 أرقام' },
                    },
                })
            else
                this.setState({
                    isError: false,
                    errorsList: delete errorsList.annee,
                })
        }
        if (value === '') delete arrayMembres[id][name]
        else arrayMembres[id][name] = value
        this.setState({ arrayMembres }, () => {
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
    addMembresFn = () => {
        const { arrayMembres } = this.state
        this.setState({
            arrayMembres: [...arrayMembres, {}],
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
        const { arrayMembres } = this.state
        return arrayMembres
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayMembres, noDec, isExist } = this.state
        const { addMembresReq, updateMembresReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id

        const list = arrayMembres.map(member => {
            const membresSend = member
            membresSend.declaration = declaration
            membresSend.nothingToDeclare = noDec
            return membresSend
        })
        if (!isExist) addMembresReq(list)
        else updateMembresReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subMembres = () => {
        const { arrayMembres } = this.state
        this.setState({
            arrayMembres: arrayMembres.slice(0, arrayMembres.length - 1),
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
            arrayMembres,
            listDeclarant,
            isExist,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle
                    label={intl.formatMessage({
                        id: 'membres',
                    })}
                />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayMembres.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'membres',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'MembreNum',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            listDeclarant={listDeclarant}
                                            payload={child}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `member_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `member_${index}`
                                                      ]
                                                    : errorsList
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
                                {arrayMembres.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subMembres}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addMembresFn}
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
    getMembresReq: id => dispatch(getMembresActions.getMembresRequest(id)),
    addMembresReq: payload =>
        dispatch(addMembresActions.addMembresRequest(payload)),
    updateMembresReq: cadeau =>
        dispatch(updateMembresActions.updateMembresRequest(cadeau)),
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
    listResponsableRevenus:
        state.declarationGrab.getResponsableRevenus.response,
    getMembres: state.declarationGrab.interets.membres.getMembres.response,
    responseAdd: state.declarationGrab.interets.membres.addMembres.response,
    responseEdit: state.declarationGrab.interets.membres.updateMembres.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getMembres: null,
    listResponsableRevenus: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getResponsableBienReq: PropTypes.func.isRequired,
    addMembresReq: PropTypes.func.isRequired,
    updateMembresReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getMembresReq: PropTypes.func.isRequired,
    getMembres: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
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
