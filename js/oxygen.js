console.log("Running");

Chart.defaults.beginAtZero = true;
Chart.defaults.color = "#ffffff";

(function () {
    'use strict'
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })
})()


// const url = "http://192.168.0.193/REST_test/api/post/read_all_oxy.php";
const url = "https://water-initial-test.herokuapp.com/api/post/read_all_oxy.php";
let preds_url = "https://flask-ml-test.herokuapp.com/"

let time_array = [];
let oxygen_array = [];
let oxy_preds = [];

async function getData() {
    let response1 = await fetch(url);
    let data = await response1.json()
    let response2 = await fetch(preds_url);
    let preds = await response2.json()
    return [data, preds]
}

const data_oxy = {
    labels: time_array,
    datasets: [{
        label: 'Oxygen',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: oxygen_array,
    }, {
        label: 'Predicted Oxygen Value',
        backgroundColor: 'rgb(255,187,0)',
        borderColor: 'rgb(255,187,0)',
        data: oxy_preds,
    }]
};

let oxy_max = 6
let oxy_min = 0

console.log(oxy_max, oxy_min)

const config_oxy = {
    type: 'line',
    data: data_oxy,
    options: {
        legend: {
            display: false,
        },
        pointRadius: 0.5,
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',

                },
                limits: {
                    y: {
                        max: oxy_max*1.3,
                        min: 0,
                    }
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    drag: {
                        enabled: false,
                    },
                    mode: 'xy',

                }
            }
        },
        scales: {
            y: {
                max: oxy_max*1.25,
                min: 0,
            }
        }
    }
};

var OxygenChart = new Chart(
    document.getElementById('OxygenTable'),
    config_oxy
);


getData().then(data => {

    output = data[0].data;
    console.log(output)

    let length = Object.keys(output).length;
    console.log(length);

    for (let i = (length-1440); i < length; i++) {
        time_array.push(output[i].id)
        oxygen_array.push(output[i].oxygen)
        if (i === length-1)
            oxy_preds.push(output[i].oxygen)
        else
            oxy_preds.push(NaN)
    }

    // oxygen_array.push(NaN)
    // for (let i = 0; i < length; i++) {
    //     time_array.push("Predicted")
    //     oxygen_array.push(data[i].oxygen)
    // }

    time_array.push("Next")
    time_array.push("Next")
    time_array.push("Next")
    time_array.push("Next")
    oxy_preds.push(data[1].Oxygen)
    oxy_preds.push(data[1].Oxygen)
    oxy_preds.push(data[1].Oxygen)
    oxy_preds.push(data[1].Oxygen)

    console.log("Data Lengths", time_array.length, oxygen_array.length)

    for (let i = 0; i < length; i++) {
        console.log(time_array[i], oxygen_array[i])
    }

    OxygenChart.update();

    document.getElementById("refresh").innerHTML = "Refresh Data"

    load_table();

});

function resetZoom() {
    OxygenChart.resetZoom();
}

function refresh() {
    console.log("refreshing")

    time_array = [];
    oxygen_array = [];
    oxy_preds = []

    OxygenChart.destroy();

    async function getData_Refresh() {
        let response1 = await fetch(url);
        let data = await response1.json()
        let response2 = await fetch(preds_url);
        let preds = await response2.json()
        return [data, preds]
    }

    getData_Refresh().then(data => {

        output = data[0].data;
        console.log(output)

        let length = Object.keys(output).length;
        console.log(length);

        for (let i = 0; i < length; i++) {
            time_array.push(output[i].id)
            oxygen_array.push(output[i].oxygen)
            if (i === length-1)
                oxy_preds.push(output[i].oxygen)
            else
                oxy_preds.push(NaN)
        }

        oxygen_array.push(NaN)
        time_array.push("Next")
        time_array.push("Next")
        time_array.push("Next")
        time_array.push("Next")
        oxy_preds.push(data[1].Oxygen)
        oxy_preds.push(data[1].Oxygen)
        oxy_preds.push(data[1].Oxygen)
        oxy_preds.push(data[1].Oxygen)


        for (let i = 0; i < length; i++) {
            console.log(time_array[i], oxygen_array[i])
        }

        const data_oxy = {
            labels: time_array,
            datasets: [{
                label: 'Oxygen',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: oxygen_array,
            }, {
                label: 'Oxygen',
                backgroundColor: 'rgb(255,187,0)',
                borderColor: 'rgb(255,187,0)',
                data: oxy_preds,
            }]
        };

        const config_oxy = {
            type: 'line',
            data: data_oxy,
            options: {
                legend: {
                    display: false,
                },
                pointRadius: 0.5,
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'xy',

                        },
                        limits: {
                            y: {
                                max: oxy_max*1.3,
                                min: 0,
                            }
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            drag: {
                                enabled: false,
                            },
                            mode: 'xy',

                        }
                    }
                },
                scales: {
                    y: {
                        max: oxy_max*1.3,
                        min: 0,
                    }
                }
            }
        };


        OxygenChart = new Chart(
            document.getElementById('OxygenTable'),
            config_oxy
        );

        OxygenChart.update();

        load_table();

        OxygenChart.onZoom = function () {
            console.log("Hello")
        };

        document.getElementById("refresh").innerHTML = "Refresh Data"
    });
}

document.getElementById("refresh").onclick = function() {
    refresh();
}

document.getElementById("resetzoom").onclick = function() {
    resetZoom();
}

setInterval(refresh, 600000);

function load_table() {

    for (let i = 0; i < time_array.length; i++) {
        let table = document.getElementById('oxy-body');
        var row = document.createElement('tr');
        cell = row.insertCell();
        cell.textContent = time_array[i];
        cell = row.insertCell();
        cell.textContent = oxygen_array[i];
        table.appendChild(row);
    }

}





