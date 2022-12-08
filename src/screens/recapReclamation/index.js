/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import getCommandes from '../../redux/statistique/getStatistique'
import getAllLivraisons from '../../redux/referencial/getAllReferencial'
import addReclamationActions from '../../redux/reclamation/newReclamation'
import PageTitle from '../../components/ui/pageTitle'
import Button from '../../components/ui/button'
import alertActions from '../../redux/alert'
import html2canvas from 'html2canvas'
import axios from 'axios'
import baseUrl from '../../serveur/baseUrl'
import getAllProductActions from '../../redux/commande/getAllProduct'
import getReclamationLignes from '../../redux/reclamation/getReclamationLigne'
import MaterialTable from 'material-table'

const Index = props => {
    const {
        history,
    } = props
    const { OpaliaToken } = window.localStorage

    const [reclamation, setReclamation] = useState({})
    const [rows, setRows] = useState([])
    const [statusReclamation, setStatusReclamation] = useState(null)
    const [client, setClient] = useState(null)

    useEffect(() => {
        axios({
            method: 'get',
            url: `${baseUrl}reclamation/recap-reclamation/${history.location.state.index.id}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`,
            }
        }).then(res => {
            if (res.status === 200) {
                setReclamation(res.data)
                setRows(res.data.data)
            }
        })
    }, [])

    useEffect(() => {
        if (history.location.state !== undefined) {
            setStatusReclamation(history.location.state.index.status)
            setClient(history.location.state.index.client.codeInsc)
        }
    }, [history.location.state])

    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement('a')
        fakeLink.style = 'display:none;'
        fakeLink.download = fileName

        fakeLink.href = blob

        document.body.appendChild(fakeLink)
        fakeLink.click()
        document.body.removeChild(fakeLink)

        fakeLink.remove()
    }

    const onGeneratePdf = () => {
        html2canvas(document.querySelector('#recap')).then(function (canvas) {
            const image = canvas.toDataURL('image/png', 1.0)
            downloadImage(image, client)
        })
    }

    return (
        <div className="column col-md-12 text-center style-table form-reclam">
            <div id="recap">
                <Grid className="gridItem">
                    <PageTitle label="Recap Retours" />
                </Grid>
                <Divider />
                <div className="row">
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b> Code Client :</b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{client}</p>
                        </div>
                    </div>
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b>   Désignation Client : </b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.designation}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b>       N° Réclamation : </b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.num_Reclamation}</p>
                        </div>
                    </div>
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b>     Date réclamation : </b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.date_Reclamation}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b> N° Retour :</b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.num_Retour}</p>
                        </div>
                    </div>
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b>  Date Retour : </b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.date_Retour}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b> N° Avoir :</b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.num_Avoir}</p>
                        </div>
                    </div>
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b>  Date Avoir : </b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.date_Avoir}</p>
                        </div>
                    </div>
                </div>
                <div className='row' >
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b>              Satatus : </b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.status}</p>
                        </div>
                    </div>
                    <div className="d-flex col-6">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                <b>   Responsable : </b>
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <p className="txt_form">{reclamation.updated_By}</p>
                        </div>
                    </div>
                </div>
                <Divider />
                <MaterialTable
                    options={{
                        headerStyle: { fontSize: 20 },
                        pageSize: 5,
                        pageSizeOptions: [
                            5,
                            10,
                            20,
                        ],
                    }}
                    title={<PageTitle label="" />}
                    columns={[
                        {
                            title: 'Code pct',
                            field: 'pct',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },

                        {
                            title: 'Motif',
                            field: 'motif',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'Quantité à Retouner',
                            field: 'quantite',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'Quantité Valide',
                            field: 'quantiteValide',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'N°Lot',
                            field: 'lot',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'N°BL',
                            field: 'bl',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'N°Fact',
                            field: 'facture',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'Date péremtion',
                            field: 'datePeremtion',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'Commentaire',
                            field: 'commentaire',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'Status',
                            field: 'status',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                    ]}
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'lignes par page',
                            labelRowsPerPage: 'lignes par page:',
                            firstAriaLabel: 'Première page',
                            firstTooltip: 'Première page',
                            previousAriaLabel: 'Page précédente',
                            previousTooltip: 'Page précédente',
                            nextAriaLabel: 'Page suivante',
                            nextTooltip: 'Page suivante',
                            lastAriaLabel: 'Dernière page',
                            lastTooltip: 'Dernière page',
                        },
                        toolbar: {
                            searchPlaceholder: 'Rechercher',
                        },
                    }}
                    data={JSON.parse(JSON.stringify(rows)) || []}
                />
            </div>
            {/* <Button disabled={statusReclamation === 'validé'} clicked={enregisterReclamation} label="Enregistrer réclamation" /> */}
            <div className="row">
                <div
                    className="col-md-6"
                    style={{ textAlign: 'left' }}
                >
                    <Button
                        className="btn-submit-cmd"
                        clicked={onGeneratePdf}
                        label="Export"
                    />
                </div>
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                    <Button
                        className="btn-submit-cmd"
                        clicked={() => {
                            history.goBack()
                        }
                        }
                        label="Retour"
                    >
                        Retour
                    </Button>
                </div>

            </div>

        </div>
    )
}

Index.propTypes = {
    newReclamation: PropTypes.object.isRequired,
    addReclamation: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    userNamePre: PropTypes.object.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
    commandes: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    reclamationDetails: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    livraisons: PropTypes.array,
    alertShow: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
}

Index.defaultProps = {
    livraisons: [],
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
    addReclamation: payload =>
        dispatch(addReclamationActions.addNewReclamationRequest(payload)),
    getAllProduct: () => dispatch(getAllProductActions.getAllProductRequest()),
    getReclamationLigne: data =>
        dispatch(getReclamationLignes.getReclamationLigneRequest(data)),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({
    info,
    login,
    referencial,
    statistique,
    reclamation,
    commande,
}) => ({
    userID: login.response.User.details.codeInsc,
    userNamePre: login.response.User.details,
    livraisons: referencial.allReferencials.response,
    commandes: statistique.getStatistique.response,
    reclamationDetails: reclamation.getReclamationLigne.response,
    newReclamation: reclamation.newReclamation,
    lng: info.language,
    products: commande.getAllProduct.response,
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
