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


const url = "http://192.168.0.193/REST_test/api/post/read_all_oxy.php";
// const url = "https://water-initial-test.herokuapp.com/api/post/read_last_100.php";

let time_array = [];
let oxygen_array = [];

async function getData() {
    let response = await fetch(url);
    let data = await response.json()
    return data
}

const data_oxy = {
    labels: time_array,
    datasets: [{
        label: 'Oxygen',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: oxygen_array,
    }]
};

const config_oxy = {
    type: 'line',
    data: data_oxy,
    options: {
        legend: {
            display: false,
        },
        pointRadius: 1,
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
        oxygen_array.push(output[i].oxygen)
    }

    for (let i = 0; i < length; i++) {
        console.log(time_array[i], oxygen_array[i])
    }

    OxygenChart.update();

    document.getElementById("refresh").innerHTML = "Refresh Data"
});

function refresh() {
    console.log("refreshing")

    time_array = [];
    oxygen_array = [];

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
            oxygen_array.push(output[i].oxygen)
        }

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
            }]
        };

        const config_oxy = {
            type: 'line',
            data: data_oxy,
            options: {
                legend: {
                    display: false,
                },
                pointRadius: 1,
                plugins: {
                    zoom: {
                        pan: {
                            drag: {
                                enabled: true,
                            },
                            mode: 'xy',
                        },
                        limits: {
                            // axis limits
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
                }
            }
        };


        OxygenChart = new Chart(
            document.getElementById('OxygenTable'),
            config_oxy
        );

        OxygenChart.update();

        OxygenChart.onZoom = function () {
            console.log("Hello")
        };

        document.getElementById("refresh").innerHTML = "Refresh Data"
    });
}

document.getElementById("refresh").onclick = function() {
    refresh();
}

setInterval(refresh, 600000);







