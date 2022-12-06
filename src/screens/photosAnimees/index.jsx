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
import DeleteIcon from '@material-ui/icons/Delete'
import getAllProductActions from '../../redux/commande/getAllProduct'
import PageTitle from '../../components/ui/pageTitle'
import generateKey from '../../shared/utility'
import unknown from '../../assets/images/unknown.jpg'
import baseUrl from '../../serveur/baseUrl'
import Button from '../../components/ui/button'
import { Delete, Get } from '../../serveur/axios'
import alertActions from '../../redux/alert'

// destrict
const Index = props => {
    const {
        products,
        getAllProduct,
        history,
        newCommande,
        uploadNewCommande,
        syncProduits,
        alertShow
    } = props

    const [allPhotos, setAllPhotos] = useState([])

    useEffect(() => {
        Get('animatedPictures/all').then(res => {
            if (res.status === 200 || res.status === 200) {
                setAllPhotos(res.data)
            }
        })
    }, [])
    const editAction = rowData => {
        history.push({
            pathname: 'edit_photo',
            state: {
                name: rowData.image,
                id: rowData.id,
                rowData,
                type: 'edit',
            },
        })
    }

    const deleteRef = rowData => {
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: `Voulez-vous vraiment supprimer`,
            onConfirm: () => {
                Delete(`animatedPictures/${rowData.id}`)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
        })
    }

    const safeRequire = (url, path) => {
        try {
            return `${baseUrl}${path}${url}`
        } catch {
            return unknown
        }
    }

    const addPhoto = () => {
        history.push({
            pathname: 'edit_photo',
            state: {
                type: 'add',
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
                    pageSizeOptions: [5, 10, 20],
                }}
                title={<PageTitle label="Liste des photos animées" />}
                columns={[
                    {
                        title: 'Image',
                        field: 'image',
                        cellStyle: {
                            textAlign: 'center',
                        },
                        render: rowData => (
                            <img
                                key={generateKey()}
                                src={rowData.base64}
                                style={{ width: 500, height: 100 }}
                                alt="image1"
                            />
                        ),
                    },
                    {
                        title: 'Actions',
                        field: 'actions',
                        cellStyle: {
                            width: '20%',
                            textAlign: 'center',
                        },
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
                                    <Fab
                                        aria-label="delete"
                                        // className={classes.fab}
                                        size="small"
                                    >
                                        <DeleteIcon
                                            onClick={() => deleteRef(rowData)}
                                            color="primary"
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
                data={allPhotos || []}
            />
            <Divider />
            <Button
                color="secondary"
                type="contained"
                size="medium"
                label="Ajouter photo"
                clicked={addPhoto}
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
    syncProduits: () => dispatch({ type: 'SYNC_PRODUITS' }),
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
    products: PropTypes.array.isRequired,
    getAllProduct: PropTypes.func.isRequired,
    newCommande: PropTypes.any.isRequired,
    uploadNewCommande: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    syncProduits: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
