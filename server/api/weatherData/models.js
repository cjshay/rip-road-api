const axios = require('axios');
const fs = require('fs');
const {getUserData} = require('../utils/users');
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

const updateUserLocations = (userName) => {
	const userData = getUserData();
	if (!userData[userName]) {
        console.log('User Does Not Exist');
	}

    let locationsArray = userData[userName.userName].locations;

    locationsArray.push([userName.lat, userName.long]);

	fs.writeFileSync(filePath, JSON.stringify(userData), (err) => {
		if (err) {
			console.log('err');
			
		};
	})

}

const requestWeatherData = async (userData) => new Promise((res) => {    
    const url = buildUrl(userData);
    axios.get(url)

    .then((data) => {
        updateUserLocations(userData);
        res({
            statusCode: 200,
            message: 'Success on retrieving data',
            weatherData: data.data
        });
    })
    .catch((err) => {
        console.log(err);
        res({
            statusCode: 500,
            error: 'Error on retrieving data',
            data: [],
        });
    })
})

module.exports = {
    requestWeatherData
}