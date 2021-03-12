import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Table from '../../components/ui/table/table'

const NbrInscEnAttente = ({ data }) => {
    /* hook memeber */
    const [rows, setRows] = useState([])
    // const classes = useStyles()
    const headers = [
        {
            id: '0-24',
            label: '24-0 ساعة',
        },
        {
            id: '25-48',
            label: '48-25 ساعة',
        },
        {
            id: '49-72',
            label: '72-49 ساعة',
        },
        {
            id: '72+',
            label: '72+ ساعة',
        },
    ]
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred) {
            rowsTmp = Object.keys(arrayFiltred).map(item => ({
                '0-24': arrayFiltred[item]['0-24'] || '0',
                '25-48': arrayFiltred[item]['25-48'] || '0',
                '49-72': arrayFiltred[item]['49-72'] || '0',
                '72+': arrayFiltred[item]['72+'] || '0',
            }))
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        if (data) setTable(data)
    }, [data])

    /* functions */

    return <Table headers={headers} rowsS={rows} pagination={false} />
}

// const mapDispatchToProps = dispatch => ({
// })

// const mapStateToProps = state => ({
// })
/**
 *  Inialisation
 */
NbrInscEnAttente.defaultProps = {
    data: null,
}
/**
 *  declaration des props
 */
NbrInscEnAttente.propTypes = {
    data: PropTypes.object,
}

export default connect()(NbrInscEnAttente)
// mapStateToProps,
// mapDispatchToProps
