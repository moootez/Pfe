/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
import React, { useState, useEffect, useRef } from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import SimpleTable from '../simpleTable'
import DateField from '../ui/datePicker'
import SelectList from '../ui/select'

const useStyles = makeStyles(theme => ({
    txt: {
        marginLeft: '20%',
        fontWeight: 'bold',
        color: '#000',
    },
}))
const DetailPanelWithRowClick = props => {
    const subDataRef = useRef(null)
    // const [dataSub, setDataSub] = useState(useRef)
    const {
        apiCall,
        dataApi,
        dataReturned,
        dataSubArray,
        title,
        headerTable,
        userID,
        listGrossiste,
    } = props
    const [dataTable, setDataTable] = useState({ header: [], data: [] })
    const [allList, setAllList] = useState(0)
    const [dateDebut, setDateDebut] = useState(null)
    const [dateFin, setDateFin] = useState(null)
    const [value, setValue] = useState(null)
    const [valueGrossiste, setValueGrossiste] = useState(null)

    useEffect(() => {
        apiCall(dataApi)
        setValueGrossiste(userID)
    }, [])

    // Set livraison on state
    useEffect(() => {
        if (dataReturned) {
            setDataTable({
                header: headerTable,
                data: dataReturned instanceof Array ? dataReturned : [],
            })
        }
    }, [JSON.stringify(dataReturned)])

    useEffect(() => {
        if (dataTable.data !== null) setAllList(dataTable.data.length)
    }, [dataTable])

    useEffect(() => {
        subDataRef.current = (dataSubArray || {}).dataReturned
    }, [JSON.stringify((dataSubArray || {}).dataReturned)])

    const fieldChangedHandler = (e, name) => {
        if (name === 'de') {
            setDateDebut(e.target.value)
            if (dateFin) {
                apiCall({
                    user: valueGrossiste,
                    dateDebut: e.target.value,
                    dateFin,
                })
            } else
                apiCall({
                    user: valueGrossiste,
                    dateDebut: e.target.value,
                    dateFin: null,
                })
        } else {
            setDateFin(e.target.value)
            if (dateDebut) {
                apiCall({
                    user: valueGrossiste,
                    dateFin: e.target.value,
                    dateDebut,
                })
            } else
                apiCall({
                    user: valueGrossiste,
                    dateFin: e.target.value,
                    dateDebut: null,
                })
        }
        setDataTable({
            header: headerTable,
            data: dataReturned instanceof Array ? dataReturned : [],
        })
    }

    const onSelect = e => {
        setValue(e.target.value)
        const user = listGrossiste.filter(
            element => element.value === e.target.value
        )
        if (user.length) {
            setValueGrossiste(user[0].codeInsc)
            apiCall({ user: user[0].codeInsc, dateFin, dateDebut })
        }
    }

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
            <div className="row">
                {(title === 'Mes commandes' ||
                    title === 'Historique Commande') && (
                    <>
                        {title === 'Historique Commande' && (
                            <div className="col-md-3 col-sm-6">
                                <SelectList
                                    onchange={e => {
                                        onSelect(e)
                                    }}
                                    name="select"
                                    label="Selectionner grossiste"
                                    list={listGrossiste}
                                    selectedItem={value}
                                />
                            </div>
                        )}
                        <div className="col-md-3 col-sm-6">
                            <DateField
                                key="de"
                                id="de"
                                onchange={e => fieldChangedHandler(e, 'de')}
                                defaultValue={dateDebut}
                                name="de"
                                label="Date début"
                                isArabic={false}
                                attributes={{
                                    disableFuture: false,
                                }}
                                required={false}
                            />
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <DateField
                                key="a"
                                id="a"
                                onchange={e => fieldChangedHandler(e, 'a')}
                                defaultValue={dateFin}
                                name="a"
                                label="Date fin"
                                isArabic={false}
                                attributes={{
                                    disableFuture: false,
                                }}
                                required={false}
                            />
                        </div>
                    </>
                )}
            </div>
            <br />
            <MaterialTable
                options={{
                    maxBodyHeight: '80vh',
                    headerStyle: { fontSize: 20 },
                    pageSizeOptions: [
                        5,
                        10,
                        20,
                        { value: allList, label: 'Afficher Tous' },
                    ],
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
