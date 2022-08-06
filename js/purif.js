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

    output = data[0].data;
    console.log(output)

    for (let i = 0; i < output.length; i++) {
        device_array.push(output[i].email)
        type_array.push(output[i].email)
        device_array.push(output[i].email)
        time_array.push(output[i].area)
    }

    output2 = data[1].data
    console.log(output2)

    for (let i = 0; i < email_array.length; i++) {
        let table = document.getElementById('users-body');
        var row = document.createElement('tr');
        cell = row.insertCell();
        cell.textContent = email_array[i];
        cell = row.insertCell();
        cell.textContent = address_array[i];
        cell = row.insertCell();

        for (let j = 0; j < output2.length; j++) {
            console.log(output2[j].user)
            if (output2[j].user === email_array[i]) {
                let urle = 'quality.html#' + output2[j].device_id
                cell.innerHTML += `<a href=${urle}>` + output2[j].device_id + ", " + `</a>`
            }
        }

        if (email_array[i] === "admin") {
            continue
        }

        table.appendChild(row);
    }
});




