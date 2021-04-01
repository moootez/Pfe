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
    'Antres',
]

const graviteReclamation = ['Mineur', 'Majeur', 'Critique']

const Index = props => {
    const { addReclamation, userID, getAllLivraison, livraisons } = props

    const [reclamation, setReclamation] = useState(null)

    useEffect(() => {
        getAllLivraison({ user: userID })
    }, [])

    console.log(addReclamation, livraisons)

    const submitReclamation = () => {
        addReclamation(reclamation)
    }

    const changeHandler = (name, e) => {
        const { value } = e.target
        setReclamation(r => ({ ...r, [name]: value }))
    }
    return (
        <div className="column col-md-12 text-center">
            <Grid className="gridItem">
                <PageTitle label="Ajouter une reclamation" />
            </Grid>
            <Divider />
            <div className="row mt-3 mb-3">
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
                            {(
                                livraisons.length || [
                                    { No_livraison: '1223' },
                                    { No_livraison: '1323' },
                                    { No_livraison: '1243' },
                                ]
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
                {/* Numero du produit */}
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
                            {(
                                livraisons.length || [
                                    { No_livraison: '1223' },
                                    { No_livraison: '1323' },
                                    { No_livraison: '1243' },
                                ]
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
                {/* Quantite reclame */}
                <div className="col-6">
                    <FormControl className="w-100">
                        <TextField
                            type="number"
                            className="border mt-3"
                            onChange={e => changeHandler('qte', e)}
                            label="Quantité réclamée"
                        />
                    </FormControl>
                </div>
                {/* Nature reclamation */}
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
                {/* Gravite du reclamation */}
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

            <Button clicked={submitReclamation} label="Envoyer" />
        </div>
    )
}

Index.propTypes = {
    addReclamation: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
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
const mapStateToProps = ({ info, login, referencial }) => ({
    userID: login.response.User.details.codeInsc,
    livraisons: referencial.allReferencials.response,
    lng: info.language,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
