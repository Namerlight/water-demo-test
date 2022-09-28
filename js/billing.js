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

    date_array.push("Predicted")
    total_bill_array.push(166.9)

    let average_bill_array = []
    sum = 0
    for (let i = 0; i < total_bill_array.length; i++) {
        sum += total_bill_array[i]
        avg = sum/(i+1)
        average_bill_array.push(avg)
    }

    document.getElementById("water-usage").innerHTML = (water_used_array[date_array.length - 2] + " L")
    document.getElementById("water-bill").innerHTML = ("BDT " + total_bill_array[date_array.length - 2])

    document.getElementById("water-usage-pred").innerHTML = water_used_array[date_array.length-2]+1000
    document.getElementById("water-bill-pred").innerHTML = total_bill_array[date_array.length-2]+15.19

    const billing_data = {
        labels: date_array,
        datasets: [
            {
                type: 'line',
                label: 'Average Bill',
                data: average_bill_array,
                fill: false,
                borderColor: 'rgb(255,157,0)'

            }, {
            type: 'bar',
            label: 'Monthly Bill',
            data: total_bill_array,
            borderColor: 'rgb(94,255,185)',
            backgroundColor: [
                'rgb(255,255,94)',
                'rgb(255,255,94)',
                'rgb(255,129,94)',
                'rgb(255,255,94)',
                'rgb(94,255,185)',
                'rgb(63,194,206)',
            ],
        }]
    };

    const billing_config = {
        type: 'scatter',
        data: billing_data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const billing_chart = new Chart(
        document.getElementById('billing_chart'),
        billing_config
    );

});





