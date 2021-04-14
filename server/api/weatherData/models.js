const axios = require('axios');
const fs = require('fs');
const {getUserData} = require('../utils/users');
const {writeToData, writeUserLocations} = require('../utils/data');
const filePath = require('path').resolve(__dirname, '../../data/users.json');
const {basePath} = require('../constants');
const API_KEY = process.env.API_KEY;

const buildUrl = (urlObject) => {
    const {
        units,
        timesteps,
        fields,
        lat,
        long
    } = urlObject;

    return `${basePath}location=${lat},${long}&fields=${fields || 'temperature'}&timesteps=${timesteps || '1h'}&units=${units || 'metric'}&apikey=${API_KEY}`
};

const updateUserLocations = (username) => {
	const userData = getUserData();
	if (!userData[username]) {
        console.log('User Does Not Exist');
	}

	writeUserLocations(username, userData);
}

const parseWeatherData = (data) => new Promise((res) => {
    const timelineData = data.data.data.timelines[0]

    if (!timelineData) {
        res({
            statusCode: 200,
            message: 'Success on retrieving data',
            weatherData: {
                data: {
                    timelines: []
                }
            }
        });
    }

    res({
        statusCode: 200,
        message: 'Success on retrieving data',
        weatherData: {
            data: {
                timelines: [
                    {
                        "timestep": timelineData.timestep,
                        "startTime": timelineData.startTime,
                        "endTime": timelineData.endTime,
                        "intervals": timelineData.intervals.slice(0, 3)
                    }
                ]
            }
        }
    });
})

const requestWeatherData = async (userData) => new Promise((res) => {    
    const url = buildUrl(userData);
    axios.get(url)

    .then((data) => {
        updateUserLocations(userData);
        res(parseWeatherData(data));
    })
    .catch((err) => {
        console.log(err);
        res({
            statusCode: 500,
            error: `Error on retrieving data: ${err}`,
            data: [],
        });
    })
})

module.exports = {
    requestWeatherData
}