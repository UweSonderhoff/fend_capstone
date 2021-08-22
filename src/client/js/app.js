// ROUTES

//// GET - request latest weather object
const getLatestWeatherData = async (url='/latestweatherdata') => { 
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

//// POST - request weather data for a given ZIP and Message
const getWeatherData = async () => {
    let userInput = {
        'zip': document.getElementById('zip').value,
        'feelings': document.getElementById('feelings').value
    }
    
    const response = await fetch ('/weatherdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        document.getElementById('date').innerHTML = newData.date;
        document.getElementById('temp').innerHTML = Math.round(newData.temperature) + ' Degrees';
        document.getElementById('content').innerHTML = newData.userInput;
    } catch(error) {
      console.log("error", error);
    }
}

export { getWeatherData }
export { getLatestWeatherData }