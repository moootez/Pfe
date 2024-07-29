import React from 'react'
import Paper from '@material-ui/core/Paper'
import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    Legend,
    Category,
    Tooltip,
    DataLabel,
    BarSeries,
    LineSeries,
    ColumnSeries,
} from '@syncfusion/ej2-react-charts'
import { lineData, data, columnData } from './weather.ts' // Ensure this path is correct

const Chart = () => {
    const primaryxAxisBar = {
        valueType: 'Category',
        labelRotation: 0,
        labelStyle: {
            color: '#888888',
            size: '8px',
        },
    }

    const primaryyAxisBar = {
        labelFormat: '{value}',
        minimum: 0,
        maximum: 1000,
        interval: 100,
    }

    const primaryxAxisLine = {
        valueType: 'Category',
        labelRotation: 0,
        labelStyle: {
            color: '#888888',
            size: '8px',
        },
    }

    const primaryyAxisLine = {
        labelFormat: '{value}',
        minimum: 100,
        maximum: 500,
        interval: 50,
    }

    const primaryxAxisColumn = {
        valueType: 'Category',
        labelRotation: 0,
        labelStyle: {
            color: '#888888',
            size: '8px',
        },
    }

    const primaryyAxisColumn = {
        labelFormat: '{value}',
        minimum: 0,
        maximum: 25,
        interval: 5,
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            {/* Statistics Section */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}
            >
                <h4 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Tableau de Bord
                </h4>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <div
                    style={{
                        flex: '1',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <Paper
                        style={{
                            padding: '20px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <center>
                            <b>Commandes</b>
                            <span className="font-weight-bold d-block">54</span>
                        </center>
                    </Paper>
                </div>
                <div
                    style={{
                        flex: '1',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <Paper
                        style={{
                            padding: '20px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <center>
                            <b>Commandes livrées</b>
                            <span className="font-weight-bold d-block">51</span>
                        </center>
                    </Paper>
                </div>
                <div
                    style={{
                        flex: '1',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <Paper
                        style={{
                            padding: '20px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <center>
                            <b>Montant factures</b>
                            <span className="font-weight-bold d-block">
                                3961127.412TND
                            </span>
                        </center>
                    </Paper>
                </div>
                <div
                    style={{
                        flex: '1',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <Paper
                        style={{
                            padding: '20px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <center>
                            <b>Montant à régler</b>
                            <span className="font-weight-bold d-block">
                                3749533.832
                            </span>
                        </center>
                    </Paper>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {/* Bar Chart Container */}
                <div
                    style={{
                        flex: '1 1 30%',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <ChartComponent
                        id="bar-chart"
                        primaryXAxis={primaryxAxisBar}
                        primaryYAxis={primaryyAxisBar}
                        title="Les 5 Produits Les Plus Commandés"
                    >
                        <Inject
                            services={[
                                BarSeries,
                                Legend,
                                Tooltip,
                                DataLabel,
                                Category,
                            ]}
                        />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={data}
                                xName="x"
                                yName="y"
                                type="Bar"
                                name="Quantite"
                                marker={{
                                    dataLabel: {
                                        visible: true,
                                        position: 'Top',
                                        font: {
                                            fontWeight: '600',
                                            color: '#000000',
                                        },
                                    },
                                }} // Show data labels with specific styling
                            />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>

                {/* Line Chart Container */}
                <div
                    style={{
                        flex: '1 1 30%',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <ChartComponent
                        id="line-chart"
                        primaryXAxis={primaryxAxisLine}
                        primaryYAxis={primaryyAxisLine}
                        title="Montant TTC"
                    >
                        <Inject
                            services={[
                                LineSeries,
                                Legend,
                                Tooltip,
                                DataLabel,
                                Category,
                            ]}
                        />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={lineData}
                                xName="x"
                                yName="y"
                                width={2}
                                name="Montant TTC"
                                type="Line"
                                fill="#20c997" // Set the color of the line
                                marker={{
                                    visible: true, // Make the markers visible
                                    shape: 'Circle', // Shape of the markers (Circle, Rectangle, etc.)
                                    width: 10, // Width of the markers
                                    height: 10, // Height of the markers
                                    fill: '#20c997', // Set the fill color of the markers to match the line color
                                    border: { color: '#20c997', width: 2 }, // Border color and width
                                    dataLabel: {
                                        visible: true,
                                        position: 'Top',
                                        font: {
                                            fontWeight: '600',
                                            color: '#000000',
                                        },
                                    },
                                }} // Show data labels with specific styling
                            />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>

                {/* Column Chart Container */}
                <div
                    style={{
                        flex: '1 1 30%',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <ChartComponent
                        id="column-chart"
                        primaryXAxis={primaryxAxisColumn}
                        primaryYAxis={primaryyAxisColumn}
                        title="Délai de Réception"
                    >
                        <Inject
                            services={[
                                ColumnSeries,
                                Legend,
                                Tooltip,
                                DataLabel,
                                Category,
                            ]}
                        />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={columnData}
                                xName="x"
                                yName="y"
                                type="Column"
                                name="Delai"
                                marker={{
                                    dataLabel: {
                                        visible: true,
                                        position: 'Top',
                                        font: {
                                            fontWeight: '600',
                                            color: '#000000',
                                        },
                                    },
                                }} // Show data labels with specific styling
                            />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
        </div>
    )
}

export default Chart
