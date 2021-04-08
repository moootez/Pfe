/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
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

    useEffect(() => {
        getAllLivraison({ user: userID })
    }, [])

    useEffect(() => {
        if (reclamation.livraison)
            getCommande({ user: userID, commande: reclamation.livraison })
    }, [reclamation.livraison])

    useEffect(() => {
        if (newReclamation.loading === true)
            setTimeout(() => history.push('/mes-reclamation'), 1000)
    }, [newReclamation.loading])

    const submitReclamation = () => {
        const newPayload = {
            client: userID,
            dateLivraison: new Date(Date.now()),
            codeLivraison: reclamation.livraison,
            codeArticle: reclamation.produit,
            quantite: reclamation.qte,
            nature: reclamation.nature,
            gravite: reclamation.gravite,
            status: null,
        }
        addReclamation(newPayload)
    }

    const changeHandler = (name, e) => {
        const { value } = e.target
        setReclamation(r => ({ ...r, [name]: value }))
    }

    console.log(livraisons)
    return (
        <div className="column col-md-12 text-center">
            <Grid className="gridItem">
                <PageTitle label="Ajouter une réclamation" />
            </Grid>
            <Divider />
            <div className="row mt-3 mb-3">
                <div className="d-flex col-6">
                    <div className="col-6 mt-3">Code livraison</div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <InputLabel id="select-livraison">
                                Code livraison
                            </InputLabel>
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-livraison"
                                value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('livraison', e)}
                                input={<Input />}
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
                        </FormControl>
                    </div>
                </div>
                {/* Numero du produit */}
                <div className="col-6 d-flex">
                    <div className="col-6 mt-3">Code produit</div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <InputLabel id="select-produit">
                                Code produit
                            </InputLabel>
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-produit"
                                value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('produit', e)}
                                input={<Input />}
                            >
                                {(commandes || []).map(element => (
                                    <MenuItem
                                        key={element.Code_article}
                                        value={element.Code_article}
                                    >
                                        {element.Code_article}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* Quantite reclame */}
                <div className="col-6 d-flex">
                    <div className="col-6 mt-3">Quantité réclamée</div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="number"
                                className="d-flex border mt-3"
                                onChange={e => changeHandler('qte', e)}
                                label="Quantité réclamée"
                            />
                        </FormControl>
                    </div>
                </div>
                {/* Nature reclamation */}
                {reclamation.nature !== 'Autres' ? (
                    <div className="col-6 d-flex">
                        <div className="col-6 mt-3">Nature réclamation</div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                <InputLabel id="select-nature">
                                    Nature réclamation
                                </InputLabel>
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
                    <div className="col-6 d-flex">
                        <div className="col-6 mt-3">
                            Préciser votre situation
                        </div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="d-flex border mt-3"
                                    onChange={e => changeHandler('qte', e)}
                                    label="Préciser votre situation"
                                />
                            </FormControl>
                        </div>
                    </div>
                )}
                {/* Gravite du reclamation */}
                <div className="col-6 d-flex">
                    <div className="col-6 mt-3">Gravité réclamation</div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <InputLabel id="select-gravite">
                                Gravité réclamation
                            </InputLabel>
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
