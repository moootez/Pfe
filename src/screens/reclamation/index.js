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
// import { Swiper, SwiperSlide } from 'swiper/react'
import getAllCommandes from '../../redux/declarantInterne/getDeclarantAvis'
import getReclamationLignes from '../../redux/reclamation/getReclamationLigne'
import 'swiper/swiper.scss'
// import 'swiper/components/navigation/navigation.scss'
import getAllReclamations from '../../redux/reclamation/getReclamation'

SwiperCore.use([Navigation, Autoplay])

const Index = props => {
    const {
        reclamationDetails,
        getReclamationLigne,
        userID,
        commandes,
        getAllCommande,
        reclamations,
        getAllReclamation,
    } = props

    useEffect(() => {
        // getAllCommande({ user: userID, dateDebut: null, dateFin: null })
        getAllReclamation({ user: userID })
    }, [])

    // Set livraison on state

    const [dataSubArray, setDataSubArray] = useState({
        apiCall: getReclamationLigne,
        dataApi: data => ({
            id: data.id,
        }),
        dataId: 'No-reclamation',
        dataReturned: reclamationDetails,
    })

    useEffect(() => {
        setDataSubArray({ ...dataSubArray, dataReturned: reclamationDetails })
    }, [reclamationDetails])

    const header = [
        {
            field: 'id',
            title: 'ID',
        },
        {
            field: 'createdAt',
            title: 'Date Création',
        },
        {
            field: 'client.codeInsc',
            title: 'Client',
        },
        {
            field: 'status',
            title: 'Status',
        },
    ]

    return (
        <Fragment>
            <div className="column col-md-12 style-table">
                {/* <Grid className="gridItem"> 
                <PageTitle label="Mes commandes" />
            </Grid> */}
                <Divider />
                <TableCollapse
                    title="Mes réclamations"
                    apiCall={getAllReclamation}
                    dataApi={{ user: userID }}
                    dataReturned={JSON.parse(JSON.stringify(reclamations))}
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
    getReclamationLigne: data =>
        dispatch(getReclamationLignes.getReclamationLigneRequest(data)),
    getAllReclamation: userID =>
        dispatch(getAllReclamations.getReclamationRequest(userID)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, declarantInterne, reclamation }) => ({
    reclamationDetails: reclamation.getReclamationLigne.response,
    userID: login.response.User.details.codeInsc,
    commandes: declarantInterne.getDeclarantAvis.response,
    lng: info.language,
    reclamations: reclamation.getReclamation.response,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    reclamationDetails: PropTypes.array.isRequired,
    getReclamationLigne: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    commandes: PropTypes.array.isRequired,
    getAllCommande: PropTypes.func.isRequired,
    getAllReclamation: PropTypes.func.isRequired,
    reclamations: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
