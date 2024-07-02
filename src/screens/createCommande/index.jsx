import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import { Divider, TextField, Button } from '@material-ui/core';
import Actualite from '../pageCms/actualiteCommande';
import addNewCommandeActions from '../../redux/commande/newCommande/index';
import getCommandeActions from '../../redux/commande/getCommande';

const Index = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost/opalia/product.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.log('Received data:', responseData);
                setTableData(responseData.data.x3MasterData.product.query.edges.map(edge => ({
                    ...edge.node,
                    packingUnitToStockUnitConversionFactor: edge.node.packingUnits.query.edges[0]?.node.packingUnitToStockUnitConversionFactor || 0
                })));
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, []);

    const handleQuantityChange = (code, field, value) => {
        const updatedData = tableData.map(item => {
            if (item.code === code) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setTableData(updatedData);
    };

    const getTotalQt = rowData => {
        const qtc = parseInt(rowData.qtc || 0, 10);
        const qtv = parseInt(rowData.qtv || 0, 10);
        const coefUcUs = parseInt(rowData.packingUnitToStockUnitConversionFactor || 0, 10);
        return qtc * coefUcUs + qtv;
    };

    const getTotalPrix = rowData => {
        const prix = parseFloat(rowData.purchaseBasePrice || 0);
        return Math.round(getTotalQt(rowData) * prix * 1000) / 1000;
    };

    const handleSaveFile = () => {
        const dataWithNonZeroQtt = tableData
            .map(item => ({
                ...item,
                qtt: getTotalQt(item)
            }))
            .filter(item => item.qtt > 0);

        const content = dataWithNonZeroQtt.map(item => `${item.code};${item.qtt}`).join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'product_quantities.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleSubmit = () => {
        const produits = tableData.filter(item => getTotalQt(item) > 0).map(item => ({
            Code_PCT: item.code,
            Code_article: item.code,
            Designation: item.description1,
            prix: item.purchaseBasePrice,
            QTY: getTotalQt(item)
        }));

        const user = localStorage.getItem('codeInsc');

        if (produits.length > 0) {
            console.log('produits:', produits);
            console.log('User:', user);
        } else {
            console.log('No items with quantity greater than 0.');
        }

        const commandObject = {
            produits,
            user
        };

        console.log(commandObject);

        dispatch(addNewCommandeActions.addNewCommandeRequest(commandObject));

        // Fetch updated list of commands after adding new one
        dispatch(getCommandeActions.getCommandeRequest({ user, role: 'ROLE_CLIENT' }));  // Adjust payload as needed
    };

    return (
        <Fragment>
            <Actualite />
            <div className="column col-md-12 style-table">
                <Divider />

                <MaterialTable
                    title="Créer une commande"
                    columns={[
                        { title: 'Code Article', field: 'code' },
                        { title: 'Désignation', field: 'description1' },
                        { title: 'Prix', field: 'purchaseBasePrice' },
                        { title: 'Colisage', field: 'packingUnitToStockUnitConversionFactor' },
                        {
                            title: 'Qté en cartons',
                            field: 'qtc',
                            render: rowData => (
                                <div style={{ width: 80 }}>
                                    <TextField
                                        inputProps={{ min: 0 }}
                                        type="number"
                                        key={rowData.code}
                                        id="outlined-size-small"
                                        value={rowData.qtc || ''}
                                        variant="outlined"
                                        size="small"
                                        onChange={e => handleQuantityChange(rowData.code, 'qtc', e.target.value)}
                                    />
                                </div>
                            ),
                        },
                        {
                            title: 'Qté vrac',
                            field: 'qtv',
                            render: rowData => (
                                <div style={{ width: 80 }}>
                                    <TextField
                                        inputProps={{ min: 0 }}
                                        type="number"
                                        key={rowData.code}
                                        id="outlined-size-small"
                                        value={rowData.qtv || ''}
                                        variant="outlined"
                                        size="small"
                                        onChange={e => handleQuantityChange(rowData.code, 'qtv', e.target.value)}
                                    />
                                </div>
                            ),
                        },
                        {
                            title: 'Qté totale',
                            field: 'qtTotal',
                            render: rowData => (
                                <div style={{ width: 80 }}>
                                    <p>{getTotalQt(rowData)}</p>
                                </div>
                            ),
                        },
                        {
                            title: 'Prix total',
                            field: 'prixTotal',
                            render: rowData => (
                                <div style={{ width: 80 }}>
                                    <p>{getTotalPrix(rowData)}</p>
                                </div>
                            ),
                        },
                    ]}
                    data={tableData}
                    options={{
                        sorting: true,
                        paging: true,
                        search: true,
                    }}
                    isLoading={loading}
                />
                <Button variant="contained" color="primary" onClick={handleSaveFile}>
                    Télécharger le fichier
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Enregistrer la commande
                </Button>
            </div>
        </Fragment>
    );
}

export default Index;
