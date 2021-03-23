/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider, TextField, Button } from '@material-ui/core'
import getAllProductActions from '../../redux/commande/getAllProduct'
import addNewCommandeActions from '../../redux/commande/newCommande'
import PageTitle from '../../components/ui/pageTitle'
import generateKey from '../../shared/utility'
import unknown from '../../assets/images/unknown.jpg'

const Index = props => {
    const { products, getAllProduct, userID, addCommande } = props

    console.log(userID)

    const [allProduct, setAllProduct] = useState([])
    const [commande, setCommande] = useState({})

    useEffect(() => {
        getAllProduct()
    }, [])

    useEffect(() => {
        setAllProduct(JSON.parse(JSON.stringify(products)))
    }, [products])

    const safeRequire = url => {
        try {
            return require(url)
        } catch {
            return unknown
        }
    }

    const getTotalQt = rowData =>
        parseInt((commande[rowData.codeArticleX3] || {}).qtc || 0) *
            parseInt(rowData.coefUcUs || 0) +
        parseInt((commande[rowData.codeArticleX3] || {}).qtv || 0)
    const getTotalPrix = rowData => getTotalQt(rowData) * parseInt(rowData.prix)
    const handleSubmit = () => {
        const payload = Object.entries(commande).map(elem => ({
            Code_article: elem[0],
            QTY: getTotalQt(
                allProduct.find(el => el.codeArticleX3 === elem[0])
            ),
        }))
        addCommande({ produits: payload, user: userID })
    }

    return (
        <div className="column col-md-12">
            <Grid className="gridItem">
                <PageTitle label="Creation du commande" />
            </Grid>
            <Divider />
            <MaterialTable
                title=""
                columns={[
                    {
                        title: 'Image',
                        field: 'codeArticleX3',
                        render: rowData => (
                            <img
                                key={generateKey()}
                                src={safeRequire(
                                    `../../assets/images/produits/${rowData.codeArticleX3}.png`
                                )}
                                style={{ width: 40, borderRadius: '2%' }}
                                alt="produit"
                            />
                        ),
                    },
                    { title: 'CodeArticle', field: 'codeArticleX3' },
                    { title: 'Designation', field: 'designation1' },
                    {
                        title: 'Birth Year',
                        field: 'birthYear',
                        type: 'numeric',
                    },
                    { title: 'Categorie', field: 'categorie' },
                    { title: 'Prix', field: 'prix' },
                    {
                        title: 'Qté carton',
                        field: 'qtc',
                        render: rowData => (
                            <div style={{ width: 80 }}>
                                <TextField
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
                                            [rowData.codeArticleX3]: {
                                                ...(commande[
                                                    rowData.codeArticleX3
                                                ] || {}),
                                                qtc: e.target.value,
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
                        render: rowData => (
                            <div style={{ width: 80 }}>
                                <TextField
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
                                    onBlur={e =>
                                        setCommande({
                                            [rowData.codeArticleX3]: {
                                                ...(commande[
                                                    rowData.codeArticleX3
                                                ] || {}),
                                                qtv: e.target.value,
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
            <div className="m-3 text-right">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Envoyer la commande
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
