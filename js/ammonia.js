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


// const url = "http://192.168.0.193/REST_test/api/post/read_all_amn.php";
const url = "https://water-domestic-backend-production.up.railway.app/api/post/read_all_amn.php";
let preds_url = "https://web-production-c673.up.railway.app/"

let time_array = [];
let ammonia_array = [];
let amn_preds = []

async function getData() {
    let response1 = await fetch(url);
    let data = await response1.json()
    let response2 = await fetch(preds_url);
    let preds = await response2.json()
    return [data, preds]
}

const data_amn = {
    labels: time_array,
    datasets: [{
        label: 'Ammonia',
        backgroundColor: 'rgb(0,116,175)',
        borderColor: 'rgb(0,116,175)',
        data: ammonia_array,
    }, {
        label: 'Predicted Ammonia Value',
        backgroundColor: 'rgb(0,255,203)',
        borderColor: 'rgb(0,255,203)',
        data: amn_preds,
    }]
};

let amn_max = 0.5
let amn_min = 0

console.log(amn_max, amn_min)

const config_amn = {
    type: 'line',
    data: data_amn,
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
                        max: amn_max*1.3,
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
                max: amn_max*1.3,
                min: 0,
            }
        }
    }
};

var AmmoniaChart = new Chart(
    document.getElementById('AmmoniaTable'),
    config_amn
);


getData().then(data => {

    output = data[0].data;
    console.log(output)

    let length = Object.keys(output).length;
    console.log(length);

    for (let i = 0; i < length; i++) {
        time_array.push(output[i].id)
        ammonia_array.push(output[i].ammonia)
        if (i === length-1)
            amn_preds.push(output[i].ammonia)
        else
            amn_preds.push(NaN)

    }

    ammonia_array.push(NaN)
    time_array.push("Next")
    time_array.push("Next")
    time_array.push("Next")
    time_array.push("Next")
    amn_preds.push(data[1].Ammonia)
    amn_preds.push(data[1].Ammonia)
    amn_preds.push(data[1].Ammonia)
    amn_preds.push(data[1].Ammonia)

    AmmoniaChart.update();

    document.getElementById("refresh").innerHTML = "Refresh Data"

    load_table();

});

function resetZoom() {
    AmmoniaChart.resetZoom();
}

function refresh() {
    console.log("refreshing")

    time_array = [];
    ammonia_array = [];

    AmmoniaChart.destroy();

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
            ammonia_array.push(output[i].ammonia)
        }

        for (let i = 0; i < length; i++) {
            console.log(time_array[i], ammonia_array[i])
        }

        for (let i = 0; i < length; i++) {
            time_array.push(output[i].id)
            ammonia_array.push(output[i].ammonia)
            if (i === length-1)
                amn_preds.push(output[i].ammonia)
            else
                amn_preds.push(NaN)

        }

        ammonia_array.push(NaN)
        time_array.push("Next")
        time_array.push("Next")
        time_array.push("Next")
        time_array.push("Next")
        amn_preds.push(data[1].Ammonia)
        amn_preds.push(data[1].Ammonia)
        amn_preds.push(data[1].Ammonia)
        amn_preds.push(data[1].Ammonia)

        const config_amn = {
            type: 'line',
            data: data_amn,
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
                                max: amn_max*1.3,
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
                        max: amn_max*1.3,
                        min: 0,
                    }
                }
            }
        };


        AmmoniaChart = new Chart(
            document.getElementById('AmmoniaTable'),
            config_amn
        );

        AmmoniaChart.update();

        load_table();

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
        let table = document.getElementById('amn-body');
        var row = document.createElement('tr');
        cell = row.insertCell();
        cell.textContent = time_array[i];
        cell = row.insertCell();
        cell.textContent = ammonia_array[i];
        table.appendChild(row);
    }

}





