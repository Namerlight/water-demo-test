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


const url = "http://192.168.0.193/REST_test/api/post/read_last_100.php";
// const url = "https://water-initial-test.herokuapp.com/api/post/read_last_100.php";

let time_array = [];
let oxygen_array = [];
let ammonia_array = [];
let ph_array =[];
let dissolved_array = [];

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

let data_amn = {
    labels: time_array,
    datasets: [{
        label: 'Ammonia and Nitrogen',
        backgroundColor: 'rgb(0,116,175)',
        borderColor: 'rgb(0,116,175)',
        data: ammonia_array,
    }]
};

let config_amn = {
    type: 'line',
    data: data_amn,
    options: {
        legend: {
            display: false,
        },
        pointRadius: 1,
    }
};

let AmmoniaChart = new Chart(
    document.getElementById('AmmoniaTable'),
    config_amn
);

let data_ph = {
    labels: time_array,
    datasets: [{
        label: 'pH',
        backgroundColor: 'rgb(255,255,255)',
        borderColor: 'rgb(255,255,255)',
        data: ph_array,
    }]
};

let config_ph = {
    type: 'line',
    data: data_ph,
    options: {
        legend: {
            display: false,
        },
        pointRadius: 1,
    }
};

let PHChart = new Chart(
    document.getElementById('PHTable'),
    config_ph
);

let data_diss = {
    labels: time_array,
    datasets: [{
        label: 'Dissolved Oxygen',
        backgroundColor: 'rgb(6,128,0)',
        borderColor: 'rgb(6,128,0)',
        data: dissolved_array,
    }]
};

let config_diss = {
    type: 'line',
    data: data_diss,
    options: {
        legend: {
            display: false,
        },
        pointRadius: 1,
    }
};

let DissolvedChart = new Chart(
    document.getElementById('DissolvedTable'),
    config_diss
);

getData().then(data => {

    output = data.data;
    console.log(output)

    let length = Object.keys(output).length;
    console.log(length);

    for (let i = 0; i < length; i++) {
        time_array.push(output[i].id)
        oxygen_array.push(output[i].oxygen)
        ammonia_array.push(output[i].ammonia)
        ph_array.push(output[i].ph)
        dissolved_array.push(output[i].dissolved)
    }

    for (let i = 0; i < length; i++) {
        console.log(time_array[i], oxygen_array[i], ammonia_array[i], ph_array[i], dissolved_array[i])
    }

    OxygenChart.update();
    AmmoniaChart.update();
    PHChart.update();
    DissolvedChart.update();

    document.getElementById("refresh").innerHTML = "Refresh Data"
});

function refresh() {
    console.log("refreshing")

    time_array = [];
    oxygen_array = [];
    ammonia_array = [];
    ph_array =[];
    dissolved_array = [];

    OxygenChart.destroy();
    AmmoniaChart.destroy();
    PHChart.destroy();
    DissolvedChart.destroy();

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
            ammonia_array.push(output[i].ammonia)
            ph_array.push(output[i].ph)
            dissolved_array.push(output[i].dissolved)
        }

        for (let i = 0; i < length; i++) {
            console.log(time_array[i], oxygen_array[i],  ammonia_array[i], ph_array[i], dissolved_array[i])
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

        let data_ph = {
            labels: time_array,
            datasets: [{
                label: 'pH',
                backgroundColor: 'rgb(255,255,255)',
                borderColor: 'rgb(255,255,255)',
                data: ph_array,
            }]
        };

        let config_ph = {
            type: 'line',
            data: data_ph,
            options: {
                legend: {
                    display: false,
                },
                pointRadius: 1,
            }
        };

        let data_diss = {
            labels: time_array,
            datasets: [{
                label: 'Dissolved Oxygen',
                backgroundColor: 'rgb(6,128,0)',
                borderColor: 'rgb(6,128,0)',
                data: dissolved_array,
            }]
        };

        let config_diss = {
            type: 'line',
            data: data_diss,
            options: {
                legend: {
                    display: false,
                },
                pointRadius: 1,
            }
        };

        OxygenChart = new Chart(
            document.getElementById('OxygenTable'),
            config_oxy
        );

        AmmoniaChart = new Chart(
            document.getElementById('AmmoniaTable'),
            config_amn
        );

        PHChart = new Chart(
            document.getElementById('PHTable'),
            config_ph
        );

        DissolvedChart = new Chart(
            document.getElementById('DissolvedTable'),
            config_diss
        );

        OxygenChart.update();
        AmmoniaChart.update();
        PHChart.update();
        DissolvedChart.update();

        document.getElementById("refresh").innerHTML = "Refresh Data"
    });
}

document.getElementById("refresh").onclick = function() {
    refresh();
}

setInterval(refresh, 600000);







