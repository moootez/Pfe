/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import getCommandeActions from '../../redux/commande/getCommande'
import validerCommandeActions from '../../redux/commande/validerCommande'
import PageTitle from '../../components/ui/pageTitle'

const statusAndTxt = {
    BROUILLON: 'Valider',
    VALIDATION_CLIENT: 'Valider',
    VALIDATION_OPALIA: 'Valider',
    ANNULEE: 'Annuler',
}

const Index = props => {
    const { commandes, getCommande, userID, validerCommande, role } = props

    const [allCommande, setAllCommande] = useState([])

    useEffect(() => {
        getCommande({ user: userID, role })
    }, [])

    useEffect(() => {
        let newCommandes
        if (role === 'ROLE_CLIENT')
            newCommandes = (commandes || []).filter(
                el => el.status === 'BROUILLON'
            )
        else
            newCommandes = (commandes || []).filter(
                el => el.status === 'VALIDATION_CLIENT'
            )
        setAllCommande(JSON.parse(JSON.stringify(newCommandes)))
    }, [commandes])

    const handleSubmit = (newStatus, idCommande) => {
        validerCommande({ status: newStatus, commande: idCommande })
    }

    return (
        <div className="column col-md-12">
            <Grid className="gridItem">
                <PageTitle label="Validation commande" />
            </Grid>
            <Divider />
            <MaterialTable
                title=""
                columns={[
                    {
                        title: 'ID',
                        field: 'id',
                    },
                    {
                        title: 'Code Inscription',
                        field: 'client.codeInsc',
                        // render: rowData => (
                        //     <img
                        //         key={generateKey()}
                        //         src={safeRequire(
                        //             `../../assets/images/produits/${rowData.codeArticleX3}.png`
                        //         )}
                        //         style={{ width: 40, borderRadius: '2%' }}
                        //         alt="produit"
                        //     />
                        // ),
                    },
                    { title: 'Adresse', field: 'client.ligneAdresse' },
                    { title: 'Ville', field: 'client.ville' },
                    { title: 'Status', field: 'status' },
                    {
                        title: 'Validation',
                        field: 'validation',
                        render: rowData => {
                            let newStatus = 'VALIDATION_OPALIA'
                            if (rowData.status === 'BROUILLON') {
                                newStatus = 'VALIDATION_CLIENT'
                            } else if (rowData.status === 'VALIDATION_CLIENT') {
                                newStatus = 'VALIDATION_OPALIA'
                            }

                            const toValide =
                                rowData.status !== 'VALIDATION_OPALIA'

                            return (
                                <div style={{ width: 80 }}>
                                    {toValide && (
                                        <IconButton
                                            onClick={() =>
                                                handleSubmit(
                                                    newStatus,
                                                    rowData.id
                                                )
                                            }
                                            color="primary"
                                            aria-label={statusAndTxt[newStatus]}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() =>
                                            handleSubmit('ANNULER', rowData.id)
                                        }
                                        color="secondary"
                                        aria-label="Annuler"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            )
                        },
                    },
                ]}
                data={allCommande || []}
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
    getCommande: payload =>
        dispatch(getCommandeActions.getCommandeRequest(payload)),
    validerCommande: payload =>
        dispatch(validerCommandeActions.validerCommandeRequest(payload)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, commande }) => ({
    userID: login.response.User.details.codeInsc,
    role: login.response.User.details.userRoles[0].role,
    commandes: commande.getCommande.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    userID: PropTypes.object.isRequired,
    commandes: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    validerCommande: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
