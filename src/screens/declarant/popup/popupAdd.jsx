import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import addSanctionActions from '../../../redux/declarantInterne/addSanction'
import addAvisActions from '../../../redux/declarantInterne/addAvis'
import ButtonComponent from '../../../components/ui/button'
import RenderForm from '../formSanctionEtAvis/addSanctionForm'
import PageTitle from '../../../components/ui/pageTitle'
import getSanctionActions from '../../../redux/declarantInterne/getSanctionById'
import getAvisActions from '../../../redux/declarantInterne/getAvisById'
import editSanctionActions from '../../../redux/declarantInterne/editSanction'
import editAvisActions from '../../../redux/declarantInterne/editAvis'

// style
const useStyles = makeStyles(() => ({
    modal: {
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '40%',
        textAlign: 'right',
        marginRight: '30%',
        marginTop: '5%',
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
 *     form,
 *     addSanctionReq,
 *     addAvisReq,
 *     responseAddSanction,
 *     responseAddAvis,
 *     getAvisReq,
 *     getSanctionReq,
 *     getSanction,
 *     getAvis,
 *     editSanctionReq,
 *     editAvisReq,
 *     responseEditAvis,
 *     responseEditSanction,
 *     history,
 * }
 * @returns
 */
const PopupAdd = ({
    payload,
    visible,
    onClickAway,
    type,
    form,
    addSanctionReq,
    addAvisReq,
    responseAddSanction,
    responseAddAvis,
    getAvisReq,
    getSanctionReq,
    getSanction,
    getAvis,
    editSanctionReq,
    editAvisReq,
    responseEditAvis,
    responseEditSanction,
    history,
}) => {
    /* ooks member */
    const [errorsListSanction, setErrorsListSanction] = useState([])
    const [errorsListAvis, setErrorsListAvis] = useState([])
    const classes = useStyles()
    const [payloadState, setPayloadState] = useState([])
    const [isError, setIsError] = useState(false)
    const [payloadEdit, setPayloadEdit] = useState([])
    const [payloadStateAvis, setPayloadStateAvis] = useState([])
    const [payloadStateSanction, setPayloadStateSanction] = useState([])

    // list type sanction
    const list = [
        { label: 'إقتطاع 2/3 المرتب', value: 1 },
        { label: 'شكاية', value: 2 },
        { label: 'عدم مباشرة المهام', value: 3 },
        { label: 'إقتطاع ثلثي المرتب أو المنحة عن كل شهر تأخير', value: 4 },
        { label: 'خطية مالية من 1000 إلى 10000 دينار', value: 5 },
        {
            label:
                'عند إنقضاء مدة  60 يوم إقتطاع ثلثي المرتب أو المنحة عن كل شهر تأخير',
            value: 6,
        },
        {
            label: 'عند إنقضاء مدة  60 يوم خطية مالية من 1000 إلى 10000 دينار',
            value: 7,
        },
        {
            label: 'عند إنقضاء مدة  60 يوم خطية 300 دينار عن كل شهر تأخير',
            value: 8,
        },
        {
            label:
                'إذا تواصل التأخير أكثر من 6 أشهر سجن لمدة سنة و خطية 20000 دينار+ إذا كان الممتنع من المنتجبين يحرم من الترشح للوظائف العامة لمدة 5 سنوات',
            value: 9,
        },
    ]

    /**
     * check error sanction
     *
     */
    const checkErrorSanction = () => {
        if (
            responseAddSanction &&
            responseAddSanction.data.status === 'error'
        ) {
            setErrorsListSanction(responseAddSanction.data.data)
            setIsError(true)
        } else {
            onClickAway(false)
            setIsError(false)
        }
    }

    /**
     * check error avis
     *
     */
    const checkErrorAvis = () => {
        if (responseAddAvis && responseAddAvis.data.status === 'error') {
            setErrorsListAvis(responseAddAvis.data.data)
            setIsError(true)
        } else if (
            form === 'consultation' &&
            responseEditAvis &&
            responseEditAvis.data.status === 'error'
        ) {
            setErrorsListAvis(responseEditAvis.data.data)
            setIsError(true)
        } else {
            onClickAway(false)
            setIsError(false)
        }
    }

    /* life cycle */

    useEffect(() => {
        if (form === 'consultation') setPayloadState(payloadEdit)
    }, [payloadEdit])

    /* life cycle */
    useEffect(() => {
        checkErrorSanction()
    }, [responseAddSanction])

    /* life cycle */
    useEffect(() => {
        checkErrorAvis()
    }, [responseAddAvis])

    /* life cycle */
    useEffect(() => {
        if (form === 'consultation') {
            setPayloadState(getAvis[0])
            setPayloadStateAvis(getAvis[0])
        }
    }, [getAvis])

    /* life cycle */
    useEffect(() => {
        if (form === 'consultation') {
            setPayloadState(getSanction[0])
            setPayloadStateSanction(getSanction[0])
        }
    }, [getSanction])

    /* life cycle */
    useEffect(() => {
        if (form === 'consultation') {
            checkErrorAvis()
        }
    }, [responseEditAvis])

    /* life cycle */
    useEffect(() => {
        if (form === 'consultation') {
            checkErrorAvis()
        }
    }, [responseEditSanction])

    /* life cycle */
    useEffect(() => {
        if (form === 'consultation' && visible)
            if (type === 'declarantInterneSanction') getSanctionReq(payload)
            else getAvisReq(payload)
    }, [visible])

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
            if (form !== 'consultation') {
                setPayloadState({})
            } else {
                setPayloadState({})
                setPayloadEdit([])
            }
            setIsError(false)
            onClickAway(false)
        }

    /**
     * set payload
     *
     * @param {*} { target: { name, value } }
     */
    const fieldChangedHandler = ({ target: { name, value } }) => {
        if (form === 'ajout') {
            setPayloadState({ ...payloadState, [name]: value })
            console.log('payloadStateaa', payloadState)
        } else {
            if (type === 'declarantInterneSanction')
                setPayloadStateSanction({ ...payloadState, [name]: value })
            else setPayloadStateAvis({ ...payloadStateAvis, [name]: value })
            setPayloadEdit({ ...payloadState, [name]: value })
            setPayloadState([])
        }
    }

    /**
     * add sanction and avis
     *
     */
    const add = () => {
        if (type === 'declarantInterneSanction')
            addSanctionReq({ ...payloadState, declarant: payload.id })
        else addAvisReq({ ...payloadState, declarant: payload.id })
    }

    /**
     * edit sanction et avis
     *
     */
    const edit = () => {
        if (type === 'declarantInterneSanction') {
            payloadState.type = list
                .filter(e => e.value === payloadState.type)
                .map(i => i.label)
            editSanctionReq({
                ...payloadStateSanction,
                declarant: payloadStateSanction.id,
                idDeclarant: history,
            })
        } else
            editAvisReq({
                ...payloadStateAvis,
                declarant: payloadStateAvis.declarant.id,
                idDeclarant: history,
            })
    }

    /**
     * return from cancel consultation
     *
     */
    const cancel = () => {
        if (form !== 'consultation' && payloadState !== undefined) {
            if (Object.keys(payloadState).length === 0) {
                setPayloadState({})
                setPayloadEdit([])
                onClickAway(false)
            } else {
                setPayloadState({})
                setPayloadEdit([])
            }
        } else {
            onClickAway(false)
            setPayloadState([])
        }
        setIsError(false)
    }

    return (
        <Modal open={visible} onClose={() => closeModal()}>
            <div className={classes.modal}>
                <PageTitle
                    style={{ marginTop: '-10px' }}
                    label={
                        type === 'declarantInterneSanction'
                            ? ' تسجيل عقوبة'
                            : 'تسجيل تنبيه'
                    }
                />
                {form === 'ajout' && (
                    <RenderForm
                        payload={payloadState}
                        type={type}
                        errorsList={
                            type === 'declarantInterneSanction'
                                ? errorsListSanction
                                : errorsListAvis
                        }
                        isError={isError}
                        fieldChangedHandler={fieldChangedHandler}
                        form={form}
                    />
                )}
                {type === 'declarantInterneSanction' &&
                    form === 'consultation' && (
                        <RenderForm
                            payload={payloadStateSanction || payloadEdit}
                            type={type}
                            errorsList={
                                type === 'declarantInterneSanction'
                                    ? errorsListSanction
                                    : errorsListAvis
                            }
                            isError={isError}
                            fieldChangedHandler={fieldChangedHandler}
                            form={form}
                        />
                    )}
                {type !== 'declarantInterneSanction' &&
                    form === 'consultation' && (
                        <RenderForm
                            payload={payloadStateAvis || payloadEdit}
                            type={type}
                            errorsList={
                                type === 'declarantInterneSanction'
                                    ? errorsListSanction
                                    : errorsListAvis
                            }
                            isError={isError}
                            fieldChangedHandler={fieldChangedHandler}
                            form={form}
                        />
                    )}
                <Divider />
                <div style={{ textAlign: 'center' }}>
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        size="medium"
                        label="تأكيد"
                        clicked={form === 'consultation' ? edit : add}
                    />
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
        responseAddSanction: state.declarantInterne.addSanction.response,
        responseAddAvis: state.declarantInterne.addAvis.response,
        getSanction: state.declarantInterne.getSanction.response || [],
        getAvis: state.declarantInterne.getAvis.response || [],
        responseEditSanction: state.declarantInterne.editSanction.response,
        responseEditAvis: state.declarantInterne.editAvis.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    addSanctionReq: payload =>
        dispatch(addSanctionActions.addSanctionRequest(payload)),
    addAvisReq: payload => dispatch(addAvisActions.addAvisRequest(payload)),
    getSanctionReq: payload =>
        dispatch(getSanctionActions.getSanctionRequest(payload)),
    getAvisReq: payload => dispatch(getAvisActions.getAvisRequest(payload)),
    editSanctionReq: payload =>
        dispatch(editSanctionActions.editSanctionRequest(payload)),
    editAvisReq: payload => dispatch(editAvisActions.editAvisRequest(payload)),
})
/**
 *  Inialisation
 */
PopupAdd.defaultProps = {
    visible: false,
    onClickAway: () => {},
    responseAddSanction: [],
    responseAddAvis: [],
    responseEditAvis: [],
    responseEditSanction: [],
    getAvis: [],
    getSanction: [],
}
/**
 *  declaration des props
 */
PopupAdd.propTypes = {
    payload: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    responseAddSanction: PropTypes.object,
    responseAddAvis: PropTypes.object,
    responseEditAvis: PropTypes.object,
    responseEditSanction: PropTypes.object,
    visible: PropTypes.string,
    onClickAway: PropTypes.func,
    addSanctionReq: PropTypes.func.isRequired,
    addAvisReq: PropTypes.func.isRequired,
    getSanctionReq: PropTypes.func.isRequired,
    getAvisReq: PropTypes.func.isRequired,
    getAvis: PropTypes.array,
    getSanction: PropTypes.array,
    editSanctionReq: PropTypes.func.isRequired,
    editAvisReq: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(PopupAdd))
