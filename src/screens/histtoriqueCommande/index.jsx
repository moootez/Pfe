/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider, IconButton } from '@material-ui/core'
import getAllCommandes from '../../redux/declarantInterne/getDeclarantAvis'
import getCommandes from '../../redux/declarantInterne/getDeclarantById'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'
import axios from 'axios'
import baseUrl from '../../serveur/baseUrl'
import GetAppIcon from '@material-ui/icons/GetApp';
import { Post } from '../../serveur/axios'

const Index = props => {
    const {
        commandeDetails,
        getCommande,
        userID,
        commandes,
        getAllCommande,
    } = props

    const [list, setList] = useState([])
    const { OpaliaToken } = window.localStorage

    useEffect(() => {
        getAllCommande({ user: userID, dateDebut: null, dateFin: null })
        axios({
            method: 'post',
            url: `${baseUrl}users/all`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`,
            },
            timeout: 30000,
            data: { role: 2 },
        }).then(res => {
            const listUser = []
            res.data.data.map(e => {
                return listUser.push({
                    label: e.codeInsc,
                    value: e.id,
                    codeInsc: e.codeInsc,
                })
            })
            setList(listUser)
        })
    }, [])

    // Set livraison on state

    const [dataSubArray, setDataSubArray] = useState({
        apiCall: getCommande,
        dataApi: data => ({
            user: data.Code_client,
            commande: data.No_commande,
        }),
        dataId: 'No-commande',
        dataReturned: commandeDetails,
    })

    useEffect(() => {
        setDataSubArray({ ...dataSubArray, dataReturned: commandeDetails })
    }, [commandeDetails])

    const [data, setData] = useState({})
    useEffect(() => {
        setData(dataSubArray)
    })

    const exportHistorique = (rowData) => {
        Post(`commande/export/${rowData.No_commande}/${rowData.Code_client}`, rowData).then(
            res => {
                console.log('res', res);
                if (res.status === 201 || res.status === 200) {
                    window.open(res.data.result, '_blank')
                }
            }
        )
    }

    const header = [
        {
            field: "No_commande",
            title: "No commande"
        },
        {
            field: "Code_client",
            title: "Code client"
        },
        {
            field: "Date_commande",
            title: "Date commande"
        },
        {
            field: "Etat_commande",
            title: "Etat commande"
        },
        {
            field: "Livraison",
            title: "Livraison"
        },
        {
            field: "Facture",
            title: "Facture"
        },
        {
            field: "Montant_HT_TND",
            title: "Montant HT TND"
        },
        {
            title: 'Export',
            field: 'export',
            render: rowData => {
                return (
                    <div>
                        <IconButton
                            onClick={() => exportHistorique(rowData)}
                            color="primary"
                            aria-label="Changer status"
                        // disabled={rowData.status === 'Acceptée'}
                        >
                            <GetAppIcon />
                        </IconButton>
                        {/* )} */}
                    </div >
                )
            },
        },
    ]

    return (
        <div className="column col-md-12 style-table">
            {/* <Grid className="gridItem">
                <PageTitle label="Mes commandes" />
            </Grid> */}
            <Divider />
            <TableCollapse
                title="Historique Commande"
                apiCall={getAllCommande}
                dataApi={{ user: userID }}
                dataReturned={JSON.parse(JSON.stringify(commandes))}
                dataSubArray={dataSubArray}
                headerTable={header}
                userID={userID}
                listGrossiste={list}
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
    getAllCommande: userID =>
        dispatch(getAllCommandes.getDeclarantAvisRequest(userID)),
    getCommande: data =>
        dispatch(getCommandes.getDeclarantInterneRequest(data)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, declarantInterne }) => ({
    commandeDetails: declarantInterne.getDeclarantInterne.response,
    userID: login.response.User.details.codeInsc,
    commandes: declarantInterne.getDeclarantAvis.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    commandeDetails: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    commandes: PropTypes.array.isRequired,
    getAllCommande: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
