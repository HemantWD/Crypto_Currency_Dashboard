import React, { useContext, useEffect, useState } from 'react'
import { CryptoContext } from '../Context/Context'
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function Charts() {
    const { currency, cryptoId } = useContext(CryptoContext)
    const [days, setDays] = useState(2)
    const [id, setId] = useState("bitcoin")
    const [interval, setInterval] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartType, setChartType] = useState("Line Chart")


    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`
        ).then((response) => {
            const resp = response.json();
            resp.then((data) => {
                setChartData(data.prices)
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days, id, currency])

    const ChartData = chartData.map((value) => ({
        x: value[0],
        y: value[1].toFixed(2)
    }))

    // Function here is used to Sort the Graph, Daily, Weekly, Monthly, Yearly
    function oneDay() {
        setInterval((preIterval) => "hourly");
        setDays((preDays) => 1)
    }
    function oneWeek() {
        setInterval((preIterval) => "daily");
        setDays((preDays) => 7)
    }
    function oneMonth() {
        setInterval((preIterval) => "daily");
        setDays((preDays) => 30)
    }
    function sixMonth() {
        setInterval((preIterval) => "monthly");
        setDays((preDays) => 180)
    }
    function oneYear() {
        setInterval((preIterval) => "yearly");
        setDays((preDays) => 365)
    }


    return (

        <div className="container-fluid w-full h-120 border  border-gray-100 bg-opacity-10 backdrop-blur-md my-5 rounded-lg px-4 pt-3 lg:mt-3">
            <div className="text-black flex ml-4 py-0 pt-20 absolute text-md">
                {currency.toUpperCase()}
            </div>
            <div className="flex lg:gap-3 absolute items-center lg:ml-48 md:ml-16 sm:ml-28 ml-16 gap-2 lg:left-34 left-4 md:mt-3 lg:mt-3 sm:mt-3 mt-3">
                {/* Created Buttons For the Sorting of Graph */}
                <button value={1} className={`px-3 py-1.5 ${days === 1 ? "border-black" : ""} rounded-md text-xs bg-gray-100 backdrop-blur-md font-semibold lg:mt-2 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`} onClick={oneDay}>
                    1D
                </button>
                <button value={7} className={`px-3 py-1.5 ${days === 7 ? "border-black" : ""} rounded-md text-xs bg-gray-100 backdrop-blur-md font-semibold lg:mt-2 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`} onClick={oneWeek}>
                    1W
                </button>
                <button value={30} className={`px-3 py-1.5 ${days === 30 ? "border-black" : ""} rounded-md text-xs bg-gray-100 backdrop-blur-md font-semibold lg:mt-2 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`} onClick={oneMonth}>
                    1M
                </button>
                <button value={180} className={`px-3 py-1.5 ${days === 180 ? "border-black" : ""} rounded-md text-xs bg-gray-100 backdrop-blur-md font-semibold lg:mt-2 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`} onClick={sixMonth}>
                    6M
                </button>
                <button value={365} className={`px-3 py-1.5 ${days === 365 ? "border-black" : ""} rounded-md text-xs bg-gray-100 backdrop-blur-md font-semibold lg:mt-2 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`} onClick={oneYear}>
                    1Y
                </button>
                <div className="flex absolute items-center rounded-md bg-gray-100 backdrop-blur-md p-2 w-24  lg:left-[35rem] lg:mt-4 md:left-[25rem] md:mt-4 sm:right-[9rem] mt-20 ml-2">
                    <select onChange={(x) => { setId(x.target.value) }} className="w-full bg-transparent text-transform:capitalize outline-none -mr-2" >

                        {cryptoId && Object.values(cryptoId).map((d, k) => (
                            <option key={k} value={d.id} name={d.name} className="text-gray-600">{d.id.charAt(0).toUpperCase() + d.id.slice(1)}</option>
                        ))}
                    </select>

                    <div className="rounded-md bg-gray-100 backdrop-blur-md p-2 absolute lg:left-[6rem] md:left-[6rem] left-[6rem] w-28 ml-5">
                        <select className='bg-transparent outline-none w-full sm:justify-center' onChange={(x) => setChartType(x.target.value)}>

                            <option value={`BarChartH`} className="text-gray-600" >Bar Chart Horizontal </option>
                            <option value={`LineChart`} className="text-gray-600">Line Chart</option>
                            <option value={`BarChartV`} className="text-gray-600">Bar Chart Vertical</option>
                        </select>
                    </div>
                </div>
            </div>
            {chartType === "LineChart" ? (
                <div className="row-mx-2">
                    <div className="w-full h-[300px] my-8 mt-16 px-2">
                        <Line height={500} datasetIdKey="id" data={{
                            labels: ChartData.map((element) => {
                                let date = new Date(element.x)
                                let time = date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                                    : `${date.getHours()}:${date.getMinutes()}AM`;
                                return days === 1 ? time : date.toLocaleDateString("default", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })
                            }),
                            datasets: [{
                                spanGaps: true,
                                id: 1,
                                borderColor: "#183bca",
                                backgroundColor: "#183bca",
                                pointBorderColor: "transparent",
                                pointBorderWidth: 3,
                                pointRadius: 3,
                                label: `${id} in ${currency}`,
                                data: ChartData.map((element) => element.y)
                            },
                            ],
                        }}
                            options={{
                                color: "black",
                                responsive: true,
                                indexAxis: "x",
                                tension: 0.01,
                                scales: {
                                    x: {
                                        grid: {
                                            drawBorder: false,
                                            border: false,
                                            borderDash: [6],
                                            display: false,
                                        },
                                        ticks: {
                                            source: "auto",
                                            maxTicksLimit: 10,
                                            font: {
                                                color: "black",
                                            },
                                            size: "10px",
                                        },
                                    },
                                    y: {
                                        grid: {
                                            border: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            color: "black",
                                        }
                                    },
                                },
                                plugins: {
                                    tooltip: {
                                        displayColors: false,
                                        backgroundColor: "gray",
                                    },
                                    legend: {
                                        align: "end",
                                        display: true,
                                        labels: {
                                            padding: 2,
                                            pointStyleWidth: 15,
                                            usePointStyle: true,
                                            pointStyle: "circle",
                                        },
                                    },
                                    title: {
                                        display: true,
                                    },
                                },
                                maintainAspectRatio: false,
                            }}
                        ></Line>

                    </div>
                </div>
            ) : chartType === "BarChartV" ? (
                <div className="row mx-2">
                    <div
                        className="w-full h-[400px] my-10 px-2 mt-16"
                        style={{ height: 290 }}
                    >
                        <Bar
                            data={{
                                labels: ChartData.map((element) => {
                                    let date = new Date(element.x);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                                            : `${date.getHours()}:${date.getMinutes()}AM`;
                                    return days === 1 ? time : date.toLocaleDateString("default", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    });
                                }),
                                datasets: [
                                    {
                                        label: `${id} in ${currency}`,
                                        data: ChartData.map((element) => element.y),
                                        borderColor: "#F9A890",
                                        backgroundColor: "#F9A890",
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                indexAxis: "x",
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            maxTicksLimit: 10,
                                            color: "black",
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            color: "black",
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: true,
                                        align: "end",
                                        labels: {
                                            color: "black",
                                            pointStyleWidth: 15,
                                            usePointStyle: true,
                                            pointStyle: "circle",
                                            padding: 5,
                                        },
                                    },
                                    title: {
                                        display: true,
                                    },
                                },
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className="row mx-2">
                    <div
                        className="w-full h-[300px] my-10 px-8 mt-16"
                        style={{ height: 290 }}
                    >
                        <Bar
                            data={{
                                labels: ChartData.map((element) => {
                                    let date = new Date(element.x);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                                            : `${date.getHours()}:${date.getMinutes()}AM`;
                                    return days === 1 ? time : date.toLocaleDateString("default", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    });
                                }),
                                datasets: [
                                    {
                                        label: `${id} in ${currency}`,
                                        data: ChartData.map((element) => element.y),
                                        borderColor: "#EB90F9",
                                        backgroundColor: "#EB90F9",
                                    },
                                ],
                            }}
                            options={{
                                indexAxis: "y",
                                elements: {
                                    bar: {
                                        borderWidth: 2,
                                    },
                                },
                                responsive: true,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            color: "black",
                                        }
                                    },
                                    y: {
                                        ticks: {
                                            color: "black",
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: true,
                                        align: "end",
                                        labels: {
                                            color: "black",
                                            pointStyleWidth: 15,
                                            usePointStyle: true,
                                            pointStyle: "circle",
                                            padding: 4,
                                        },
                                    },
                                    title: {
                                        display: true,
                                    },
                                },
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
