console.log("Running");


var imported = document.createElement('script');
imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCMQlB41vn2nIVOAHuTnt6nrk8QxpEf5o&callback=initMap&v=weekly';
document.head.appendChild(imported);


Chart.defaults.beginAtZero = true;
Chart.defaults.color = "#ffffff";

(function () {
    'use strict'
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })
})()


// const url = "http://192.168.0.193/REST_test/api/post/read_last_100.php";
let url = "https://water-initial-test.herokuapp.com/api/post/read_last_100.php";
const device_url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device="

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

    // document.getElementById("refresh").innerHTML = "Refresh Data"
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

    console.log(url)
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

// document.getElementById("refresh").onclick = function() {
//     refresh();
// }

setInterval(refresh, 600000);

document.getElementById("directions1").onclick = function() {
    console.log(this.innerText)
    url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + this.innerText
    console.log(url)
    refresh()
}

document.getElementById("directions2").onclick = function() {
    console.log(this.innerText)
    url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + this.innerText
    console.log(url)
    refresh()
}

async function getListofButtons() {
    let list_of_buttons = document.getElementsByClassName("device_element")
    console.log("List", list_of_buttons)
}

function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const dhaka = { lat: 23.780067, lng: 90.407311};
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: dhaka,
    });

    new google.maps.Marker({
        position: { lat: 23.789067, lng: 90.409911},
        map,
        title: "GU001!",
    });

    new google.maps.Marker({
        position: { lat: 23.779985274999273, lng: 90.40728374683908},
        map,
        title: "MO001!",
    });

    directionsRenderer.setMap(map);

    const mapGU001 = function () {
        console.log("GU001 clicked")
        map.panTo({ lat: 23.789067, lng: 90.409911 });
        url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + "GU001"
        console.log("New URL", url)
        refresh()
    };

    const mapGU002 = function () {
        console.log("GU002 clicked")
        map.panTo({ lat: 23.789167, lng: 90.410911 });
        url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + "GU002"
        console.log("New URL", url)
        refresh()
    };

    const mapGU003 = function () {
        console.log("GU003 clicked")
        map.panTo({ lat: 23.778967, lng: 90.408911 });
        url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + "GU003"
        console.log("New URL", url)
        refresh()
    };

    const mapMO001 = function () {
        console.log("MO001 clicked")
        map.panTo({ lat: 23.789067, lng: 90.409911 });
        url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + "MO001"
        console.log("New URL", url)
        refresh()
    };

    const mapMO002 = function () {
        console.log("MO002 clicked")
        map.panTo({ lat: 23.790067, lng: 90.406911 });
        url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + "MO002"
        console.log("New URL", url)
        refresh()
    };

    const mapUT001 = function () {
        console.log("UT001 clicked")
        map.panTo({ lat: 23.779985274999273, lng: 90.40728374683908});
        url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + "UT001"
        console.log("New URL", url)
        refresh()
    };

    let url_users = "https://water-initial-test.herokuapp.com/api/post/read_all_devices.php";

    async function getData() {
        let response = await fetch(url_users);
        return await response.json()
    }

    sensors_list = []

    getData().then(async data => {
        let output = data.data;
        console.log(output)

        let current_user = readCookie("Username")

        console.log("Cookie", current_user)

        for (let i = 0; i < (output.length); i++) {
            if (output[i]["user"] === current_user || current_user === "admin") {
                sensors_list.push(output[i]["device_id"])
            }
        }
        console.log(sensors_list)

        let b_area = document.getElementById("buttons_area")

        for (let j = 0; j < (sensors_list.length); j++) {
            console.log(sensors_list[j])

            let btn = document.createElement("button");
            btn.innerHTML = sensors_list[j]

            if (sensors_list[j] === "GU001") {
                btn.onclick = mapGU001
            } else if (sensors_list[j] === "GU002") {
                btn.onclick = mapGU002
            } else if (sensors_list[j] === "GU003") {
                btn.onclick = mapGU003
            } else if (sensors_list[j] === "MO001") {
                btn.onclick = mapMO001
            } else if (sensors_list[j] === "MO002") {
                btn.onclick = mapMO002
            } else if (sensors_list[j] === "UT001") {
                btn.onclick = mapUT001
            }
            btn.id = "directions" + j
            btn.class = "btn btn-light btn-sm device_element"
            btn.style = "top: 20px; width: 100%; margin-bottom: 11px"

            b_area.appendChild(btn)

        }

        // document.getElementById("directions1").addEventListener("click", onChangeHandler1);
        // document.getElementById("directions2").addEventListener("click", onChangeHandler2);

    });

}




// document.getElementsByClassName("device_element")




//     .onclick = function() {
//     console.log("In Quality", this.innerText)
//     url = "https://water-initial-test.herokuapp.com/api/post/read_all_sensor.php?device=" + this.innerText
//     console.log(url)
//     refresh()
// }






