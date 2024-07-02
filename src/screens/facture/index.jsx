import React, { useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';
import Table from 'material-table';

const Index = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const codeInscription = localStorage.getItem('codeInsc');

        fetch('http://localhost/opalia/facture.php', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codeInsc: codeInscription})})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                setTableData(responseData.data.x3Sales.salesInvoice.query.edges.map(edge => edge.node));
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setFetchError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (fetchError) return <p>Error: {fetchError.message}</p>;

    return (
        <div className="column col-md-12 style-table">
            <Divider />
            <Table
                title="Factures"
                columns={[
                    { title: 'No facture', field: 'id.id' },
                    { title: 'Date', field: 'invoiceDate' },
                    { title: 'Statut', field: 'status' },
                    { title: 'Catégorie', field: 'category' },
                    { title: 'Site de vente', field: 'salesSite.code' },
                    { title: 'Type de facture', field: 'invoiceType.code' },
                    { title: 'Montant HT', field: 'totalAmountExcludingTax' },
                    { title: 'Montant TTC', field: 'totalAmountIncludingTax' }
                    
                    
                ]}
                data={tableData}
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
