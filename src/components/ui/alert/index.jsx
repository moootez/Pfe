/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import alertActions from '../../../redux/alert'

/**
 * alert
 *
 * @param {*} {
 *     show,
 *     onHideAlert,
 *     error: {
 *         onConfirm = null,
 *         warning = false,
 *         error = false,
 *         success = false,
 *         language = 'ar',
 *         info = false,
 *         message = '',
 *         title = '',
 *     },
 * }
 * @returns
 */
const index = ({
    show,
    onHideAlert,
    error: {
        onConfirm = null,
        warning = false,
        error = false,
        success = false,
        language = 'fr',
        info = false,
        message = '',
        title = '',
    },
}) => {
    /**
     * hooks numbers
     */
    const [confirmDelete, setConfirmDelete] = useState(false)

    /**
     * hide alert
     *
     */
    const hideAlert = () => {
        onHideAlert()
        setConfirmDelete(false)
    }

    /**
     * on Cconfirme alert
     *
     */
    const onConfirmAlert = () => {
        if (onConfirm) {
            onConfirm()
        } else {
            setConfirmDelete(false)
        }
        onHideAlert()
    }

    return (
        <div>
            {show && (
                <SweetAlert
                    showCancel={onConfirm || (onConfirm && !error)}
                    cancelBtnText={language === 'ar' ? 'Non' : 'Non'}
                    confirmBtnBsStyle={error || warning ? 'danger' : 'default'}
                    confirmBtnText={
                        onConfirm ? (language === 'ar' ? 'Oui' : 'Oui') : 'X'
                    }
                    confirmBtnCssClass={onConfirm ? 'Oui' : 'closeBtnAlert'}
                    cancelBtnBsStyle="default"
                    onCancel={() => hideAlert()}
                    error={error || confirmDelete}
                    info={info}
                    warning={warning}
                    success={success || confirmDelete}
                    title={
                        confirmDelete
                            ? language === 'ar'
                                ? 'Oui'
                                : 'Succès'
                            : title
                    }
                    onConfirm={() => onConfirmAlert()}
                >
                    {confirmDelete
                        ? language === 'ar'
                            ? 'Oui'
                            : 'Supprimer avec succes'
                        : message}
                </SweetAlert>
            )}
        </div>
    )
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    onHideAlert: () => dispatch(alertActions.alertHide()),
})
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        warning: state.alert.warning,
        show: state.alert.show,
        error: state.alert.error,
        success: state.alert.success,
        info: state.alert.info,
        title: state.alert.title,
        message: state.alert.message,
        onConfirm: state.alert.onConfirm,
    }
}
/**
 *  Inialisation
 */
index.defaultProps = {
    onConfirm: () => {},
    language: 'ar',
}
/**
 *  declaration des props
 */
index.propTypes = {
    warning: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    info: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onHideAlert: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    language: PropTypes.string,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index)
