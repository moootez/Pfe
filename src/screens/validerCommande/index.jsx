/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider, Button } from '@material-ui/core'
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
    const { commandes, getCommande, userID, validerCommande } = props

    const [allCommande, setAllCommande] = useState([])

    useEffect(() => {
        getCommande({ user: userID })
    }, [])

    useEffect(() => {
        setAllCommande(JSON.parse(JSON.stringify(commandes)))
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
                        title: 'Nom',
                        field: 'client.nom',
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
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                handleSubmit(
                                                    newStatus,
                                                    rowData.id
                                                )
                                            }
                                        >
                                            {statusAndTxt[rowData.status]}
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            handleSubmit('ANNULER', rowData.id)
                                        }
                                    >
                                        Annuler
                                    </Button>
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
