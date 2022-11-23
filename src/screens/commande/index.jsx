/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Divider } from '@material-ui/core'
import TableCollapse from '../../components/tableWithCollapse'
import SwiperCore, { Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import getAllCommandes from '../../redux/declarantInterne/getDeclarantAvis'
import getCommandes from '../../redux/declarantInterne/getDeclarantById'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import Actualite from '../pageCms/actualite'

SwiperCore.use([Navigation, Autoplay])

const Index = props => {
    const {
        commandeDetails,
        getCommande,
        userID,
        commandes,
        getAllCommande,
    } = props

    useEffect(() => {
        // getAllCommande({ user: userID, dateDebut: null, dateFin: null })
        getAllCommande({
            user: userID,
            dateFin: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate(),
            dateDebut: (new Date().getFullYear() - 1) + '-' + new Date().getMonth() + '-' + new Date().getDate()
        })

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

    const [data, setData] = useState({})
    useEffect(() => {
        setData(dataSubArray)
    })

    const header = [
        {
            field: "No_commande",
            title: "No commande"
        },
        {
            field: "Code_client",
            title: "Code client"
        },
        {
            field: "Date_commande",
            title: "Date commande"
        },
        {
            field: "Etat_commande",
            title: "Etat commande"
        },
        {
            field: "Livraison",
            title: "Livraison"
        },
        {
            field: "Facture",
            title: "Facture"
        },
        {
            field: "Montant_HT_TND",
            title: "Montant HT TND"
        }
    ]

    return (
        <Fragment>
            <Actualite />
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
                    headerTable={header}
                    userID={userID}
                />
            </div>
        </Fragment>
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
