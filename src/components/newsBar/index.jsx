/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import './style.css'

const { ActualitesAll } = window.localStorage
const Index = ({ filtredTable }) => {
    const [rows, setRows] = useState([])

    const setTable = arrayFiltred => {
        let rowsTmp = []
        const table = arrayFiltred.ActualitesAll

        if (table && table.length > 0) {
            rowsTmp = JSON.parse(table).map((item, index) => ({
                id: item.id,
                index,
                theme: item.texte,
                sujet: item.priorite,
                createdAt: item.createdAt && item.createdAt.substr(0, 11),
            }))
        }
        setRows(rowsTmp)
    }

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
            ; (
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
        filtredTable: { ActualitesAll },
        role: state.login.response.User.details.userRoles[0].role,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = ({
    getActualite: { ActualitesAll },
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
    filtredTable: PropTypes.array
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
