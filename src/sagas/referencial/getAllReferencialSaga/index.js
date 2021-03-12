import { takeLatest, put } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import axios from 'axios'
import getAllReferencesActions, {
    getAllReferenceTypes,
} from '../../../redux/referencial/getAllReferencial'
import getLoaderActions from '../../../redux/wrapApi/index'
import { Get } from '../../../serveur/axios'
import baseUrl from '../../../serveur/baseUrl'

export function renameKeys(obj) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey =
            key.substring(0, 6) === 'Inlucc'
                ? key.substring(32, key.length)
                : key
        return { [newKey]: obj[key] }
    })
    return Object.assign({}, ...keyValues)
}

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getByPaginationReferencialSagas(payload) {
    let result = '?'
    Object.keys(payload).map((key, index) => {
        if (key !== 'type' && payload[key] != null) {
            if (index !== 1) {
                result += '&'
            }
            result += key
            result += '='
            result += payload[key]
        }
        return result
    })
    const response = yield Get(`referenciel/${result}`)
    if (response.status === 200) {
        yield put(
            getAllReferencesActions.getReferenceByPaginationSuccess(
                response.data.data
            )
        )
    } else {
        yield put(
            getAllReferencesActions.getReferenceByPaginationFailure(response)
        )
    }
}
/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllReferencialSagas(payload) {
    try {
        // const { InluccToken } = window.localStorage
        // instance.defaults.headers.Authorization = `Bearer ${InluccToken}`
        yield put(getLoaderActions.activeGeneraleLoader())
        const response = yield axios({
            method: 'get',
            url: `${baseUrl}referenciel/all`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 60000,
        })

        // const response = yield Get(`referenciel/all`)

        if (response.status === 200) {
            const referenciels = renameKeys(response.data.data.referenciels)
            yield put(
                getAllReferencesActions.getAllReferenceSuccess({
                    categories: response.data.data.categories,
                    referenciels,
                })
            )
            yield put(getLoaderActions.disableGeneraleLoader())

            if (payload && payload.response && !payload.response.dontNavigate) {
                yield put(goBack())
            }
        } else {
            yield put(getAllReferencesActions.getAllReferenceFailure(response))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(
            getAllReferencesActions.getAllReferenceFailure(error.toString())
        )
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAllReferencialSaga() {
    yield takeLatest(
        getAllReferenceTypes.GET_ALL_REFERENCE_REQUEST,
        getAllReferencialSagas
    )
    yield takeLatest(
        getAllReferenceTypes.GET_REFERENCE_BY_PAGINATION_REQUEST,
        getByPaginationReferencialSagas
    )
}
