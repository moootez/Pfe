import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import getActualiteActions from '../../redux/pageCms/actualite/getActualite'
import './style.css'

const Index = ({ filtredTable, getActualite }) => {
    const [rows, setRows] = useState([])

    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            rowsTmp = arrayFiltred.map((item, index) => ({
                id: item.id,
                index,
                theme: item.texte,
                sujet: item.priorite,
                createdAt: item.createdAt && item.createdAt.substr(0, 11),
            }))
        }
        setRows(rowsTmp)
    }

    useEffect(() => {
        getActualite()
    }, [])

    /* life cycle */
    useEffect(() => {
        if (filtredTable) {
            setTable(filtredTable)
        }
    }, [filtredTable])

    // Calculating animation delay
    useEffect(() => {
        const newsQ = document.getElementById('animation')
        const widthQ = (newsQ || {}).scrollWidth
        const time = widthQ / 50
        ;(
            (newsQ || {}).style || {}
        ).animation = `${time}s linear 1s infinite running news`
    }, [rows])

    return (
        <div className="d-flex line">
            <div className="animation d-flex" id="animation">
                {rows.map(el => (
                    <p className="mr-5">{el.theme}</p>
                ))}
            </div>
        </div>
    )
}

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
    filtredTable: PropTypes.array,
    getActualite: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
