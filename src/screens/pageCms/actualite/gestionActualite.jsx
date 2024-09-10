import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid, Divider } from '@material-ui/core'
// import Swiper core and required modules
import ButtonComponent from '../../../components/ui/button'
import getActualiteActions from '../../../redux/pageCms/actualite/getActualite'
import deleteActualiteActions from '../../../redux/pageCms/actualite/deleteActualite'
import Table from '../../../components/ui/table/index'
import PageTitle from '../../../components/ui/pageTitle'
import alertActions from '../../../redux/alert'

/**
 *
 *
 * @param {*} { lng, intl, history, filtredTable, getActualite, alertHide, alertShow }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    getActualite,
    deleteActualite,
    alertHide,
    alertShow,
    role,
}) => {
    const type = 'listActualite'
    /* hooks member */
    const [rows, setRows] = useState([])

    const headers = [
        'Titre',
        'Texte',
        'Priorité',
        intl.formatMessage({ id: 'dateCreaction' }),
        'Actions',
    ]
    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            if (role === 'ROLE_CLIENT') {
                rowsTmp = arrayFiltred.map((item, index) => ({
                    id: item.id,
                    index,
                    titre: item.titre,
                    theme: item.texte,
                    sujet: item.priorite,
                    image: item.image,
                    createdAt: item.createdAt && item.createdAt.substr(0, 11),
                }))
            } else {
                rowsTmp = arrayFiltred.map((item, index) => ({
                    id: item.id,
                    index,
                    titre: item.titre,
                    theme: item.texte,
                    sujet: item.priorite,
                    createdAt: item.createdAt && item.createdAt.substr(0, 11),
                }))
            }
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getActualite()
    }, [])

    /* life cycle */
    useEffect(() => {
        if (filtredTable) {
            setTable(filtredTable)
        }
    }, [filtredTable])
    /* functions */
    /**
     * screen d'edit
     *
     * @param {*} row
     */
    const editAction = row => {
        history.push({
            pathname: `/edit_actualite`,
            state: {
                index: filtredTable[row.index],
            },
        })
    }

    /**
     * delete
     *
     * @param {*} row
     */
    const deleteRef = item => {
        console.log(item)
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: `Voulez-vous vraiment supprimer ${item.titre}`,
            onConfirm: () => {
                deleteActualite(item.id)
                setTimeout(() => {
                    alertHide()
                    getActualite()
                }, 2000)
            },
        })
    }

    /**
     * add
     *
     * @param {*} row
     */
    const addActualite = () => {
        history.push({
            pathname: `/new_actualite`,
        })
    }

    return (
        <div style={{ padding: '0 1% 1% 1%' }} className="style-table">
            <Divider />
            <Grid className="gridItem">
                <PageTitle label="Actualités" />
            </Grid>

            <div style={{ marginTop: '0' }} />
            <div>
                <ButtonComponent
                    color="white"
                    type="contained"
                    size="medium"
                    label="Ajouter"
                    clicked={() => addActualite()}
                />
            </div>
            <Table
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                intl={intl}
                type={type}
                editAction={editAction}
                deleteRef={deleteRef}
                pagination={false}
            />
        </div>
    )
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        allReferenciels: state.referencial.allReferencials.response,
        lng: state.info.language,
        filtredTable: state.pageCms.Actualite.response,
        role: state.login.response.User.details.userRoles[0].role,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getActualite: payload =>
        dispatch(getActualiteActions.getActualiteRequest(payload)),
    deleteActualite: payload =>
        dispatch(deleteActualiteActions.deleteActualiteRequest(payload)),
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
    alertHide: () => dispatch(alertActions.alertHide()),
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    filtredTable: [],
}
/**
 *  declaration des props
 */
Index.propTypes = {
    role: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    filtredTable: PropTypes.array,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getActualite: PropTypes.func.isRequired,
    deleteActualite: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
