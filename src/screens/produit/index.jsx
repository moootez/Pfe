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


// destrict
const Index = props => {
    const {
        products,
        getAllProduct,
        history,
        newCommande,
        uploadNewCommande,
    } = props

    const [allProduct, setAllProduct] = useState([])

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

    let all
    if (allProduct !== null) {
        all = allProduct.length
        console.log('all', allProduct.length)
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

    return (
        <div className="column col-md-12 style-table">
            <Divider />

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
                        field: 'codeArticleX3',
                        cellStyle: {
                            // width: '8%',
                            textAlign: 'center',
                        },
                    },
                    {
                        title: 'Code PCT',
                        field: 'codePct',
                        // cellStyle: {
                        //     width: '8%',
                        // },
                    },
                    {
                        title: 'Désignation',
                        field: 'designation1',
                        cellStyle: {
                            // width: '16%',
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
                        title: 'Modifier Image',
                        field: 'image',
                        render: rowData => {
                            return (
                                <div>
                                    <Fab
                                        color="secondary"
                                        aria-label="edit"
                                        // className={classes.fab}
                                        size="small"
                                    >
                                        <EditIcon
                                            onClick={() => editAction(rowData)}
                                        />
                                    </Fab>
                                </div>
                            )
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
                data={allProduct || []}
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
    getAllProduct: () => dispatch(getAllProductActions.getAllProductRequest()),
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
    newCommande: PropTypes.any.isRequired,
    uploadNewCommande: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
