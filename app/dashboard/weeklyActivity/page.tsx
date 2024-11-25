"use client";

import { Chart as ChartJS, registerables } from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import React from "react";

function generatedDays(length: number): string[] {
    const now = new Date();
    return Array.from({ length: length }, (_, i) => {
        const date = new Date(now);
        date.setDate(now.getDate() - (89 - i));
        return date.toISOString().split('T')[0];
    });
}

const WeeklyActivity: React.FC = () => {
    const [firstBarRange, setFirstBarRange] = React.useState<number[]>([0, 30]);
    const [secondBarRange, setSecondBarRange] = React.useState<number[]>([0, 7]);

    // Date generated labels
    const generated90dayLabels = generatedDays(90);
    const generated7dayLabels = generatedDays(21);

    // Generated data
    const sim90Days = Array.from({ length: 90 }, () => Math.floor(Math.random() * 100));
    const sim7Days = Array.from({ length: 21 }, () => Math.floor(Math.random() * 100));

    // Data for first bar
    const presets = {
        labels: generated7dayLabels.slice(secondBarRange[0], secondBarRange[1]),
        datasets: [{
            label: 'Students',
            data: sim7Days.slice(secondBarRange[0], secondBarRange[1]),
            backgroundColor: Array.from({ length: sim7Days.length }, (_, i) => i % 2 === 0 ? 'rgba(0, 91, 170, 1)' : 'rgba(139, 199, 81, 1)'),
        }]
    };

    // Data for second bar
    const data2 = {
        labels: generated90dayLabels.slice(firstBarRange[0], firstBarRange[1]),
        datasets: [
            {
                label: 'Data for last 90 days',
                data: sim90Days.slice(firstBarRange[0], firstBarRange[1]), // Replace with your actual data
                backgroundColor: Array.from({ length: sim90Days.slice(firstBarRange[0], firstBarRange[1]).length }, (_, i) => i % 2 === 0 ? 'rgba(0, 91, 170, 1)' : 'rgba(139, 199, 81, 1)'),
                barThickness: 8, // Moved here if needed
            },
        ],
    };

    ChartJS.register(...registerables);

    return (
        <>
            <div style={{ width: "100vw", height: "300px", paddingLeft: "3rem", paddingRight: "3rem" }}>
                <h5 style={{ textAlign: "left" }}>
                    <span onClick={() => setSecondBarRange([secondBarRange[0] + 7, secondBarRange[1] + 7])} style={{
                        display: "inline-block",
                        marginRight: "5px",
                        backgroundColor: "white",
                        paddingLeft: ".25rem",
                        paddingRight: ".25rem",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        ‹
                    </span>
                    <span onClick={() => setSecondBarRange([secondBarRange[0] - 7, secondBarRange[1] - 7])} style={{
                        display: "inline-block",
                        marginRight: "5px",
                        backgroundColor: "white",
                        paddingLeft: ".25rem",
                        paddingRight: ".25rem",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        ›
                    </span>
                    7 Days
                </h5>
                <Bar
                    data={presets}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: true,
                                text: 'Bar Chart of Last 7 Days',
                            },
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number of students',
                                },
                            }
                        }
                    }}
                />
            </div>
            <hr style={{ marginLeft: "5rem", marginRight: "5rem", marginBottom: "4rem", marginTop: "4rem" }} />
            <div style={{ width: "100vw", height: "300px", paddingLeft: "3rem", paddingRight: "3rem" }}>
                <h5 style={{ textAlign: "left" }}>
                    <span onClick={() => setFirstBarRange([firstBarRange[0] + 30, firstBarRange[1] + 30])} style={{
                        display: "inline-block",
                        marginRight: "5px",
                        backgroundColor: "white",
                        paddingLeft: ".25rem",
                        paddingRight: ".25rem",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        ‹
                    </span>
                    <span onClick={() => setFirstBarRange([firstBarRange[0] - 30, firstBarRange[1] - 30])} style={{
                        display: "inline-block",
                        marginRight: "5px",
                        backgroundColor: "white",
                        paddingLeft: ".25rem",
                        paddingRight: ".25rem",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        ›
                    </span>
                    30 Days
                </h5>
                <Bar
                    data={data2}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                display: false, // If you want to hide it, otherwise set to true
                            },
                            title: {
                                display: true,
                                text: 'Bar Chart of Last 30 Days',
                            },
                        },
                        scales: {
                            x: {
                                type: 'category',
                                ticks: {
                                    maxTicksLimit: 10, // Limit the number of ticks to avoid clutter
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number of students',
                                },
                            }
                        },
                    }}
                />
            </div>
        </>
    );
}

export default WeeklyActivity;
