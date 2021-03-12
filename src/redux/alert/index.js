import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    alertShow: [
        'warning',
        'error',
        'success',
        'info',
        'title',
        'message',
        'onConfirm',
    ],
    alertHide: [''],
})

export const alertTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    language: 'ar',
    warning: false,
    show: false,
    error: false,
    success: false,
    info: false,
    title: '',
    message: '',
    onConfirm: null,
})

/* ------------- Reducers ------------- */
/**
 * reducers action hide popup
 *
 * @param {*} state
 */

const alertHide = state => state.merge({ show: false })

/**
 * reducers action show popup
 *
 * @param {*} state
 * @param {*} { warning, error, success, info, title, message, onConfirm }
 */
const alertShow = (
    state,
    { warning, error, success, info, title, message, onConfirm }
) =>
    state.merge({
        warning,
        error,
        success,
        info,
        title,
        message,
        onConfirm,
        show: true,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ALERT_SHOW]: alertShow,
    [Types.ALERT_HIDE]: alertHide,
})
