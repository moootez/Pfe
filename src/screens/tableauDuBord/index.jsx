/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import Paper from '@material-ui/core/Paper'
import baseUrl from '../../serveur/baseUrl'

const apiConsumer = [
    { endPoint: 'dashbord/list/kpi', name: 'total' },
    { endPoint: 'dashbord/list/top5', name: 'top5' },
    { endPoint: 'dashbord/list/montant-ttc-mois', name: 'montant' },
    { endPoint: 'dashbord/list/delai-reception', name: 'delai' },
]

const consumeAPI = (endPoint, setState, state, name) => {
    axios({
        method: 'post',
        url: `${baseUrl}${endPoint}`,
        headers: {
            'Accept-Version': 1,
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
        },
        timeout: 3000,
    })
        .then(res => {
            setState(old => ({ ...old, [name]: res.data }))
        })
        .catch(e => console.error(e))
}

const index = () => {
    const [state, setState] = useState({ total: {} })

    useEffect(() => {
        apiConsumer.forEach(el =>
            consumeAPI(el.endPoint, setState, state, el.name)
        )
    }, [])

    return (
        <div className="row p-5">
            <div className="col-3">
                <Paper className="p-3">
                    <center>
                        <b>Commandes</b>
                        <span className="font-weight-bold d-block" Style="color: #cd121a;  font-size: 30px;">
                            {state.total.Nombre_commandes}
                        </span>{' '}</center>
                </Paper>
            </div>
            <div className="col-3">
                <Paper className="p-3">
                    <center>
                        <b>Commandes livrées</b>
                        <span className="font-weight-bold d-block" Style="color: #cd121a;  font-size: 30px;">
                            {state.total.Nombre_commandes_livrees}
                        </span>{' '}
                    </center>
                </Paper>
            </div>
            <div className="col-3">

                <Paper className="p-3">
                    <center>
                        <b>Montant facture</b>
                        <span className="font-weight-bold d-block" Style="color: #cd121a;  font-size: 30px;">
                            {state.total.Montant_facture_annee_en_cours}
                        </span>{' '}</center>

                </Paper>
            </div>
            <div className="col-3">
                <Paper className="p-3">
                    <center>
                        <b>Montant a régler</b>
                        <span className="font-weight-bold d-block" Style="color: #cd121a;  font-size: 30px;">
                            {state.total.Montant_a_regler}
                        </span>{' '}
                    </center>
                </Paper>
            </div>
            <div className="col-6 p-3">
                <HighchartsReact
                    highcharts={Highcharts || {}}
                    options={{
                        chart: {
                            type: 'bar',
                        },
                        title: {
                            text: 'TOP 5',
                        },
                        xAxis: {
                            categories: (state.top5 || {}).categories,
                            // title: {
                            //     text: null
                            // }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Quantité',
                                align: 'high',
                            },
                            labels: {
                                overflow: 'justify',
                            },
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true,
                                },
                            },
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -40,
                            y: 80,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor:
                                Highcharts.defaultOptions.legend
                                    .backgroundColor || '#FFFFFF',
                            shadow: true,
                        },

                        credits: {
                            enabled: false,
                        },
                        series: [{ data: (state.top5 || {}).data || [] }],
                    }}
                />
            </div>
            <div className="col-6 p-3">
                <HighchartsReact
                    highcharts={Highcharts || {}}
                    options={{
                        chart: {
                            type: 'column',
                        },
                        title: {
                            text: 'Montant TTC mois',
                        },
                        xAxis: {
                            categories: (state.montant || []).map(el => el[0]),
                            crosshair: true,
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '(TTC)',
                            },
                        },
                        tooltip: {
                            headerFormat:
                                '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat:
                                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true,
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0,
                            },
                        },
                        series: [
                            {
                                data: (state.montant || []).map(el => el[1]),
                            },
                        ],
                    }}
                />
            </div>
            <div className="col-6 p-3">
                <HighchartsReact
                    highcharts={Highcharts || {}}
                    options={{
                        chart: {
                            type: 'column',
                        },
                        title: {
                            text: 'Delai de reception',
                        },
                        xAxis: {
                            categories: (state.delai || []).map(el => el[0]),
                            crosshair: true,
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '(Jours)',
                            },
                        },
                        tooltip: {
                            headerFormat:
                                '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat:
                                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true,
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0,
                            },
                        },
                        series: [
                            {
                                data: (state.delai || []).map(el => el[1]),
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default index
