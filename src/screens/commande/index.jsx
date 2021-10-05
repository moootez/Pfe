/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import getAllCommandes from '../../redux/declarantInterne/getDeclarantAvis'
import getCommandes from '../../redux/declarantInterne/getDeclarantById'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'

const Index = props => {
    const {
        commandeDetails,
        getCommande,
        userID,
        commandes,
        getAllCommande,
    } = props

    useEffect(() => {
        getAllCommande({ user: userID })
    }, [])

    // Set livraison on state

    const [dataSubArray, setDataSubArray] = useState({
        apiCall: getCommande,
        dataApi: data => ({
            user: data.Code_client,
            commande: data.No_commande,
        }),
        dataId: 'No-commande',
        dataReturned: commandeDetails,
    })

    useEffect(() => {
        setDataSubArray({ ...dataSubArray, dataReturned: commandeDetails })
    }, [commandeDetails])

    return (
        <div className="column col-md-12 style-table">
            {/* <Grid className="gridItem">
                <PageTitle label="Mes commandes" />
            </Grid> */}
            <Divider />
            <TableCollapse
                title="Mes commandes"
                apiCall={getAllCommande}
                dataApi={{ user: userID }}
                dataReturned={JSON.parse(JSON.stringify(commandes))}
                dataSubArray={dataSubArray}
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
    getAllCommande: userID =>
        dispatch(getAllCommandes.getDeclarantAvisRequest(userID)),
    getCommande: data =>
        dispatch(getCommandes.getDeclarantInterneRequest(data)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, declarantInterne }) => ({
    commandeDetails: declarantInterne.getDeclarantInterne.response,
    userID: login.response.User.details.codeInsc,
    commandes: declarantInterne.getDeclarantAvis.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    commandeDetails: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    commandes: PropTypes.array.isRequired,
    getAllCommande: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
