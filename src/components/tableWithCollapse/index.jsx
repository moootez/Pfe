/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
import React, { useState, useEffect, useRef } from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import { removeBottomDash } from '../../shared/utility'
import SimpleTable from '../simpleTable'

const DetailPanelWithRowClick = props => {
    const subDataRef = useRef(null)
    // const [dataSub, setDataSub] = useState(useRef)
    const { apiCall, dataApi, dataReturned, dataSubArray } = props

    const [dataTable, setDataTable] = useState({ header: [], data: [] })

    useEffect(() => {
        apiCall(dataApi)
    }, [])

    // Set livraison on state
    useEffect(() => {
        const header = Object.keys(
            dataReturned && dataReturned.length ? dataReturned[0] : {}
        ).map(el => ({
            field: el,
            title: removeBottomDash(el),
        }))
        setDataTable({ header, data: dataReturned || [] })
    }, [JSON.stringify(dataReturned)])

    useEffect(() => {
        subDataRef.current = dataSubArray.dataReturned
    }, [JSON.stringify(dataSubArray.dataReturned)])

    const detailPanel = dataSubArray
        ? {
              detailPanel: rowData => {
                  return (
                      // dataSubArray.dataApi is A function to get useful data from row data
                      <SimpleTable
                          {...rowData}
                          {...dataSubArray}
                          dataApi={dataSubArray.dataApi(rowData)}
                          dataReturned={subDataRef.current}
                      />
                  )
              },
          }
        : {}

    return (
        <>
            {dataTable.header.length && dataTable.data.length ? (
                <MaterialTable
                    columns={dataTable.header}
                    data={dataTable.data}
                    title=""
                    onRowClick={(event, rowData, togglePanel) => {
                        togglePanel()
                    }}
                    {...detailPanel}
                />
            ) : (
                <p className="text-center m-3">Pas de données disponible!!</p>
            )}
        </>
    )
}

DetailPanelWithRowClick.propTypes = {
    dataApi: PropTypes.object.isRequired,
    dataReturned: PropTypes.array.isRequired,
    apiCall: PropTypes.func.isRequired,
    dataSubArray: PropTypes.object,
}

DetailPanelWithRowClick.defaultProps = {
    dataSubArray: null,
}

export default DetailPanelWithRowClick
