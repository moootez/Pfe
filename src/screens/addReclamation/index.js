/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import getAllLivraisons from '../../redux/referencial/getAllReferencial'
import addReclamationActions from '../../redux/reclamation/newReclamation'
import PageTitle from '../../components/ui/pageTitle'
import Button from '../../components/ui/button'

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

    const changeHandler = e => {
        setReclamation(e)
    }
    return (
        <div className="column col-md-12">
            <Grid className="gridItem">
                <PageTitle label="Ajouter une reclamation" />
            </Grid>
            <Divider />
            <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                value={(reclamation || {}).livraison}
                onChange={changeHandler}
                input={<Input />}
            >
                {(livraisons || []).map(element => (
                    <MenuItem
                        key={element.No_livraison}
                        value={element.No_livraison}
                    >
                        {element.No_livraison}
                    </MenuItem>
                ))}
            </Select>
            <Button clicked={submitReclamation} label="Envoyer" />
        </div>
    )
}

Index.propTypes = {
    addReclamation: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
    livraisons: PropTypes.array.isRequired,
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
