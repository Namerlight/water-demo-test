console.log("Running");

const url = "https://water-initial-test.herokuapp.com/api/post/read_all_users.php";
const url2 = "https://water-initial-test.herokuapp.com/api/post/read_all_devices.php";

let email_array = []
let address_array = []

async function getData() {
    let response = await fetch(url);
    let data_accs = await response.json()
    let response2 = await fetch(url2);
    let data_sensors = await response2.json()
    return [data_accs, data_sensors]
}

const username_var = readCookie("Username")

document.getElementById("user-name").innerText = username_var

getData().then(data => {

    output = data[0].data;
    console.log(output)

    for (let i = 0; i < output.length; i++) {
        email_array.push(output[i].email)
        address_array.push(output[i].area)
    }

    let idx = email_array.indexOf(username_var)

    output2 = data[1].data
    console.log(output2)

    const addr_var = address_array[idx]
    document.getElementById("user-addr").innerText = addr_var

    let table = document.getElementById('users-body');
    var row = document.createElement('tr');
    // cell = row.insertCell();
    // cell.textContent = email_array[idx];
    // cell = row.insertCell();
    // cell.textContent = address_array[idx];
    // cell = row.insertCell();

    let count = 0

    for (let j = 0; j < output2.length; j++) {
        console.log(output2[j].user)
        if (output2[j].user === email_array[idx]) {
            cell = row.insertCell();
            let urle = 'quality.html?' + output2[j].device_id
            cell.innerHTML += `<a style="font-size: x-large" href=${urle}>` + output2[j].device_id + "" + `</a>`
            count+=1
        }
    }

    table.appendChild(row);

    let images = ["assets/filter_purifier.jpg", "assets/smart_bottle.jpg", "https://www.bdstall.com/asset/product-image/giant_99547.jpg"]


    var row2 = document.createElement('tr');

    for (let c = 0; c < count; c++) {
        cell = row2.insertCell();
        let urle = images[c]
        console.log(images[c])
        cell.innerHTML += `<img src="${urle}" style="width: 200px"></img>`

    }

    table.appendChild(row2);



});




