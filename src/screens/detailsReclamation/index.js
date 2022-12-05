/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import Select from '@material-ui/core/Select'
// import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import getCommandes from '../../redux/statistique/getStatistique'
import getAllLivraisons from '../../redux/referencial/getAllReferencial'
import addReclamationActions from '../../redux/reclamation/newReclamation'
import PageTitle from '../../components/ui/pageTitle'
import Button from '../../components/ui/button'
import alertActions from '../../redux/alert'
import Table from '../../components/ui/table'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import axios from 'axios'
import baseUrl from '../../serveur/baseUrl'
import getAllProductActions from '../../redux/commande/getAllProduct'
import DateField from '../../components/ui/datePicker'
import getReclamationLignes from '../../redux/reclamation/getReclamationLigne'
import MaterialTable from 'material-table'
import generateKey from '../../shared/utility'

const natureReclamation = [
    'Périmé',
    'Abimé',
    'Étui cabossé',
    'Date proche',
    'Étanchéité',
    'Autres',
]

const graviteReclamation = ['Mineur', 'Majeur', 'Critique']

const Index = props => {
    const {
        alertShow,
        addReclamation,
        userID,
        getAllLivraison,
        lng,
        commandes,
        getCommande,
        newReclamation,
        history,
        getAllProduct,
        products,
        userNamePre,
        getReclamationLigne,
        reclamationDetails
    } = props
    const { OpaliaToken } = window.localStorage

    const [reclamation, setReclamation] = useState({})
    const [errorsList, setErrorsList] = useState({})
    const [isError, setIsError] = useState(false)
    const fileteredCommandes = []
    const [rows, setRows] = useState([])
    const [meta, setMeta] = useState([])
    const [isEdited, setIsEdited] = useState(false)
    const [index, setIndex] = useState(0)
    const [listLot, setListLot] = useState([])
    const [listBl, setListBl] = useState([])
    const [statusReclamation, setStatusReclamation] = useState(null)
    const [ColorBorder, setColorBorder] = useState('green')

    useEffect(() => {
        if (reclamationDetails) {
            setRows(reclamationDetails)
        }
    }, [reclamationDetails])

    useEffect(() => {
        if (history.location.state !== undefined) {
            getReclamationLigne({ id: history.location.state.index.id })
            setStatusReclamation(history.location.state.index.status)
        }
    }, [history.location.state])


    const checkQteCarton = e => {
        const value = e.target.value
        if (value >= 0) {
            setColorBorder('green')
        } else {
            setColorBorder('red')
        }

        // setQteVrac(e.target.value)
    }

    const enregisterReclamation = () => {
        const payload = Object.entries(reclamation).map(elem => ({
            // Code_PCT: elem[1].Code_PCT,
            id: parseInt(elem[0]),
            // Designation: elem[1].Designation,
            quantite_Valide: elem[1].quantite_Valide,
        }))

        axios({
            method: 'post',
            url: `${baseUrl}reclamation/validation/${history.location.state.index.id}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`,
            },
            data: payload,
        }).then(res => {
            if (res.status === 201 || res.code === 200) {
                alertShow(true, {
                    onConfirm: false,
                    warning: false,
                    info: false,
                    error: false,
                    success: true,
                    message: 'Modifier avec succés',
                })
                history.push({
                    pathname: 'liste-reclamation',
                })
            }
        })
    }
    return (
        <div className="column col-md-12 text-center style-table form-reclam">
            {/* <Grid className="gridItem">
                <PageTitle label="Consulter réclamation" />
            </Grid> */}
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
                title={<PageTitle label="Validation réclamation" />}
                columns={[
                    {
                        title: 'Code pct',
                        field: 'code_Pct',
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
                        title: 'Quantité à Valider',
                        field: 'quantite_Valide',
                        cellStyle: {
                            // width: '16%',
                            textAlign: 'center',
                        },
                        render: rowData => (
                            <div style={{ width: 80, alignContent: 'center' }}>
                                <TextField
                                    onChange={e => checkQteCarton(e)}
                                    inputProps={{ min: 0 }}
                                    disabled={rowData.status !== 'accepté'}
                                    type="number"
                                    key={generateKey()}
                                    // label="Quantité"
                                    id="outlined-size-small"
                                    // defaultValue={}
                                    defaultValue={
                                        (
                                            reclamation[
                                            rowData.id
                                            ] || {}
                                        ).quantite_Valide || 0
                                    }
                                    variant="outlined"
                                    style={{ alignContent: 'center' }}
                                    onBlur={e => {
                                        setReclamation({
                                            ...reclamation,
                                            [rowData.id]: {
                                                ...(reclamation[
                                                    rowData
                                                        .id
                                                ] || {}),
                                                quantite_Valide: e.target.value,
                                            },
                                        })
                                    }
                                    }
                                    size="small"
                                />
                            </div>
                        ),
                    },
                    {
                        title: 'N°Lot',
                        field: 'num_Lot',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'N°BL',
                        field: 'num_Bl',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'N°Fact',
                        field: 'num_Fact',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Date péremtion',
                        field: 'date_Peremption',
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
            {/* <Button disabled={statusReclamation === 'validé'} clicked={enregisterReclamation} label="Enregistrer réclamation" /> */}
            <div className="row">
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <Button
                        disabled={statusReclamation === 'validé'}
                        className="btn-submit-cmd"
                        clicked={enregisterReclamation}
                        label="Valider la réclamation"
                    >
                        Valider la réclamation
                    </Button>
                </div>
                <div className="col-md-6" style={{ textAlign: 'left' }}>
                    <Button
                        disabled={statusReclamation === 'validé'}
                        className="btn-submit-cmd"
                        clicked={() => {
                            history.push({
                                pathname: `/liste-reclamation`
                            })
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
