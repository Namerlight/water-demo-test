
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


var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
    return new bootstrap.Offcanvas(offcanvasEl)
})


// const url = "http://192.168.0.193/REST_test/api/post/read_last_100.php";
const url = "https://water-initial-test.herokuapp.com/api/post/read_last_100.php";

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

    document.getElementById("volume-data").innerHTML = "20G"
    document.getElementById("pH-data").innerHTML = "7.0"
    document.getElementById("pressure-data").innerHTML = "500kpa"
    document.getElementById("ar-data").innerHTML = "0.1%"
    document.getElementById("speed-data").innerHTML = "2mph"

    document.getElementById("quality-data").innerHTML = "Safe"
    document.getElementById("quantity-data").innerHTML = "Lots"


});








