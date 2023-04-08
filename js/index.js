console.log("Running");

// const url = "http://192.168.0.193/REST_test/api/post/read_last_100.php";
const db_url = "https://water-domestic-backend-production.up.railway.app/api/post/read_last_100.php";
const pred_url = "https://web-production-c673.up.railway.app/"

let time_array = [];
let oxygen_array = [];
let ammonia_array = [];
let ph_array =[];
let dissolved_array = [];

let predOxy_array = [];
let predAmn_array = [];
let predPH_array = [];
let predDiss_array = [];

async function getData() {
    let response = await fetch(db_url);
    let real_data = await response.json()
    return real_data
}

async function getPred() {
    let response = await axios.get(pred_url);
    let pred_data = response
    return pred_data;
}

function getBill(cost, volume) {
    return (volume*cost).toFixed(2);
}

function check_oxygen(quality_flag, oxygen_value) {

    if (oxygen_value < 4 || oxygen_value > 6) {
        quality_flag += 2
    } else if (oxygen_value < 4.5 || oxygen_value > 5.5) {
        quality_flag += 1;
    } else {
        // do nothing
    }
    return quality_flag

}

function check_ammonia(quality_flag, ammonia_value) {

    if (ammonia_value < 0.015 || ammonia_value > 0.030) {
        quality_flag += 2
    } else if (ammonia_value < 0.020 || ammonia_value > 0.025) {
        quality_flag += 1;
    } else {
        // do nothing
    }
    return quality_flag

}

function check_ph(quality_flag, ph_value) {

    if (ph_value < 6 || ph_value > 8) {
        quality_flag += 2
    } else if (ph_value < 6.5 || ph_value > 7.5) {
        quality_flag += 1;
    } else {
        // do nothing
    }
    return quality_flag

}

function check_dissolved(quality_flag, dissolved_value) {

    if (dissolved_value < 6.5 || dissolved_value > 8.5) {
        quality_flag += 2
    } else if (dissolved_value < 7 || dissolved_value > 8) {
        quality_flag += 1;
    } else {
        // do nothing
    }
    return quality_flag

}

function getQuality() {
    let oxygen_value = oxygen_array.at(-1);
    let ammonia_value = ammonia_array.at(-1);
    // let ph_value = ph_array.at(-1);
    let ph_value = 11.0;
    let dissolved_value = dissolved_array.at(-1);

    let quality_flag = 0;     // if flag is 0, quality is good, flag = 1, quality is poor, flag = 2, quality is unsafe, higher is dangerous

    quality_flag = check_oxygen(quality_flag, oxygen_value)
    quality_flag = check_ammonia(quality_flag, ammonia_value)
    quality_flag = check_ph(quality_flag, ph_value)
    quality_flag = check_dissolved(quality_flag, dissolved_value)

    switch(quality_flag) {
        case 0:
            return '\<img src=\"../assets/safe.png\" width=\"160px\" height=\"125px\" \>'
        case 1:
            return '\<img src=\"../assets/unsafe.png\" width=\"160px\" height=\"125px\"\>'
        case 2:
            return '\<img src=\"../assets/unsafe.png\" width=\"160px\" height=\"125px\"\>'
        default:
            return '\<img src=\"../assets/danger.png\" width=\"160px\" height=\"125px\"\>'
    }

}

function getQuantity() {

}

function getPredQuality() {

}

function getPredQuantity() {

}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

getData().then(data => {

    let cutout = getWidth()/1920 * 80

    if (getWidth() < 771) {
        cutout = 120
    }

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

    let daily_use = 300         // in Litres

    let water_volume = daily_use * 30;         // in Litres monthly
    let cost = (14.46/1000);

    let check_flag = 0;

    document.getElementById("date-data").innerHTML = ("Date: " + time_array[time_array.length - 1]);
    document.getElementById("volume-data").innerHTML = (water_volume + " L")
    document.getElementById("pressure-data").innerHTML = (water_volume + " kPa")
    document.getElementById("speed-data").innerHTML = (water_volume + " L/s")
    document.getElementById("PH-data").innerHTML = parseInt(ph_array[ph_array.length - 1]).toFixed(2)
    document.getElementById("oxy-data").innerHTML = parseInt(oxygen_array[oxygen_array.length - 1]).toFixed(2) + " ppm"
    document.getElementById("diss-data").innerHTML = parseInt(dissolved_array[dissolved_array.length - 1]).toFixed(2) + " ppm"
    document.getElementById("amn-data").innerHTML = parseInt(ammonia_array[ammonia_array.length - 1]).toFixed(2) + " ppm"
    document.getElementById("ar-data").innerHTML = parseInt(ph_array[ph_array.length - 10]).toFixed(2) + " ppm"
    document.getElementById("pb-data").innerHTML = parseInt(oxygen_array[oxygen_array.length - 10]).toFixed(2) + " ppm"
    document.getElementById("cr-data").innerHTML = parseInt(dissolved_array[dissolved_array.length - 10]).toFixed(2) + " ppm"
    document.getElementById("cl-data").innerHTML = (parseInt(ammonia_array[ammonia_array.length - 10]).toFixed(2) + " ppm")

    // document.getElementById("quality-data").innerHTML = getQuality()
    // document.getElementById("quantity-data").innerHTML = '\<img src=\"../assets/high.png\" width=\"160px\" height=\"125px\" \>'

    // document.getElementById("water-cost").innerHTML = cost.toString() + " BDT per L";
    // document.getElementById("water-usage").innerHTML = water_volume.toString() + " L";
    // document.getElementById("water-bill").innerHTML = getBill(cost, water_volume).toString() + " BDT";

    console.log(getQuality());

    output = data.data;
    console.log(output)

    let length2 = Object.keys(output).length;
    console.log(length2);

    predPH_array.push(output.PH)
    predDiss_array.push(output.Dissolved)
    predOxy_array.push(output.Oxygen)
    predAmn_array.push(output.Ammonia)

    for (let i = 0; i < length2; i++) {
        console.log(predOxy_array[i], predAmn_array[i], predPH_array[i], predDiss_array[i])
    }
    // document.getElementById("quality-data-pd").innerHTML = '\<img src="../assets/safe.png" width=\"160px\" height=\"125px\" \>'
    // document.getElementById("quantity-data-pd").innerHTML = '\<img src="../assets/high.png" width=\"160px\" height=\"125px\" \>'

    document.getElementById("date-data").innerHTML = ("Date: " + time_array[time_array.length - 1]);
    document.getElementById("date-data").innerHTML = ("Date: 2022-07-28 12:00:00.0");
    // document.getElementById("oxy-pred").innerHTML = parseInt(predOxy_array[predOxy_array.length-1]).toFixed(2)
    document.getElementById("oxy-pred").innerHTML = (0.12 + "ppm")
    // document.getElementById("PH-pred").innerHTML = parseInt(predPH_array[predPH_array.length - 1]).toFixed(2);
    document.getElementById("PH-pred").innerHTML = 7.56
    // document.getElementById("amn-pred").innerHTML = parseInt(predAmn_array[predAmn_array.length - 1]).toFixed(2);
    // document.getElementById("diss-pred").innerHTML = parseInt(predDiss_array[predDiss_array.length - 1]).toFixed(2);
    document.getElementById("amn-pred").innerHTML = (0.12 + "ppm")
    document.getElementById("diss-pred").innerHTML = (0.12 + "ppm")

    const quality_real_data = {
        datasets: [{
            data: [99, 1, 34],
            backgroundColor: [
                'rgb(99,255,130)',
                'rgb(74,74,74)',
                'rgba(54, 162, 235, 0.0)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.0)',
                'rgba(54, 162, 235, 0.0)',
            ],
            rotation: -135,
        }],
    };

    const quality_real_config = {
        type: 'doughnut',
        data: quality_real_data,
        options: {
            events: [],
            cutout: cutout

        }
    };

    const quality_real_chart = new Chart(
        document.getElementById('quality_real_chart'),
        quality_real_config
    );

    const quantity_real_data = {
        datasets: [{
            data: [86, 14, 34],
            backgroundColor: [
                'rgb(0,84,134)',
                'rgb(74,74,74)',
                'rgba(54, 162, 235, 0.0)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.0)',
                'rgba(54, 162, 235, 0.0)',
            ],
            rotation: -135,
        }],
    };

    const quantity_real_config = {
        type: 'doughnut',
        data: quantity_real_data,
        options: {
            events: [],
            cutout: cutout
        }
    };

    const quantity_real_chart = new Chart(
        document.getElementById('quantity_real_chart'),
        quantity_real_config

    );

});

getPred().then(data => {

    let cutout = getWidth()/1920 * 80

    if (getWidth() < 771) {
        cutout = 120
    }

    output = data.data;
    console.log(output)

    let length = Object.keys(output).length;
    console.log(length);

    predPH_array.push(output.PH)
    predDiss_array.push(output.Dissolved)
    predOxy_array.push(output.Oxygen)
    predAmn_array.push(output.Ammonia)

    for (let i = 0; i < length; i++) {
        console.log(predOxy_array[i], predAmn_array[i], predPH_array[i], predDiss_array[i])
    }

    document.getElementById("date-data").innerHTML = ("Date: " + time_array[time_array.length - 1]);
    document.getElementById("date-data").innerHTML = ("Date: 2022-07-29 12:00:00.0");

    const quality_pred_data = {
        datasets: [{
            data: [68, 32, 34],
            backgroundColor: [
                'rgb(255,234,0)',
                'rgb(74,74,74)',
                'rgba(54, 162, 235, 0.0)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.0)',
                'rgba(54, 162, 235, 0.0)',
            ],
            rotation: -135,
        }],
    };

    const quality_pred_config = {
        type: 'doughnut',
        data: quality_pred_data,
        options: {
            events: [],
            cutout: cutout

        }
    };

    const quality_pred_chart = new Chart(
        document.getElementById('quality_pred_chart'),
        quality_pred_config
    );

    const quantity_pred_data = {
        datasets: [{
            data: [90, 10, 35],
            backgroundColor: [
                'rgb(0,84,134)',
                'rgb(74,74,74)',
                'rgba(54, 162, 235, 0.0)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.0)',
                'rgba(54, 162, 235, 0.0)',
            ],
            rotation: -135,
        }],
    };

    const quantity_pred_config = {
        type: 'doughnut',
        data: quantity_pred_data,
        options: {
            events: [],
            cutout: cutout
        }
    };

    const quantity_pred_chart = new Chart(
        document.getElementById('quantity_pred_chart'),
        quantity_pred_config
    );

});

console.log("Width", getWidth())

let cutout_small = getWidth()/1920 * 50

if (getWidth() < 771) {
    cutout_small = 100
}

console.log(cutout_small)

const bills_data = {
    labels: ["Previous Month", "This Month", "Next Month (Future)"],
    datasets: [{
        label: '',
        data: [151.80, 182.16, 166.99],
        backgroundColor: [
            'rgba(255,241,105,0.4)',
            'rgb(255,0,0)',
            'rgb(255,111,39)',
        ],
    }]
};

const bills_config = {
    type: 'bar',
    data: bills_data,
    options: {
        plugins: {
            legend: {
                display: false,
                labels: {
                    backdropColor: 'rgb(255,255,255)',
                    textStrokeColor: 'rgb(255,255,255)',
                }
            }
        },
        scales: {
            x: {
                ticks: { color: 'white'},
            },
            y: {
                ticks: { color: 'white', beginAtZero: true },
            },
        }
    },
};

const bills_chart = new Chart(
    document.getElementById('bills_chart'),
    bills_config
);


const purif1_data = {
    datasets: [{
        data: [100, 0, 34],
        backgroundColor: [
            'rgb(0,255,255)',
            'rgb(74,74,74)',
            'rgba(54, 162, 235, 0.0)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.0)',
            'rgba(54, 162, 235, 0.0)',
        ],
        rotation: -135,
    }],
};

const purif1_config = {
    type: 'doughnut',
    data: purif1_data,
    options: {
        events: [],
        cutout: cutout_small,

    }
};

const purif1_chart = new Chart(
    document.getElementById('purif1_chart'),
    purif1_config
);

const purif2_data = {
    datasets: [{
        data: [100, 0, 34],
        backgroundColor: [
            'rgb(0, 255, 255)',
            'rgb(74,74,74)',
            'rgba(54, 162, 235, 0.0)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.0)',
            'rgba(54, 162, 235, 0.0)',
        ],
        rotation: -135,
    }],
};

const purif2_config = {
    type: 'doughnut',
    data: purif2_data,
    options: {
        events: [],
        cutout: cutout_small,
    }
};

const purif2_chart = new Chart(
    document.getElementById('purif2_chart'),
    purif2_config
);


const purif3_data = {
    datasets: [{
        data: [100, 0, 34],
        backgroundColor: [
            'rgb(255,234,0)',
            'rgb(74,74,74)',
            'rgba(54, 162, 235, 0.0)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.0)',
            'rgba(54, 162, 235, 0.0)',
        ],
        rotation: -135,
    }],
};

const purif3_config = {
    type: 'doughnut',
    data: purif3_data,
    options: {
        events: [],
        cutout: cutout_small,

    }
};

const purif3_chart = new Chart(
    document.getElementById('purif3_chart'),
    purif3_config
);







