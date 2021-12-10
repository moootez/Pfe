/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
import React, { useState, useEffect, useRef } from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import { removeBottomDash } from '../../shared/utility'
import SimpleTable from '../simpleTable'

const DetailPanelWithRowClick = props => {
    const subDataRef = useRef(null)
    // const [dataSub, setDataSub] = useState(useRef)
    const { apiCall, dataApi, dataReturned, dataSubArray, title } = props

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
        // header.push({ field: 'action', title: 'Action1' })
        setDataTable({
            header,
            data: dataReturned instanceof Array ? dataReturned : [],
            /* .map(
                el => ({ ...el, action: <PictureAsPdfIcon /> })
            ), */
        })
    }, [JSON.stringify(dataReturned)])

    useEffect(() => {
        subDataRef.current = (dataSubArray || {}).dataReturned
    }, [JSON.stringify((dataSubArray || {}).dataReturned)])

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
                    options={{
                        maxBodyHeight: '80vh',
                        headerStyle: { fontSize: 20 },
                    }}
                    dataTable
                    columns={dataTable.header}
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'lignes par page',
                            labelRowsPerPage: 'lignes par page:',
                            firstAriaLabel: 'Première page',
                            firstTooltip: 'Première page',
                            previousAriaLabel: 'Page précédente',
                            previousTooltip: 'Page précédente',
                            nextAriaLabel: 'Page suivante',
                            nextTooltip: 'Page suivante',
                            lastAriaLabel: 'Dernière page',
                            lastTooltip: 'Dernière page',
                        },
                        toolbar: {
                            searchPlaceholder: 'Rechercher',
                        },
                    }}
                    data={dataTable.data}
                    title={title}
                    onRowClick={(event, rowData, togglePanel) => {
                        togglePanel()
                    }}
                    {...detailPanel}
                />
            ) : (
                <h1>Merci de contacter votre webmaster!!</h1>
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
