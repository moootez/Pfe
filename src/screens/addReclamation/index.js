/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import Select from '@material-ui/core/Select'
// import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import PropTypes from 'prop-types'
import getCommandes from '../../redux/statistique/getStatistique'
import getAllLivraisons from '../../redux/referencial/getAllReferencial'
import addReclamationActions from '../../redux/reclamation/newReclamation'
import PageTitle from '../../components/ui/pageTitle'
import Button from '../../components/ui/button'
import alertActions from '../../redux/alert'

const natureReclamation = [
    'Périmé',
    'Abimé',
    'Étui cabossé',
    'Date proche',
    'Étanchéité',
    'Autres',
]

const graviteReclamation = ['Mineur', 'Majeur', 'Critique']

const Index = props => {
    const {
        alertShow,
        addReclamation,
        userID,
        getAllLivraison,
        livraisons,
        commandes,
        getCommande,
        newReclamation,
        history,
    } = props

    const [reclamation, setReclamation] = useState({})
    const [errorsList, setErrorsList] = useState({})
    const [isError, setIsError] = useState(false)
    const fileteredCommandes = []

    useEffect(() => {
        getAllLivraison({ user: userID })
    }, [])

    useEffect(() => {
        if (reclamation.livraison)
            getCommande({ user: userID, commande: reclamation.livraison })
    }, [reclamation.livraison])

    let errorredirect = null

    useEffect(() => {
        if (props.newReclamation.error === true) {
            errorredirect = false
            try {
                Object.keys(props.newReclamation.response.data.data).forEach(
                    key => {
                        const item =
                            props.newReclamation.response.data.data[key]
                        if (item) {
                            const errorText = item.fr
                            errorsList[key] = errorText
                        }
                    }
                )
            } catch (e) {
                console.log(e)
            }
            setIsError(true)
            setErrorsList(errorsList)
        } else if (errorredirect) {
            // if (errorredirect === false) {
            setTimeout(() => history.push('/mes-reclamation'), 1000)
            //  }
            errorredirect = true
        }

        console.log('errorredirect', errorredirect)
    }, [newReclamation.loading])

    // useEffect(() => {
    //     if (newReclamation.loading === true)
    //         setTimeout(() => history.push('/mes-reclamation'), 1000)
    // }, [newReclamation.loading])

    const submitReclamation = () => {
        const newPayload = {
            client: userID,
            dateLivraison: new Date(Date.now()),
            codeLivraison: reclamation.livraison,
            codeArticle: reclamation.produit,
            quantite: reclamation.qte,
            nature: reclamation.nature,
            natureAutre: reclamation.natureAutre,
            gravite: reclamation.gravite,
            status: null,
            numLot: reclamation.numLot,
        }
        if (newPayload.quantite <= 0) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'Quantité négative ',
            })
        } else addReclamation(newPayload)
    }

    const changeHandler = (name, e) => {
        const { value } = e.target
        setReclamation(r => ({ ...r, [name]: value }))
    }

    // const [numberPos, setnumberPos] = useState('')
    // const [disabled, setDisabled] = useState(true)
    // const checkNumberPos = (e) => {
    //     setnumberPos(e.target.value)
    //     if (e.target.value >= 0) {
    //         setDisabled(false)
    //     } else {
    //         setDisabled(true)
    //     }
    // }

    console.log(livraisons)
    return (
        <div className="column col-md-12 text-center style-table form-reclam">
            <Grid className="gridItem">
                <PageTitle label="Déposer une réclamation" />
            </Grid>
            <Divider />
            <div className="row mt-3 mb-3">
                <div className="d-flex col-6 row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Code livraison{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-livraison">
                                Code livraison
                            </InputLabel> */}
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-livraison"
                                value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('livraison', e)}
                                input={<Input />}
                                required
                            >
                                {(livraisons instanceof Array
                                    ? livraisons
                                    : []
                                ).map(element => (
                                    <MenuItem
                                        key={element.No_livraison}
                                        value={element.No_livraison}
                                    >
                                        {element.No_livraison}
                                    </MenuItem>
                                ))}
                            </Select>
                            {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList.codeLivraison}
                                </span>
                            )}
                        </FormControl>
                    </div>
                </div>
                {/* Numero du produit */}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Code produit{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-produit">
                                Code produit
                            </InputLabel> */}
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-produit"
                                value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('produit', e)}
                                input={<Input />}
                            >
                                {(commandes || []).forEach(commande => {
                                    if (
                                        fileteredCommandes.indexOf(
                                            commande.Code_article
                                        ) === -1
                                    ) {
                                        fileteredCommandes.push(
                                            commande.Code_article
                                        )
                                    }
                                })}
                                {(fileteredCommandes || []).map(element => {
                                    return (
                                        <MenuItem key={element} value={element}>
                                            {element}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* Numero de lot */}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">Numéro de lot</p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-lot"
                                value={(reclamation || {}).produit}
                                onChange={e => changeHandler('Lot', e)}
                                input={<Input />}
                                required
                            >
                                {console.log(
                                    reclamation,
                                    fileteredCommandes,
                                    'reclamations'
                                )}
                                {(commandes instanceof Array
                                    ? commandes
                                    : []
                                ).map(element => {
                                    return (
                                        element.Code_article ===
                                            reclamation.produit && (
                                            <MenuItem
                                                key={element.Lot}
                                                value={element.Lot}
                                            >
                                                {element.Lot}
                                            </MenuItem>
                                        )
                                    )
                                })}
                            </Select>
                            {/*  <TextField
                                // error="tttt"
                                // helperText="frrr"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="text"
                                className="d-flex border"
                                onChange={e => changeHandler('numLot', e)}
                            />  */}
                        </FormControl>
                    </div>
                </div>
                {/* Quantite reclame */}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">Quantité réclamée</p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <TextField
                                inputProps={{ min: 1 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="number"
                                className="d-flex border "
                                onChange={e => changeHandler('qte', e)}
                                name="qte_rec"
                            />
                        </FormControl>
                    </div>
                </div>
                {/* Nature reclamation */}
                {reclamation.nature !== 'Autres' ? (
                    <div className="col-6 d-flex row-form-reclam">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                Nature réclamation{' '}
                                <span className="text-danger"> * </span>
                            </p>
                        </div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                {/* <InputLabel id="select-nature">
                                    Nature réclamation
                                </InputLabel> */}
                                <Select
                                    className="border"
                                    id="demo-mutiple-name"
                                    labelId="select-nature"
                                    value={(reclamation || {}).livraison}
                                    onChange={e => changeHandler('nature', e)}
                                    input={<Input />}
                                >
                                    {natureReclamation.map(element => (
                                        <MenuItem key={element} value={element}>
                                            {element}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                ) : (
                    <div className="col-6 d-flex row-form-reclam">
                        <div className="col-6 mt-3">
                            <p className="txt_form">Préciser votre situation</p>
                        </div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="d-flex border"
                                    onChange={e =>
                                        changeHandler('natureAutre', e)
                                    }
                                    label="Préciser votre situation"
                                />
                            </FormControl>
                        </div>
                    </div>
                )}
                {/* Gravite du reclamation */}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Gravité réclamation{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-gravite">
                                Gravité réclamation
                            </InputLabel> */}
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-gravite"
                                value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('gravite', e)}
                                input={<Input />}
                            >
                                {graviteReclamation.map(element => (
                                    <MenuItem key={element} value={element}>
                                        {element}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>

            <Button clicked={submitReclamation} label="Envoyer" />
        </div>
    )
}

Index.propTypes = {
    newReclamation: PropTypes.object.isRequired,
    addReclamation: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
    commandes: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    livraisons: PropTypes.array,
    alertShow: PropTypes.func.isRequired,
}

Index.defaultProps = {
    livraisons: [],
}
/* redux */

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getAllLivraison: userID =>
        dispatch(getAllLivraisons.getAllReferenceRequest(userID)),
    getCommande: data => dispatch(getCommandes.getStatistiqueRequest(data)),
    addReclamation: payload =>
        dispatch(addReclamationActions.addNewReclamationRequest(payload)),
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
const mapStateToProps = ({
    info,
    login,
    referencial,
    statistique,
    reclamation,
}) => ({
    userID: login.response.User.details.codeInsc,
    livraisons: referencial.allReferencials.response,
    commandes: statistique.getStatistique.response,
    newReclamation: reclamation.newReclamation,
    lng: info.language,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
