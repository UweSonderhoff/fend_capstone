// APP & SERVER CONFIGURATION

//// Require dotenv to use variables from a .env file
const dotenv = require('dotenv');
dotenv.config();
//// Require Express to run server and routes
const express = require('express');
//// Require Fetch to use fetch in the functions
const fetch = require("node-fetch");
//// Start up an instance of app
const app = express();

/* Middleware */
//// !!! I DIDN'T configure body parser since I got an deprication error and bodyParser is contained in express. I can use express.json & urlencoded
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

//// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//// Initialize the main project folder
app.use(express.static('dist'));

//// Configure Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('Server is running');
    console.log(`on localhost ${port}`);
};

// DATABASE

//// Setup empty JS object to act as endpoint for all routes
const projectData = {};


// ROUTES

//// GET - send project data array
app.get('/latestweatherdata', get_latest_weather_data)
function get_latest_weather_data (req, res) {
    if (projectData === true) {
        res.send(projectData);
    } else {
        res.status(404).end();
    };
};

//// POST - send project data array
app.post('/weatherdata', get_weather_data)
function get_weather_data (req, res) {
    zip = req.body.zip
    console.log(zip)
    feelings = req.body.feelings
    console.log(feelings)
    let d = new Date()
    let newDate = d.getMonth()+1+'-'+ d.getDate()+'-'+ d.getFullYear()
    console.log(newDate)
    
    getCurrentWeatherByCity(zip)
        .then(function(temperature){
            console.log(temperature)
            projectData.temperature = temperature;
            projectData.date = newDate
            projectData.userInput = feelings;
            console.log(projectData)
        })
            .then(function(){
                res.send(projectData)
            })
}


// HELPER FUNCIONS

//// Fetch Weather Data from OWA API by ZIP
let getCurrentWeatherByCity = async (zip) => {
    const res = await fetch(process.env.BASE_URL+zip+process.env.COUNTRY+process.env.UNITS+process.env.API_KEY);
    try {
        const data = await res.json();    
        const temperature = data.main.temp;
        console.log(temperature)
        return temperature;
    } catch(error) {
        console.log("ERROR", error);
    }  
};