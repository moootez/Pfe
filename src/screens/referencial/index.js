/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import getAllLivraisons from '../../redux/referencial/getAllReferencial'
import getCommandes from '../../redux/statistique/getStatistique'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'

const Index = props => {
    const {
        commandes,
        getCommande,
        userID,
        livraisons,
        getAllLivraison,
    } = props

    useEffect(() => {
        getAllLivraison({ user: userID })
    }, [])

    // Set livraison on state

    const [dataSubArray, setDataSubArray] = useState({
        apiCall: getCommande,
        dataApi: data => ({
            user: data.Client_commande,
            commande: data.No_livraison,
        }),
        dataReturned: commandes,
        dataId: 'No_livraison',
    })

    useEffect(() => {
        setDataSubArray({ ...dataSubArray, dataReturned: commandes })
    }, [commandes])

    return (
        <div className="column col-md-12">
            <Grid className="gridItem">
                <PageTitle label="Livraison" />
            </Grid>
            <Divider />
            <TableCollapse
                apiCall={getAllLivraison}
                dataApi={{ user: userID }}
                dataReturned={JSON.parse(JSON.stringify(livraisons))}
                dataSubArray={{ ...dataSubArray }}
            />
        </div>
    )
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
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ referencial, info, login, statistique }) => ({
    commandes: statistique.getStatistique.response,
    userID: login.response.User.details.codeInsc,
    livraisons: referencial.allReferencials.response,
    selectedRef: referencial.allReferencials.selectedRef,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    commandes: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    livraisons: PropTypes.array.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
