/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import getAllReclamations from '../../redux/reclamation/getReclamation'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'

const Index = props => {
    const { userID, reclamations, getAllReclamation } = props

    useEffect(() => {
        getAllReclamation({ user: userID })
    }, [])

    // Set livraison on state

    return (
        <div className="column col-md-12">
            <Grid className="gridItem">
                <PageTitle label="Mes réclamations" />
            </Grid>
            <Divider />
            <TableCollapse
                apiCall={getAllReclamation}
                dataApi={{ user: userID }}
                dataReturned={JSON.parse(
                    JSON.stringify(
                        (reclamations || []).map(el => ({
                            ...el,
                            client: el.client.codeInsc,
                        }))
                    )
                )}
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
const mapStateToProps = ({ info, login, reclamation }) => ({
    userID: login.response.User.details.codeInsc,
    reclamations: reclamation.getReclamation.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    userID: PropTypes.object.isRequired,
    reclamations: PropTypes.array.isRequired,
    getAllReclamation: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
