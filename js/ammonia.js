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
const url = "https://water-initial-test.herokuapp.com/api/post/read_all_amn.php";

let time_array = [];
let ammonia_array = [];

async function getData() {
    let response = await fetch(url);
    let data = await response.json()
    return data
}

const data_amn = {
    labels: time_array,
    datasets: [{
        label: 'Ammonia',
        backgroundColor: 'rgb(0,116,175)',
        borderColor: 'rgb(0,116,175)',
        data: ammonia_array,
    }]
};

let oxy_max = 0.5
let oxy_min = 0

console.log(oxy_max, oxy_min)

const config_oxy = {
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
                    mode: 'x',

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
                        enabled: true,
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
    config_oxy
);


getData().then(data => {

    output = data.data;
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
    ammonia_array = [];

    OxygenChart.destroy();

    async function getData_Refresh() {
        let response = await fetch(url);
        let data = await response.json()
        return data
    }

    getData_Refresh().then(data => {

        output = data.data;
        console.log(output)

        let length = Object.keys(output).length;
        console.log(length);

        for (let i = 0; i < length; i++) {
            time_array.push(output[i].id)
            ammonia_array.push(output[i].oxygen)
        }

        for (let i = 0; i < length; i++) {
            console.log(time_array[i], ammonia_array[i])
        }

        const data_oxy = {
            labels: time_array,
            datasets: [{
                label: 'Ammonia',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: ammonia_array,
            }]
        };

        const config_oxy = {
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
                            mode: 'x',

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
                                enabled: true,
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
        cell.textContent = ammonia_array[i];
        table.appendChild(row);
    }

}





