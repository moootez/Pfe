import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    changeStepSaisie: ['step'],
    changeStepRapprochement: ['stepRapprochement'],
    changeStepDeclaration: ['stepDeclaration'],
})

export const changeStepTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    step: 0,
    stepRapprochement: 0,
    stepDeclaration: 0,
})

/* ------------- Reducers ------------- */
/**
 * reducers action request
 * @param {*} state
 */
/**
 * reducers action request change step tabs
 * @param {*} state
 */
const changeStepSaisie = (state, { step }) =>
    state.merge({
        step,
    })

/**
 * reducers action request change step pour rapprochement
 * @param {*} state
 */
const changeStepRapprochement = (state, { stepRapprochement }) =>
    state.merge({
        stepRapprochement,
    })

/**
 * reducers action request change step sous rubrique
 * @param {*} state
 */
const changeStepDeclaration = (state, { stepDeclaration }) =>
    state.merge({
        stepDeclaration,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_STEP_SAISIE]: changeStepSaisie,
    [Types.CHANGE_STEP_RAPPROCHEMENT]: changeStepRapprochement,
    [Types.CHANGE_STEP_DECLARATION]: changeStepDeclaration,
})
