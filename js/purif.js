console.log("Running");

const url = "https://water-initial-test.herokuapp.com/api/post/read_all_purification.php";
const url2 = "https://water-initial-test.herokuapp.com/api/post/read_all_devices.php";

let device_array = []
let pdevice_array = []
let time_array = []
let status_array = []
let type_array = []

async function getData() {
    let response = await fetch(url);
    let data_purif = await response.json()
    let response2 = await fetch(url2);
    let data_sensors = await response2.json()
    return [data_purif, data_sensors]
}

getData().then(data => {

    let current_user = readCookie("Username")
    console.log(current_user)

    output = data[0].data;  // output = purif output
    console.log(output)

    output2 = data[1].data   // output = sensor table
    console.log(output2)

    sensors_array = []
    type_array = []

    for (let i = 0; i < output2.length; i++) {
        if (output2[i].user === current_user) {
            sensors_array.push(output2[i].device_id)
            type_array.push(output2[i].device_type)
        }
    }

    for (let i = 0; i < output.length; i++) {
        device_array.push(output[i].device_id)
        time_array.push(output[i].purification_time)
    }

    console.log(device_array, time_array)

    console.log(sensors_array, type_array)

    for (let i = 0; i < sensors_array.length; i++) {
        let type_id = "device_type_" + (i+1)
        let id_id = "device_id_" + (i+1)
        let time_id = "purif_time_" + (i+1)
        document.getElementById(type_id).innerHTML = type_array[i]
        document.getElementById(id_id).innerHTML = sensors_array[i]

        let idx = device_array.indexOf(sensors_array[i])
        console.log(idx)
        console.log(time_array[idx])

        // document.getElementById(time_id).innerHTML = time_array[idx]

    }

});




