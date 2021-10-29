/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */

import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Divider, TextField, Button } from '@material-ui/core'
import alertActions from '../../redux/alert'
import getAllProductActions from '../../redux/commande/getAllProduct'
import addNewCommandeActions from '../../redux/commande/newCommande'
import uploadCommandeActions from '../../redux/commande/uploadCommande'
import PageTitle from '../../components/ui/pageTitle'
import generateKey from '../../shared/utility'
import unknown from '../../assets/images/unknown.jpg'
import baseUrl from '../../serveur/baseUrl'

// destrict
const Index = props => {
    const {
        products,
        getAllProduct,
        userID,
        addCommande,
        uploadCommande,
        history,
        newCommande,
        uploadNewCommande,
        alertShow,
    } = props
    const [ColorBorder, setColorBorder] = useState('green')
    const [QteVrac, setQteVrac] = useState([])
    const [QteCarton, setQteCarton] = useState([])
    const checkQteVrac = e => {
        const value = e.target.value
        if (value >= 0) {
            setColorBorder('green')
        } else {
            setColorBorder('red')
        }

        // setQteVrac(e.target.value)
    }
    const checkQteCarton = e => {
        const value = e.target.value
        if (value >= 0) {
            setColorBorder('green')
        } else {
            setColorBorder('red')
        }

        // setQteVrac(e.target.value)
    }
    const [allProduct, setAllProduct] = useState([])
    const [commande, setCommande] = useState({})
    const [file] = useState(null)
    // 1 seul fois
    useEffect(() => {
        getAllProduct()
    }, [])

    //  exceution mors de changement du parametre
    // exp [newCommande.loading, uploadNewCommande.loading]
    useEffect(() => {
        if (newCommande.loading === true || uploadNewCommande.loading === true)
            setTimeout(() => history.push('/validation-commande'), 1000)
    }, [newCommande.loading, uploadNewCommande.loading])

    useEffect(() => {
        setAllProduct(JSON.parse(JSON.stringify(products)))
    }, [products])

    const safeRequire = (url, path, ext = null) => {
        try {
            return `${baseUrl}${path}${url}${ext}`
        } catch {
            return unknown
        }
    }
    let getTotalQt = 8
    getTotalQt = rowData =>
        parseInt((commande[rowData.codeArticleX3] || {}).qtc || 0) *
            parseInt(rowData.coefUcUs || 0) +
        parseInt((commande[rowData.codeArticleX3] || {}).qtv || 0)

    // console.log(getTotalQt(rowData));
    const getTotalPrix = rowData => getTotalQt(rowData) * parseInt(rowData.prix)
    const handleSubmit = () => {
        if (!file) {
            const payload = Object.entries(commande).map(elem => ({
                Code_PCT: elem[1].Code_PCT,
                Code_article: elem[0],
                Designation: elem[1].Designation,
                QTY: getTotalQt(
                    allProduct.find(el => el.codeArticleX3 === elem[0])
                ),
            }))
            if (payload.length !== 0) {
                addCommande({ produits: payload, user: userID })
            } else {
                alertShow(true, {
                    warning: false,
                    info: false,
                    error: true,
                    success: false,
                    message: 'Votre commande est vide',
                })
            }
        } else {
            const formData = new FormData()

            // Update the formData object
            formData.append('file', file, file.name)
            formData.append('user', userID)
            uploadCommande(formData)
        }
    }

    return (
        <div className="column col-md-12 style-table">
            <Divider />
            <MaterialTable
                title={<PageTitle label="Créer une commande" />}
                columns={[
                    {
                        title: 'Image',
                        field: 'codeArticleX3',
                        cellStyle: {
                            width: '10%',
                            textAlign: 'center',
                        },
                        render: rowData => (
                            <img
                                key={generateKey()}
                                src={safeRequire(
                                    rowData.codeArticleX3,
                                    '../produits/',
                                    '.png'
                                )}
                                style={{ width: 150, borderRadius: '2%' }}
                                alt="produit"
                            />
                        ),
                    },
                    {
                        title: 'Code Article',
                        field: 'codeArticleX3',
                        cellStyle: {
                            width: '8%',
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Code PCT',
                        field: 'codePct',
                        cellStyle: {
                            width: '8%',
                        },
                    },
                    {
                        title: 'Designation',
                        field: 'designation1',
                        cellStyle: {
                            width: '16%',
                            textAlign: 'center',
                        },
                    },

                    {
                        title: 'Prix',
                        field: 'prix',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Colisage',
                        field: 'coefUcUs',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Qté carton',
                        field: 'qtc',
                        cellStyle: {
                            textAlign: 'center',
                        },
                        render: rowData => (
                            <div style={{ width: 80 }}>
                                <TextField
                                    onChange={e => checkQteCarton(e)}
                                    inputProps={{ min: 0 }}
                                    disabled={!rowData.actif}
                                    type="number"
                                    key={generateKey()}
                                    label="Quantité"
                                    id="outlined-size-small"
                                    defaultValue={
                                        (commande[rowData.codeArticleX3] || {})
                                            .qtc || 0
                                    }
                                    variant="outlined"
                                    onBlur={e =>
                                        setCommande({
                                            ...commande,
                                            [rowData.codeArticleX3]: {
                                                ...(commande[
                                                    rowData.codeArticleX3
                                                ] || {}),
                                                qtc: e.target.value,
                                                Code_PCT: rowData.codePct,
                                                Designation:
                                                    rowData.designation1,
                                            },
                                        })
                                    }
                                    size="small"
                                />
                            </div>
                        ),
                    },
                    {
                        title: 'Qté vrac',
                        field: 'qtv',
                        cellStyle: {
                            textAlign: 'center',
                        },
                        render: rowData => (
                            <div style={{ width: 80 }}>
                                <TextField
                                    onChange={e => checkQteVrac(e)}
                                    // value={QteVrac}
                                    inputProps={{ min: 0 }}
                                    type="number"
                                    key={generateKey()}
                                    label="Quantité"
                                    id="outlined-size-small"
                                    defaultValue={
                                        (commande[rowData.codeArticleX3] || {})
                                            .qtv || 0
                                    }
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        border: '2px solid'.ColorBorder,
                                        height: 'calc(0.5em + 1.5rem + 2px)',
                                    }}
                                    onBlur={e =>
                                        setCommande({
                                            ...commande,
                                            [rowData.codeArticleX3]: {
                                                ...(commande[
                                                    rowData.codeArticleX3
                                                ] || {}),
                                                qtv: e.target.value,
                                                Code_PCT: rowData.codePct,
                                                Designation:
                                                    rowData.designation1,
                                            },
                                        })
                                    }
                                    disabled={rowData.ucObligatoire === 2}
                                />
                            </div>
                        ),
                    },
                    {
                        title: 'Qté total',
                        field: 'qtt',
                        cellStyle: {
                            width: '7%',
                            textAlign: 'center',
                        },
                        render: rowData => {
                            return (
                                <div key={generateKey()} style={{ width: 80 }}>
                                    <p>{getTotalQt(rowData)}</p>
                                </div>
                            )
                        },
                    },
                    {
                        title: 'Prix total',
                        field: 'pt',
                        cellStyle: {
                            width: '7%',
                            textAlign: 'center',
                        },
                        render: rowData => {
                            return (
                                <div key={generateKey()} style={{ width: 80 }}>
                                    <p>{getTotalPrix(rowData)}</p>
                                </div>
                            )
                        },
                    },
                ]}
                data={allProduct || []}
            />
            <div
                className="m-3 text-left"
                style={{ float: 'left', paddingTop: '10px' }}
            >
                <a
                    variant="contained"
                    component="label"
                    className="mr-2"
                    href={safeRequire('ExempleCsv', '../', '.csv')}
                >
                    <b>Exemple de fichier à importer</b>
                </a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a
                    variant="contained"
                    component="label"
                    className="mr-2"
                    href="declaration_rattacher_saisie/rattacher_le_scan_de_la_declaration/50"
                >
                    <b>Import d&#39;une commande</b>
                </a>
            </div>
            <div className="m-3 text-right" style={{ paddingBottom: '20px' }}>
                <Button className="btn-submit-cmd" onClick={handleSubmit}>
                    Enregistrer la commande
                </Button>
            </div>
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
    getAllProduct: () => dispatch(getAllProductActions.getAllProductRequest()),
    addCommande: payload =>
        dispatch(addNewCommandeActions.addNewCommandeRequest(payload)),
    uploadCommande: payload =>
        dispatch(uploadCommandeActions.uploadCommandeRequest(payload)),
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
const mapStateToProps = ({ info, login, commande }) => ({
    userID: login.response.User.details.codeInsc,
    products: commande.getAllProduct.response,
    newCommande: commande.newCommande,
    uploadNewCommande: commande.uploadCommande,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    userID: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    getAllProduct: PropTypes.func.isRequired,
    addCommande: PropTypes.func.isRequired,
    uploadCommande: PropTypes.func.isRequired,
    newCommande: PropTypes.any.isRequired,
    uploadNewCommande: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    alertShow: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
