import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function Question4() {

    let Reviews = useSelector((state) => state.Reviews4);

    let biggest = 0; // get Biggest Point in arr to make it in the yAxes

    Reviews.forEach((review) => {
        if (review.Length > biggest) {
            biggest = review.Length;
        }
    });

    let yAxes_Array_Good = [],
        yAxes_Array_Natural = [],
        yAxes_Array_Bad = [];

    for (let index = 0; index < Reviews.length; index++) {
        yAxes_Array_Good.push(Reviews[index].Good);
        yAxes_Array_Natural.push(Reviews[index].Natural);
        yAxes_Array_Bad.push(Reviews[index].Bad);
    }

    return (
        <>
            <div className="p-4 col-xxl-9 col-lg-10 col-sm-12 m-auto">
                <Bar
                    data={{
                        labels: Reviews.map((review, index) => index + 1),
                        datasets: [
                            {
                                label: "Good",
                                data: yAxes_Array_Good,
                                backgroundColor: "Green",
                                barThickness: Reviews.length < 80 ? 18 : 8,
                            },
                            {
                                label: "Neutral",
                                data: yAxes_Array_Natural,
                                backgroundColor: "orange",
                                barThickness: Reviews.length < 80 ? 18 : 8,
                            },
                            {
                                label: "Bad",
                                data: yAxes_Array_Bad,
                                backgroundColor: "red",
                                barThickness: Reviews.length < 80 ? 18 : 8,
                            },
                        ],
                    }}
                    options={{
                        tooltips: {
                            mode: "index",
                            callbacks: {
                                label: function (toolTipItem) {
                                    return "Points: " + toolTipItem.value;
                                },
                            },
                        },
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        color: "cyan",
                                    },
                                    scaleLabel: {
                                        labelString: "Months",
                                        display: true,
                                        fontColor: "blue",
                                        fontSize: 20,
                                    },
                                    ticks: {
                                        fontColor: "green",
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    gridLines: {
                                        color: "cyan",
                                    },
                                    scaleLabel: {
                                        labelString: "Points",
                                        display: true,
                                        fontColor: "blue",
                                        fontSize: 20,
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: "green",
                                    },
                                },
                            ],
                        },
                    }}
                />
            </div>
        </>
    );
}
