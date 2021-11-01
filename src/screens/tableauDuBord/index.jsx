/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Paper from '@material-ui/core/Paper'
import baseUrl from '../../serveur/baseUrl'
import SliderDash2 from '../../assets/images/banner-dash1.gif'
import SliderDash1 from '../../assets/images/banner-dash2.gif'
import SliderDash3 from '../../assets/images/banner-dash3.gif'
import SliderDash4 from '../../assets/images/banner-dash4.gif'
// Import Swiper styles
import 'swiper/swiper.scss'

const apiConsumer = [
    { endPoint: `dashbord/list/kpi/${localStorage.codeInsc}`, name: 'total' },
    { endPoint: `dashbord/list/top5/${localStorage.codeInsc}`, name: 'top5' },
    {
        endPoint: `dashbord/list/montant-ttc-mois/${localStorage.codeInsc}`,
        name: 'montant',
    },
    {
        endPoint: `dashbord/list/delai-reception/${localStorage.codeInsc}`,
        name: 'delai',
    },
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
        <Fragment>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={swiper => console.log(swiper)}
                className="slider_dash"
            >
                <SwiperSlide>
                    <img src={SliderDash1} alt="slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={SliderDash2} alt="slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={SliderDash3} alt="slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={SliderDash4} alt="slider" />
                </SwiperSlide>
            </Swiper>
            <div className="blc-cnt-dash">
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <div className="box-top-dash">
                            <Paper className="p-3">
                                <center>
                                    <b>Commandes</b>
                                    <span className="font-weight-bold d-block">
                                        {state.total.Nombre_commandes}
                                    </span>{' '}
                                </center>
                            </Paper>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="box-top-dash">
                            <Paper className="p-3">
                                <center>
                                    <b>Commandes livrées</b>
                                    <span className="font-weight-bold d-block">
                                        {state.total.Nombre_commandes_livrees}
                                    </span>{' '}
                                </center>
                            </Paper>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="box-top-dash">
                            <Paper className="p-3">
                                <center>
                                    <b>Montants facture</b>
                                    <span className="font-weight-bold d-block">
                                        {
                                            state.total
                                                .Montant_facture_annee_en_cours
                                        }
                                    </span>{' '}
                                </center>
                            </Paper>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="box-top-dash">
                            <Paper className="p-3">
                                <center>
                                    <b>Montants à régler</b>
                                    <span className="font-weight-bold d-block">
                                        {state.total.Montant_a_regler}
                                    </span>{' '}
                                </center>
                            </Paper>
                        </div>
                    </div>
                    <div className="col-md-6 p-3">
                        <div className="box-charts">
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
                                        categories: (state.top5 || {})
                                            .categories,
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
                                    series: [
                                        { data: (state.top5 || {}).data || [] },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 p-3">
                        <div className="box-charts">
                            <HighchartsReact
                                highcharts={Highcharts || {}}
                                options={{
                                    chart: {
                                        type: 'spline',
                                    },
                                    title: {
                                        text: 'Montant TTC mois',
                                    },
                                    xAxis: {
                                        categories: (state.montant || []).map(
                                            el => el[0]
                                        ),
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
                                            data: (state.montant || []).map(
                                                el => el[1]
                                            ),
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 p-3">
                        <div className="box-charts">
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
                                        categories: (state.delai || []).map(
                                            el => el[0]
                                        ),
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
                                            data: (state.delai || []).map(
                                                el => el[1]
                                            ),
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default index
