import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Table from '../../components/ui/table/table'

const NbrDecParTempsTraitement = ({ data, intl }) => {
    /* hook memeber */
    const [rows, setRows] = useState([])
    // const classes = useStyles()
    const headers = [
        {
            id: '00',
            label: 'حالة التصريح',
        },
        {
            id: '0-15',
            label: '15-0 يوم',
        },
        {
            id: '16-30',
            label: '30-16 يوم',
        },
        {
            id: '31-60',
            label: '60-31 يوم',
        },
        {
            id: '60+',
            label: '60+ يوم',
        },
    ]
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred) {
            rowsTmp = Object.keys(arrayFiltred).map(item => ({
                '00': intl.formatMessage({ id: `${item}temps` }),
                '0-15': arrayFiltred[item]['0-15'] || '0',
                '16-30': arrayFiltred[item]['16-30'] || '0',
                '31-60': arrayFiltred[item]['31-60'] || '0',
                '60+': arrayFiltred[item]['60+'] || '0',
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
NbrDecParTempsTraitement.defaultProps = {
    data: null,
}
/**
 *  declaration des props
 */
NbrDecParTempsTraitement.propTypes = {
    intl: PropTypes.string.isRequired,
    data: PropTypes.object,
}

export default connect()(NbrDecParTempsTraitement)
// mapStateToProps,
// mapDispatchToProps
