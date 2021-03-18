/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useState, useEffect, memo } from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import { removeBottomDash } from '../../shared/utility'
import SimpleTable from '../simpleTable'

const DetailPanelWithRowClick = props => {
    const { apiCall, dataApi, dataReturned, dataSubArray } = props

    const [dataTable, setDataTable] = useState({ header: [], data: [] })

    useEffect(() => {
        apiCall(dataApi)
    }, [])

    // Set livraison on state
    useEffect(() => {
        const header = Object.keys(dataReturned[0]).map(el => ({
            field: el,
            title: removeBottomDash(el),
        }))
        setDataTable({ header, data: dataReturned })
    }, [JSON.stringify(dataReturned)])

    return (
        <MaterialTable
            columns={dataTable.header}
            data={dataTable.data}
            title=""
            detailPanel={rowData => {
                return (
                    // dataSubArray.dataApi is A function to get useful data from row data
                    <SimpleTable
                        {...dataSubArray}
                        dataApi={dataSubArray.dataApi(rowData)}
                    />
                )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
    )
}

DetailPanelWithRowClick.propTypes = {
    dataApi: PropTypes.object.isRequired,
    dataReturned: PropTypes.array.isRequired,
    apiCall: PropTypes.func.isRequired,
    dataSubArray: PropTypes.object,
}

DetailPanelWithRowClick.defaultProps = {
    dataSubArray: {},
}

export default memo(DetailPanelWithRowClick)
