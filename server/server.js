// APP & SERVER CONFIGURATION

//// Require Express to run server and routes
const express = require('express');
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
app.use(express.static('website'));

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
app.get('/weatherdata', get_weather_data)
function get_weather_data (req, res) {
    if (projectData === true) {
        res.send(projectData);
    } else {
        res.status(404).end();
    };
};

//// POST - Retrieve Weather Data
app.post('/weatherdata', post_weather_data)
function post_weather_data (req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userInput = req.body.userInput;

    res.send(projectData);
};