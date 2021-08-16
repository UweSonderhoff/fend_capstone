// GLOBAL VARIABLES

//// Weather API Setup
/* Example Call: api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key} */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let country = ',de';
let units = '&units=imperial'
const apiKey = '&appid=30546cd877be29c0942a45ebca74c7b6';

// ROUTES

//// GET - request latest weather object
const getLatestWeatherData = async (url='/weatherdata') =>{ 
    const request = await fetch(url);
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = Math.round(data.temperature) + ' Degrees';
        document.getElementById('content').innerHTML = data.userInput;
    } catch(error) {
        if (request.status === 404) {
            console.log("No Most Recent Entries available.", error);
        } else {
            console.log("error", error);
        };
    };
};
getLatestWeatherData();

//// POST - request method bluepring against API
const postWeatherData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
      console.log("error", error);
    }
};



// HELPER FUNCTIONS

//// Fetch Weather Data from OWA API by ZIP
let getCurrentWeatherByCity = async (baseURL, zip, apiKey)=>{
    const res = await fetch(baseURL+zip+country+units+apiKey);
    try {
        const data = await res.json();    
        const temperature = data.main.temp;
        return temperature;
    } catch(error) {
        console.log("ERROR", error);
    }  
};

//// Fetch user input, initiate weather request and post data to API
const requestWeather = function(){
    //// Current Date Instance
    let d = new Date();
    let newDate = d.getMonth()+1+'-'+ d.getDate()+'-'+ d.getFullYear();
    let zip = document.getElementById('zip').value;
    
    getCurrentWeatherByCity(baseURL, zip, apiKey)
        .then(function(temperature){
            item = {
                "temperature": temperature,
                "date": newDate,
                "userInput": document.getElementById('feelings').value
            };
            postWeatherData('/weatherdata', item)
            .then(function(newData){
                console.log(newData);
                document.getElementById('date').innerHTML = newData.date;
                document.getElementById('temp').innerHTML = Math.round(newData.temperature) + ' Degrees';
                document.getElementById('content').innerHTML = newData.userInput;
            });
        });
};


// EVENT LISTENER

//// Event Listener to fetch user input
document.getElementById('generate').addEventListener('click', requestWeather);


/*
export { requestWeather }
export { getCurrentWeatherByCity }
export { postWeatherData }
export { getLatestWeatherData }
*/