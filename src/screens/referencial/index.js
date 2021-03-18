/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Divider,
} from '@material-ui/core'
import getAllLivraisons from '../../redux/referencial/getAllReferencial'
import getCommandes from '../../redux/statistique/getStatistique'
import generateKey, { removeBottomDash } from '../../shared/utility'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'

/**
 * style cellule du table
 */
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#c7c7c7',
        fontWeight: 'bold',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)
/**
 * style row table
 */
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow)

/**
 * style css
 *
 * @param {*} theme
 */
const styles = theme => ({
    root: {
        boxShadow: 'none',
        width: '100%',
        margin: 'auto',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        backgroundColor: '#e6e6e6',
        marginBottom: '20px',
        overflowY: 'auto',
    },
    headTable: {
        fontSize: '15px',
        textAlign: 'center',
    },
    fab: {
        textAlign: 'center',
        margin: theme.spacing(1),
    },
    row: {
        textAlign: 'center',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    button: {
        margin: theme.spacing(1),
    },
})

const Index = props => {
    const {
        commandes,
        getCommande,
        userID,
        livraisons,
        classes,
        getAllLivraison,
    } = props

    const [allLivraison, setAllLivraison] = useState([])

    useEffect(() => {
        getAllLivraison({ user: userID })
    }, [])

    // Set livraison on state
    useEffect(() => {
        setAllLivraison(livraisons)
    }, [livraisons])
    const dataSubArray = {
        apiCall: getCommande,
        dataApi: data => ({
            user: data.Client_commande,
            commande: data.No_livraison,
        }),
        dataReturned: commandes,
    }
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
    classes: PropTypes.func.isRequired,
    livraisons: PropTypes.array.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(withStyles(styles)(Index)))
