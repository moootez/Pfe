import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Table from '../../components/ui/table/table'

const NbrDecTraitees = ({ data, intl }) => {
    /* hook memeber */
    const [rows, setRows] = useState([])
    // const classes = useStyles()
    const headers = [
        {
            id: '00',
            label: 'حالة التصريح',
        },
        {
            id: '01',
            label: 'جانفي',
        },
        {
            id: '02',
            label: 'فيفري',
        },
        {
            id: '03',
            label: 'مارس',
        },
        {
            id: '04',
            label: 'أفريل',
        },
        {
            id: '05',
            label: 'ماي',
        },
        {
            id: '06',
            label: 'جوان',
        },
        {
            id: '07',
            label: 'جويلية',
        },
        {
            id: '08',
            label: 'أوت',
        },
        {
            id: '09',
            label: 'سبتمبر',
        },
        {
            id: '010',
            label: 'أكتوبر',
        },
        {
            id: '011',
            label: 'نوفمبر',
        },
        {
            id: '012',
            label: 'ديسمبر',
        },
    ]
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred) {
            rowsTmp = Object.keys(arrayFiltred).map(item => ({
                '00': intl.formatMessage({ id: `${item}annee` }),
                '01': arrayFiltred[item]['01'] || '0',
                '02': arrayFiltred[item]['02'] || '0',
                '03': arrayFiltred[item]['03'] || '0',
                '04': arrayFiltred[item]['04'] || '0',
                '05': arrayFiltred[item]['05'] || '0',
                '06': arrayFiltred[item]['06'] || '0',
                '07': arrayFiltred[item]['07'] || '0',
                '08': arrayFiltred[item]['08'] || '0',
                '09': arrayFiltred[item]['09'] || '0',
                '010': arrayFiltred[item]['10'] || '0',
                '011': arrayFiltred[item]['11'] || '0',
                '012': arrayFiltred[item]['12'] || '0',
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
NbrDecTraitees.defaultProps = {
    data: null,
}
/**
 *  declaration des props
 */
NbrDecTraitees.propTypes = {
    intl: PropTypes.string.isRequired,
    data: PropTypes.object,
}

export default connect()(NbrDecTraitees)
// mapStateToProps,
// mapDispatchToProps
