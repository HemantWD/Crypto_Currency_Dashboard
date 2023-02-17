import React, { useEffect, useState } from 'react'
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "right",
            display: true,
            labels: {
                color: "black",
                padding: 20,
                pointStyleWidth: 15,
                usePointStyle: true,
                pointStyle: "circle"
            }
        }
    }
};

export default function Portfolio() {
    const [totalVolume, setTotalVolume] = useState("")
    const [data, setData] = useState({
        labels: ["Red", "Green", "Blue"],
        datasets: [
            {
                label: "# of Votes",
                data: [33, 33, 34],
                backgroundColor: [
                    "rgb(255,99,132)",
                    "rgb(54,162,235)",
                    "rgb(255,206,86)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54,162,235,1)",
                    "rgba(255,206,86,1)",
                ],
                
                borderWidth: 1,

            }
        ]
    });

    useEffect(() => {
        const fetchD = async () => {
            const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cethereum%2Cbitcoin&order=market_cap_desc`
            const labelSet = [];
            const dataSet1 = [];
            await fetch(apiUrl).then((data) => {
                const resp = data.json()
                return resp;
            }).then((resp) => {
                for (const element of resp) {
                    dataSet1.push(element.market_cap);
                    labelSet.push(element.name)
                }
                setData({
                    labels: labelSet,
                    datasets: [
                        {
                            label: dataSet1,
                            data: dataSet1,
                            backgroundColor: ["#0077b6","#ef476f","#00afb9"],
                            borderColor:["white"],
                            borderWidth:0,      
                        }
                    ]
                });
                setTotalVolume(dataSet1.reduce((partialSum, a) => partialSum + a, 0).toFixed(0)
                )
            }).catch((e) => {
                // console.log(e);
            })
        }
        fetchD();
    }, [])


    return (

        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-100 rounded-lg shadow-xl ml-4">
            <div className="mt-3">
                {" "}
                <span className='text-xl font-semibold pt-6 ml-8'>
                    Portfolio{" "}
                </span>
                <span className="text-gray-700 lg:ml-[80px] xl:ml-[120px] text-sm md:ml-[70px] sm:ml-[10px] ml-[50px]">
                    Total Value :
                </span>{" "}
                <span className="text-xs font-semibold   ">
                    {" "}
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "usd",
                    }).format(totalVolume)}
                </span>
            </div>
            <div className="xl:w-[240px] xl:-h[180px] md:w-[240px] xl:ml-[100px] md:ml-[170px] h-[230px] -mt-[15px] ">
                <Pie data={data} options={options}  />
            </div>
            <div className="mt-5"></div>
        </div>

    )
}
