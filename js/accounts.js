console.log("Accounts Running");

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function login() {

    // login_url = "http://192.168.0.193/REST_test/api/post/login.php"
    login_url = "https://water-initial-test.herokuapp.com/api/post/login.php"
    console.log("Logging in")

    let email = document.getElementById('usernamebox1').value
    let pass1 = document.getElementById('passwordbox1').value

    if (email === "" || pass1 === "") {

        alert("Missing Username or Password!");

    } else {

        let login_data = JSON.stringify({"email": String(email), "password": String(pass1)})
        let dataReceived = "";

        console.log(login_data)

        fetch(login_url, {
            credentials: "same-origin",
            mode: "cors",
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: login_data
        })
            .then((response) => response.json())
            //Then with the data from the response in JSON...
            .then((data) => {
                console.log('Success:', data);
                document.cookie = ("Username =" + data.message);

                console.log(document.cookie);
                location.reload()

            })
            //Then with the error generated...
            .catch((error) => {
                console.error('Error:', error);
            });

    }
}

function logout() {

    document.cookie = "Username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    location.reload()

}

function register() {

    // register_url = "http://192.168.0.193/REST_test/api/post/register.php"
    register_url = "https://water-initial-test.herokuapp.com/api/post/register.php"
    console.log("Logging in")

    let email = document.getElementById('usernamebox2').value
    let pass1 = document.getElementById('passwordbox2').value
    let pass2 = document.getElementById('passwordbox2_re').value
    let loc = document.getElementById('locbox2').value

    if (email === "" || pass1 === "" || pass2 === "" || loc === "Select") {

        alert("Missing Username, Password or Address");

    } else if (pass1 !== pass2) {

        alert("Passwords don't match.");

    } else {

        let register_data = JSON.stringify({"email": String(email), "password": String(pass1), "area": String(loc)})
        let dataReceived = "";

        console.log(register_data)

        axios.post(register_url, register_data)
            .then((response) => {
                console.log(response);
        }, (error) => {
            console.log(error);
            alert("Registration Failed. Please Try Again.")
        });

        // fetch(register_url, {
        //     credentials: "same-origin",
        //     mode: "cors",
        //     method: "post",
        //     headers: { "Content-Type": "application/json" },
        //     body: register_data
        // })
        //     .then((response) => response.json())
        //     //Then with the data from the response in JSON...
        //     .then((data) => {
        //         console.log('Success:', data);
        //     })
        //     //Then with the error genereted...
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    }

}

function load_page() {

    document.getElementById("user").innerHTML = readCookie("Username")
    document.getElementById("")

}

load_page();



