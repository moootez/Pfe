/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable  no-return-assign */
/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */

import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Divider } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import getAllProductActions from '../../redux/commande/getAllProduct'
import PageTitle from '../../components/ui/pageTitle'
import generateKey from '../../shared/utility'
import unknown from '../../assets/images/unknown.jpg'
import baseUrl from '../../serveur/baseUrl'
import Button from '../../components/ui/button'

const Index = props => {
    const {
        products,
        getAllProduct,
        history,
        newCommande,
        uploadNewCommande,
        syncProduits,
    } = props

    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(null)
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch('http://localhost/opalia/produit.php') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                setTableData(responseData.data.x3MasterData.product.query.edges.map(edge => edge.node));
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setFetchError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        getAllProduct()
    }, [])

    useEffect(() => {
        if (newCommande.loading === true || uploadNewCommande.loading === true)
            setTimeout(() => history.push('/validation-commande'), 1000)
    }, [newCommande.loading, uploadNewCommande.loading])

    useEffect(() => {
        setTableData(JSON.parse(JSON.stringify(products)))
    }, [products])

    let all
    if (tableData !== null) {
        all = tableData.length
        console.log('all', tableData.length)
    }

    const safeRequire = (url, path, ext = null) => {
        try {
            return `${baseUrl}${path}${url}${ext}`
        } catch {
            return unknown
        }
    }

    const editAction = rowData => {
        history.push({
            pathname: 'edit_produit',
            state: {
                name: rowData.codeArticleX3,
                type: 'edit',
            },
        })
    }

    if (loading) return <p>Loading...</p>;
    if (fetchError) return <p>Error: {fetchError.message}</p>;

    return (
        <div className="column col-md-12 style-table">
            <Divider />
            <div>
                <Button
                    clicked={syncProduits}
                    label="Synchronisation produits"
                />
            </div>
            <MaterialTable
                options={{
                    headerStyle: { fontSize: 20 },
                    pageSize: 5,
                    pageSizeOptions: [
                        5,
                        10,
                        20,
                        { value: all, label: 'Afficher Tous' },
                    ],
                }}
                title={<PageTitle label="Liste des produits" />}
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
                        field: 'code',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Statut',
                        field: 'productStatus',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Désignation',
                        field: 'description1',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },

                    {
                        title: 'Prix',
                        field: 'purchaseBasePrice',
                        type: 'numeric',
                        cellStyle: {
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Modifier Image',
                        field: 'image',
                        render: rowData => (
                            <div>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                >
                                    <EditIcon
                                        onClick={() => editAction(rowData)}
                                    />
                                </Fab>
                            </div>
                        ),
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
                data={tableData || []}
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    getAllProduct: () => dispatch(getAllProductActions.getAllProductRequest()),
    syncProduits: () => dispatch({ type: 'SYNC_PRODUITS' }),
})

const mapStateToProps = ({ info, login, commande }) => ({
    products: commande.getAllProduct.response,
    newCommande: commande.newCommande,
    uploadNewCommande: commande.uploadCommande,
    lng: info.language,
})

Index.propTypes = {
    products: PropTypes.array.isRequired,
    getAllProduct: PropTypes.func.isRequired,
    newCommande: PropTypes.any.isRequired,
    uploadNewCommande: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    syncProduits: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
