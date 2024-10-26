import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarChartF = ({days}) => {
  return (
    <Bar
            data={{
                labels: days.map((data) => data.date),
                datasets: [
                    {
                        label: `Temperature °F`,
                        data: days.map((data) => data.day.avgtemp_f),
                        backgroundColor: "rgb(134 113 231)",
                        yAxisID: 'y-temp',
                        display: true,
                        borderRadius: 10,
                    },
                    {
                        label: 'Humidity',
                        data: days.map(data => data.day.avghumidity),
                        backgroundColor: "rgb(221 214 254)",
                        borderRadius: 10,
                        yAxisID: "y-humid"
                    }
                ]
            }}
            options={{

                elements: {
                    line: {
                        tension: 0.5,
                    }
                },
                plugins: {
                    title: {
                        text: "Temperature and humidity change - 7 day forecast",
                        font: {
                            family: 'Rubik',
                            size: 18,
                            weight: 'normal'
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: 'black',
                            font: {
                                family: 'Rubik',
                                size: 11,
                                weight: 'normal'
                            }
                        }
                    },
                },
                scales: {
                    'y-temp': {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false,
                            color: "rgb(221 214 254)",
                            width: 4
                        },
                        position: 'left',
                        title: {
                            display: true,
                            text: `Temperature °F`,
                            color: 'black',
                            font: {
                                family: 'Rubik',
                                size: 14,
                                weight: 'normal'
                            }
                        },
                        ticks: {
                            color: "rgb(0 0 0)",
                        }
                    },
                    'y-humid': {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false,
                            color: "rgb(221 214 254)",
                            width: 4
                        },
                        position: 'right',
                        title: {
                            display: true,
                            text: "Humidity",
                            color: 'black',
                            font: {
                                family: 'Rubik',
                                size: 14,
                                weight: 'normal'
                            }
                        },
                        ticks: {
                            color: "rgb(0 0 0)",
                            font: {
                                family: 'Rubik',
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false,
                            color: "rgb(221 214 254)",
                            width: 4
                        },
                        ticks: {
                            color: 'black',
                        }
                    }
                }
            }}
        />
  )
}

export default BarChartF
