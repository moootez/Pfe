/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import getAllReglements from '../../redux/declarantInterne/getSanctionById'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'

const Index = props => {
    const { userID, reglements, getAllReglement } = props

    useEffect(() => {
        getAllReglement({ user: userID })
    }, [])

    // Set livraison on state

    return (
        <div className="column col-md-12 style-table">
            <Divider />
            <TableCollapse
                title="Réglements"
                apiCall={getAllReglement}
                dataApi={{ user: userID }}
                dataReturned={JSON.parse(JSON.stringify(reglements))}
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
    getAllReglement: userID =>
        dispatch(getAllReglements.getSanctionRequest(userID)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, declarantInterne }) => ({
    userID: login.response.User.details.codeInsc,
    reglements: declarantInterne.getSanction.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    userID: PropTypes.object.isRequired,
    reglements: PropTypes.array.isRequired,
    getAllReglement: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
