import React from 'react'
import PropTypes from 'prop-types'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExporting3D from 'highcharts/highcharts-3d'

/**
 *
 *
 * @param {*} { graphe, data, filename, categories }
 * @returns
 */
function HighchartsComponent({ graphe, data, filename, categories }) {
    /* hook */
    HighchartsExporting(Highcharts)
    HighchartsExporting3D(Highcharts)

    /* style chart */
    const typeGrahe = { Camembert: 'pie', Barre: 'column' }
    const options = categories
        ? {
              chart: {
                  type: 'column',
                  options3d: {
                      enabled: true,
                      alpha: 5,
                      beta: 13,
                      depth: 70,
                  },
              },

              title: {
                  text: filename,
              },

              xAxis: {
                  categories,
              },

              yAxis: {
                  allowDecimals: false,
                  min: 0,
                  title: {
                      text: null,
                  },
                  scrollbar: {
                      enabled: true,
                  },
              },
              plotOptions: {
                  column: {
                      stacking: 'normal',
                  },
              },

              series: data,
          }
        : typeGrahe[graphe] === 'pie'
        ? {
              chart: {
                  type: typeGrahe[graphe],
                  options3d: {
                      enabled: true,
                      alpha: 50,
                      beta: 0,
                  },
              },
              title: {
                  text: filename,
              },
              accessibility: {
                  point: {
                      valueSuffix: '%',
                  },
              },

              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      depth: 35,
                      dataLabels: {
                          enabled: true,
                          format: '{point.name} : % {point.percentage:.1f} ',
                      },
                  },
              },
              series: [
                  {
                      type: 'pie',
                      data,
                  },
              ],
              exporting: {
                  filename,
              },
          }
        : {
              chart: {
                  type: typeGrahe[graphe],
                  options3d: {
                      enabled: true,
                      alpha: 5,
                      beta: 13,
                      depth: 70,
                  },
              },
              title: {
                  text: filename,
              },
              subtitle: {
                  text: null,
              },
              plotOptions: {
                  column: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      depth: 35,
                      dataLabels: {
                          enabled: true,
                      },
                  },
              },

              xAxis: {
                  type: 'category',
                  labels: {
                      rotation: -45,
                      style: {
                          fontSize: '13px',
                          fontFamily: 'Verdana, sans-serif',
                      },
                  },
                  scrollbar: {
                      enabled: true,
                  },
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: null,
                  },
                  scrollbar: {
                      enabled: true,
                  },
              },

              series: [
                  {
                      data,
                  },
              ],
              exporting: {
                  filename,
              },
          }
    return data && <HighchartsReact highcharts={Highcharts} options={options} />
}
/**
 *  declaration des props
 */
HighchartsComponent.propTypes = {
    graphe: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    filename: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
}

export default HighchartsComponent
