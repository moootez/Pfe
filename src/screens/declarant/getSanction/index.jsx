import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import getDeclarantSanctionActions from '../../../redux/declarantInterne/getDeclarantSanction'
import Table from '../../../components/ui/table/index'
import PopupConsultation from '../popup/popupConsultation'
import PopupAdd from '../popup/popupAdd'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     filtredTable,
 *     getDeclarantSanction,
 * }
 * @returns
 */
const Index = ({ lng, intl, history, filtredTable, getDeclarantSanction }) => {
    const type = 'declarantInterneSanction'

    /* hooks member */
    const [rows, setRows] = useState([])
    const [visibleConsultation, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [payload, setPayload] = useState([])

    /* list header */
    const headers = [
        intl.formatMessage({ id: 'sanction' }),
        intl.formatMessage({ id: 'dateCreaction' }),
        intl.formatMessage({ id: 'dateEnvoi' }),
        intl.formatMessage({ id: 'dateNotif' }),
        ' ',
    ]

    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                codeDeclaration: `   عقوبة${index + 1}`,
                dateCreaction:
                    item.dateCreation && item.dateCreation.substr(0, 11),
                dateEnvoi: item.dateEnvoi && item.dateEnvoi.substr(0, 11),
                dateNotif:
                    item.dateNotificationArrive &&
                    item.dateNotificationArrive.substr(0, 11),
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */

    useEffect(() => {
        getDeclarantSanction(history.id)
    }, [])

    /* life cycle */
    useEffect(() => {
        setTable(filtredTable)
    }, [filtredTable])

    /* fonctions */

    /**
     * consulter sanction
     *
     * @param {*} { id }
     */
    const consultationAction = ({ id }) => {
        setVisible(true)
        setPayload(id)
    }

    /**
     * open popup for edit sanction
     *
     * @param {*} { id }
     */
    const saisieAction = ({ id }) => {
        setVisibleEdit(true)
        setPayload(id)
    }

    /**
     * close modal
     *
     */
    const /**
         * fermer modal
         *
         * @memberof Actions
         */
        closeModal = () => {
            setVisible(false)
            setVisibleEdit(false)
        }

    return (
        <Fragment>
            <Table
                type={type}
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                intl={intl}
                fn={consultationAction}
                saisieAction={saisieAction}
            />
            <PopupConsultation
                visible={visibleConsultation}
                onClickAway={closeModal}
                payload={payload}
                type={type}
            />
            <PopupAdd
                visible={visibleEdit}
                onClickAway={closeModal}
                payload={payload}
                history={history.id}
                type={type}
                form="consultation"
            />
        </Fragment>
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
        filtredTable: state.declarantInterne.getDeclarantSanction.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getDeclarantSanction: id =>
        dispatch(getDeclarantSanctionActions.getDeclarantSanctionRequest(id)),
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
    intl: PropTypes.object.isRequired,
    filtredTable: PropTypes.array,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getDeclarantSanction: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
