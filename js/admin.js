console.log("Running");

const url = "https://water-initial-test.herokuapp.com/api/post/read_all_users.php";

let email_array = []
let address_array = []

async function getData() {
    let response = await fetch(url);
    let data = await response.json()
    return data
}

getData().then(data => {

    output = data.data;
    console.log(output)

    for (let i = 0; i < output.length; i++) {
        email_array.push(output[i].email)
        address_array.push(output[i].area)
    }

    console.log(email_array, address_array)

    for (let i = 0; i < email_array.length; i++) {
        let table = document.getElementById('users-body');
        var row = document.createElement('tr');
        cell = row.insertCell();
        cell.textContent = email_array[i];
        cell = row.insertCell();
        cell.textContent = address_array[i];
        cell = row.insertCell();
        let urle = 'quality.html#' + email_array[i]
        cell.innerHTML = `<a href=${urle}>View Information</a>`;
        table.appendChild(row);
    }
});




