"use client";
import {Chart as ChartJS, registerables} from 'chart.js/auto'
import {Bar} from "react-chartjs-2";
import {CategoryScale, Chart} from "chart.js";

export const WeeklyActivity = () =>  {
    const dataset = [65, 59, 80, 81, 56, 55, 40]

    const presets = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Students',
            data: dataset,
            backgroundColor: Array.from({ length: dataset.length }, (_, i) => i % 2 === 0 ? 'rgba(0, 91, 170, 1)' : 'rgba(139, 199, 81, 1)'),
        }]
    };

    Chart.register(...registerables);

    return (
        <>
            <div style={{width: "100vw", height: "300px", paddingLeft: "3rem", paddingRight: "3rem"}}>
                <Bar
                    data={presets}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
            <hr style={{ marginLeft: "5rem", marginRight: "5rem", marginBottom: "4rem", marginTop: "4rem" }} />
            <div style={{width: "100vw", height: "300px", paddingLeft: "3rem", paddingRight: "3rem"}}>
                <Bar
                    data={presets}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
        </>
    )
}