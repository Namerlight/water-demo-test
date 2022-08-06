console.log("Running");

const url = "https://water-initial-test.herokuapp.com/api/post/read_all_billing.php";


let date_array = []
let water_used_array = []
let total_bill_array = []

async function getData() {
    let response = await fetch(url);
    let data_bill = await response.json()
    return data_bill
}

getData().then(data => {

    output = data.data;
    console.log(output)

    for (let i = 0; i < output.length; i++) {
        date_array.push(output[i].billing_date)
        water_used_array.push(output[i].total_usage)
        total_bill_array.push(output[i].total_bill)
    }

    for (let i = 0; i < date_array.length; i++) {
        let table = document.getElementById('billing-body');
        var row = document.createElement('tr');
        cell = row.insertCell();
        cell.textContent = date_array[i];
        cell = row.insertCell();
        cell.textContent = water_used_array[i];
        cell = row.insertCell();
        cell.textContent = total_bill_array[i];

        table.appendChild(row);
    }

    document.getElementById("water-usage").innerHTML = (water_used_array[date_array.length - 1] + " L")
    document.getElementById("water-bill").innerHTML = ("BDT " + total_bill_array[date_array.length - 1])

    document.getElementById("water-usage-pred").innerHTML = water_used_array[date_array.length-1]+1000
    document.getElementById("water-bill-pred").innerHTML = total_bill_array[date_array.length-1]+15.19

});





