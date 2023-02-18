const country_name = document.getElementById("country")
const state_name = document.getElementById("state")

var data = [];
function get_country() {

////////////////////////////////////////////   API call to get country and states//////////////////////////////////////////////
    
    var request = new XMLHttpRequest();
    request.open("GET", "https://ssagar7007.github.io/countries-states/countries.json");
    request.send();
    request.addEventListener("load", function () {
        if (request.status == 200) {
            data = JSON.parse(request.responseText);
            data.forEach(function (element) {
                var option = document.createElement("option");
                option.text = element.name;
                option.value = element.name;
                country_name.appendChild(option);
            });
        }
        else {
            console.log("Error occured in getting country");
        }
    })

    show_state();

}

// If state data is available for selected country then state is required to fill otherwise state is not required/////////////////
var isStateRequired = false;

function show_state() {
    if (country_name.value) {
       
        var states = [];
        data.forEach(function (element) {
            if (element.name == country_name.value) {
                states = element.states;
            }
        })
        if (states.length > 0) {
            isStateRequired = true;
            state_name.style.display = "";
        }
        else {
            isStateRequired = false;
            state_name.style.display = "none";
        }
    }
    else {
        state_name.style.display = "none";
    }
} 

show_state();


function get_state() {
   
    if (country_name.value) {
        var states = [];
        data.forEach(function (element) {
            if (element.name == country_name.value) {
                states = element.states;
            }
        })
        states.forEach(function (element) {
            var option = document.createElement("option");
            option.text = element.name;
            option.value = element.name;
            state_name.appendChild(option);
        });
    }
    else {
            alert("select the country first");
        }
   
}


////////////////////////////////////// Function to validate email///////////////////////////////////////////////

function ValidateEmail(uemail)
{

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.match(mailformat))
    {
    return true;
    }
    else
    {
    return false;
    }
}

//////////////////////////// Function ot validate form data ////////////////////////////////////////////

function validator() {
  
    var name = document.detail_form.name.value;
    var dob = document.detail_form.dob.value;
    var contact = document.detail_form.contact.value;
    var country = document.detail_form.country.value;
    var state = document.detail_form.state.value;
    var email = document.detail_form.email.value;
    
    try {
        if (name.length == 0) {
            var err = { "Name": { "error": "Name required" } }
            err = JSON.stringify(err)
            throw err    
        }
        else if (name.length < 4 || name.length > 10) {
            var err = { "Name": { "error": "length should be between 4-10 characters" } }
            err = JSON.stringify(err)
            throw err   
        }
        else if (contact.length != 0 && contact.length != 10) {
            var err = { "Contact": { "error": "Mobile no should be of 10 digits" } }
            err = JSON.stringify(err)
            throw err
        }
        else if (country.length == 0) {
            var err = { "Country": { "error": "Country required" } }
            err = JSON.stringify(err)
            throw err
        }
        else if (isStateRequired && state.length == 0) {
            var err = { "State": { "error": "State required" } }
            err = JSON.stringify(err)
            throw err
        }
        else if (!ValidateEmail(email)) {
            var err = { "Email": { "error": "Invalid email" } }
            err = JSON.stringify(err)
            throw err
        }
        else {
            var err = { "Success": "All fields are valid" }
            err = JSON.stringify(err)
            throw err
            
        }
    }
    catch (result) {
        sendResult(result)
    } 
}


/////////////////////////// Function to send data from iframe to parent window ////////////////////////////////

function sendResult(result) {
    window.parent.postMessage(result, '*');
}