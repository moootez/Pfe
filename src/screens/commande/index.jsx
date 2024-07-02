import React, { useEffect, useState } from 'react';
import { Divider, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const Index = () => {
    const today = new Date(); // Get today's date

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [startDate, setStartDate] = useState(today); // Initialize with today's date
    const [endDate, setEndDate] = useState(today); // Initialize with today's date

    useEffect(() => {
        const fetchData = async () => {
            try {
                const codeInscription = localStorage.getItem('codeInsc');
                const response = await fetch('http://localhost/opalia/commandeGql.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ codeInsc: codeInscription })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                setTableData(responseData.data.x3Sales.salesOrder.query.edges.map(edge => edge.node));
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setFetchError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    const filteredData = tableData.filter(row => {
        const orderDate = new Date(row.orderDate);
        return (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
    });

    if (loading) return <p>Loading...</p>;
    if (fetchError) return <p>Error: {fetchError.message}</p>;

    return (
        <div className="column col-md-12 style-table">
            <Divider />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="start-date-picker"
                            label="Debut"
                            value={startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="end-date-picker"
                            label="Fin"
                            value={endDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            <MaterialTable
                title="Mes commandes"
                columns={[
                    { title: 'No commande', field: 'id' },
                    { title: 'Date commande', field: 'orderDate' },
                    { title: 'Etat commande', field: 'orderStatus' },
                    { title: 'Livraison', field: 'deliveryStatus' },
                    { title: 'Facture', field: 'invoicedStatus' },
                    { title: 'Montant HT', field: 'linesAmountExcludingTax' }
                ]}
                data={filteredData}
                options={{
                    sorting: true,
                    paging: true,
                    search: true,
                }}
            />
        </div>
    );
};

export default Index;
