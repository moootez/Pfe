// !atteste ||

import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import getDeclarantAvisActions from '../../../redux/declarantInterne/getDeclarantAvis'
import Table from '../../../components/ui/table/index'
import PopupConsultation from '../popup/popupConsultation'
import PopupEdit from '../popup/popupAdd'
import ButtonComponent from '../../../components/ui/button'
import getReceivedAvisActions from '../../../redux/declarantInterne/getReceivedAvis'

/**
 *
 *
 * @param {*} {
 *     lng,
 *     intl,
 *     history,
 *     filtredTable,
 *     getDeclarantAvis,
 *     getReceivedAvisReq,
 * }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    getDeclarantAvis,
    getReceivedAvisReq,
}) => {
    const type = 'declarantInterneAvis'
    /* ooks member */
    const [rows, setRows] = useState([])
    const [visibleConsultation, setVisibleConsultation] = useState(false)
    const [payload, setPayload] = useState([])
    const [visibleEdit, setVisibleEdit] = useState(false)
    /* Header */
    const headers = [
        intl.formatMessage({ id: 'avis' }),
        intl.formatMessage({ id: 'dateCreaction' }),
        intl.formatMessage({ id: 'dateEnvoi' }),
        intl.formatMessage({ id: 'dateNotif' }),
        intl.formatMessage({ id: 'dateReception' }),
        ' ',
    ]
    /* set tbale */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                codeDeclaration: `   تنبيه${index + 1}`,
                dateCreaction:
                    item.dateCreation && item.dateCreation.substr(0, 11),
                dateEnvoi: item.dateEnvoi && item.dateEnvoi.substr(0, 11),
                dateNotif:
                    item.dateNotificationArrive &&
                    item.dateNotificationArrive.substr(0, 11),
                dateReception:
                    item.dateReception && item.dateReception.substr(0, 11),
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */

    useEffect(() => {
        getDeclarantAvis(history.id)
    }, [])

    useEffect(() => {
        setTable(filtredTable)
    }, [filtredTable])

    /* functions */

    /**
     * consulter avis
     *
     * @param {*} { id }
     */
    const consultationAction = ({ id }) => {
        setVisibleConsultation(true)
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
            setVisibleConsultation(false)
            setVisibleEdit(false)
        }

    /**
     * edit avis
     *
     * @param {*} { id }
     */
    const editAction = ({ id }) => {
        setVisibleEdit(true)
        setPayload(id)
    }

    /**
     * generate pdf
     *
     */
    const generatePdf = () => {
        getReceivedAvisReq(history)
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
                saisieAction={editAction}
            />
            {rows.length > 0 && (
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label="إستخراج تنبيه"
                    clicked={generatePdf}
                />
            )}
            <PopupConsultation
                visible={visibleConsultation}
                onClickAway={closeModal}
                payload={payload}
                type={type}
            />
            <PopupEdit
                visible={visibleEdit}
                onClickAway={closeModal}
                payload={payload}
                type={type}
                form="consultation"
                history={history.id}
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
        filtredTable: state.declarantInterne.getDeclarantAvis.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getDeclarantAvis: id =>
        dispatch(getDeclarantAvisActions.getDeclarantAvisRequest(id)),
    getReceivedAvisReq: payload =>
        dispatch(getReceivedAvisActions.getReceivedAvisRequest(payload)),
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
    getReceivedAvisReq: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getDeclarantAvis: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
