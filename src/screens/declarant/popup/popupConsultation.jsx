import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Divider } from '@material-ui/core'
import { connect } from 'react-redux'
import Modal from 'react-awesome-modal'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import RenderForm from '../formSanctionEtAvis/consultationForm'
import getSanctionActions from '../../../redux/declarantInterne/getSanctionById'
import getAvisActions from '../../../redux/declarantInterne/getAvisById'

// style
const useStyles = makeStyles(() => ({
    modal: {
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '70%',
        textAlign: 'right',
    },
}))

/**
 *
 *
 * @param {*} {
 *     payload,
 *     visible,
 *     onClickAway,
 *     type,
 *     getAvisReq,
 *     getSanctionReq,
 *     getSanction,
 *     getAvis,
 * }
 * @returns
 */
const PopupConsultation = ({
    payload,
    visible,
    onClickAway,
    type,
    getAvisReq,
    getSanctionReq,
    getSanction,
    getAvis,
}) => {
    /* hooks member */
    const classes = useStyles()

    /* life cycle */

    useEffect(() => {
        if (visible)
            if (type === 'declarantInterneSanction') getSanctionReq(payload)
            else getAvisReq(payload)
    }, [payload])

    /* les functions */

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
            onClickAway(false)
        }

    /**
     * return
     *
     */
    const cancel = () => {
        onClickAway(false)
    }

    return (
        <Modal
            visible={visible}
            effect="fadeInUp"
            onClickAway={() => closeModal()}
            width="29%"
        >
            <div className={classes.modal}>
                <PageTitle
                    style={{ marginTop: '-10px' }}
                    label={
                        type === 'declarantInterneSanction'
                            ? ' العقوبة'
                            : 'التنبيه'
                    }
                />
                <RenderForm
                    payload={
                        type === 'declarantInterneSanction'
                            ? getSanction
                            : getAvis
                    }
                    type={type}
                />
                <Divider />
                <div style={{ textAlign: 'center' }}>
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        label="إلغاء"
                        size="medium"
                        clicked={cancel}
                    />
                </div>
            </div>
        </Modal>
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
        getSanction: state.declarantInterne.getSanction.response || [],
        getAvis: state.declarantInterne.getAvis.response || [],
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getSanctionReq: payload =>
        dispatch(getSanctionActions.getSanctionRequest(payload)),
    getAvisReq: payload => dispatch(getAvisActions.getAvisRequest(payload)),
})
/**
 *  Inialisation
 */
PopupConsultation.defaultProps = {
    getAvis: [],
    getSanction: [],
    visible: false,
    onClickAway: () => {},
}
/**
 *  declaration des props
 */
PopupConsultation.propTypes = {
    getAvis: PropTypes.array,
    getSanction: PropTypes.array,
    payload: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    getSanctionReq: PropTypes.func.isRequired,
    getAvisReq: PropTypes.func.isRequired,
    visible: PropTypes.string,
    onClickAway: PropTypes.func,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(PopupConsultation))
