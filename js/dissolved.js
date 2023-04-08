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


// const url = "http://192.168.0.193/REST_test/api/post/read_all_diss.php";
const url = "https://water-domestic-backend-production.up.railway.app/api/post/read_all_diss.php";
let preds_url = "https://web-production-c673.up.railway.app/"

let time_array = [];
let diss_array = [];
let diss_preds = []

async function getData() {
    let response1 = await fetch(url);
    let data = await response1.json()
    let response2 = await fetch(preds_url);
    let preds = await response2.json()
    return [data, preds]
}

const data_diss = {
    labels: time_array,
    datasets: [{
        label: 'Dissolved Oxygen',
        backgroundColor: 'rgb(6,128,0)',
        borderColor: 'rgb(6,128,0)',
        data: diss_array,
    }, {
        label: 'Predicted Dissolved Oxygen Value',
        backgroundColor: 'rgb(140,255,142)',
        borderColor: 'rgb(140,255,142)',
        data: diss_preds,
    }]
};

let oxy_max = 14
let oxy_min = 0

console.log(oxy_max, oxy_min)

const config_diss = {
    type: 'line',
    data: data_diss,
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

var OxygenChart = new Chart(
    document.getElementById('OxygenTable'),
    config_diss
);


getData().then(data => {

    output = data[0].data;
    console.log(output)

    let length = Object.keys(output).length;
    console.log(length);

    for (let i = 0; i < length; i++) {
        time_array.push(output[i].id)
        diss_array.push(output[i].Dissolved)
        if (i === length-1)
            diss_preds.push(output[i].Dissolved)
        else
            diss_preds.push(NaN)

    }

    diss_array.push(NaN)
    time_array.push("Next")
    time_array.push("Next")
    time_array.push("Next")
    time_array.push("Next")
    diss_preds.push(data[1].Dissolved)
    diss_preds.push(data[1].Dissolved)
    diss_preds.push(data[1].Dissolved)
    diss_preds.push(data[1].Dissolved)

    for (let i = 0; i < length; i++) {
        console.log(time_array[i], diss_array[i])
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
    diss_array = [];
    diss_preds = [];

    OxygenChart.destroy();

    async function getData_Refresh() {
        let response = await fetch(url);
        let data = await response.json()
        return data
    }

    getData_Refresh().then(data => {

        output = data[0].data;
        console.log(output)

        let length = Object.keys(output).length;
        console.log(length);

        for (let i = 0; i < length; i++) {
            time_array.push(output[i].id)
            diss_array.push(output[i].Dissolved)
            if (i === length-1)
                diss_preds.push(output[i].Dissolved)
            else
                diss_preds.push(NaN)
        }

        oxygen_array.push(NaN)
        time_array.push("Next")
        time_array.push("Next")
        time_array.push("Next")
        time_array.push("Next")
        diss_preds.push(data[1].Dissolved)
        diss_preds.push(data[1].Dissolved)
        diss_preds.push(data[1].Dissolved)
        diss_preds.push(data[1].Dissolved)

        for (let i = 0; i < length; i++) {
            console.log(time_array[i], diss_array[i])
        }

        const data_oxy = {
            labels: time_array,
            datasets: [{
                label: 'Dissolved Oxygen',
                backgroundColor: 'rgb(6,128,0))',
                borderColor: 'rgb(6,128,0)',
                data: diss_array,
            }, {
                label: 'Predicted Dissolved Oxygen Value',
                backgroundColor: 'rgb(140,255,142)',
                borderColor: 'rgb(140,255,142)',
                data: diss_preds,
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
        cell.textContent = diss_array[i];
        table.appendChild(row);
    }

}





