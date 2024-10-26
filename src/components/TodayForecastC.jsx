import React from 'react'
import { Line} from 'react-chartjs-2';

const TodayForecastC = ({currentDay}) => {
    return (
        <Line
            data={{
                labels: currentDay.map((data) => data.time.slice(11)),
                datasets: [
                    {
                        label: 'Temperature °C',
                        data: currentDay.map((data) => data.temp_c),
                        backgroundColor: "rgb(134 113 231)",
                        borderColor: "rgb(221 214 254)",
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
                        text: "Today Forecast",
                        font: {
                            family: 'Rubik',
                            size: 18,
                            weight: '500'
                        }
                    },
                    legend: {
                        labels: {
                            color: 'black',
                            font: {
                                family: 'Rubik',

                            }
                        }
                    },
                },
                scales: {
                    y: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false,
                            color: "rgb(221 214 254)",
                            width: 4
                        },
                        ticks: {
                            color: "black",
                            font: {
                                family: 'Rubik',
                                size: '10',
                                weight: 'normal'
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
                            color: "black",
                            font: {
                                family: 'Rubik',
                                size: 9.1,
                                weight: 'normal'
                            }
                        }
                    }
                }
            }
            }
        />
    )
}

export default TodayForecastC
