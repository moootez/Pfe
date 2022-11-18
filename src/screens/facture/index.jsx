/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import getAllFactures from '../../redux/declarantInterne/getDeclarantInterne'
import getFactures from '../../redux/declarantInterne/getDeclarantSanction'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'

const Index = props => {
    const {
        factureDetails,
        getFacture,
        userID,
        factures,
        getAllFacture,
    } = props

    useEffect(() => {
        getAllFacture({ user: userID })
    }, [])

    // Set livraison on state

    const [dataSubArray, setDataSubArray] = useState({
        apiCall: getFacture,
        dataApi: data => ({
            facture: data.No_facture,
        }),
        dataId: 'No_facture',
        dataReturned: factureDetails,
    })

    useEffect(() => {
        setDataSubArray({ ...dataSubArray, dataReturned: factureDetails })
    }, [factureDetails])

    const [data, setData] = useState({})
    useEffect(() => {
        setData(dataSubArray)
    })
    const header = [
        {
            field: "No_facture",
            title: "No facture"
        },
        {
            field: "Date",
            title: "Date"
        },
        {
            field: "Montant_HT_TND",
            title: "Montant HT TND"
        },
        {
            field: "Montant_TTC_TND",
            title: "Montant TTC TND"
        }
    ]

    return (
        <div className="column col-md-12 style-table">
            {/* <Grid className="gridItem">
                <PageTitle label="Factures" />
            </Grid> */}
            <Divider />
            <TableCollapse
                title="Factures"
                apiCall={getAllFacture}
                dataApi={{ user: userID }}
                dataReturned={JSON.parse(JSON.stringify(factures))}
                dataSubArray={dataSubArray}
                headerTable={header}
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
    getAllFacture: userID =>
        dispatch(getAllFactures.getFilterDeclarantInterneRequest(userID)),
    getFacture: data => dispatch(getFactures.getDeclarantSanctionRequest(data)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, declarantInterne }) => ({
    factureDetails: declarantInterne.getDeclarantSanction.response,
    userID: login.response.User.details.codeInsc,
    factures: declarantInterne.getFiltredDeclarantInterne.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    factureDetails: PropTypes.array.isRequired,
    getFacture: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    factures: PropTypes.array.isRequired,
    getAllFacture: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
