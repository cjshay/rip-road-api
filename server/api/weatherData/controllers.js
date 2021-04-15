const {verifyUserExists} = require('../utils/users');

const {requestWeatherData} = require('./models');

const verifyInputs = (lat, long) => {
    if (!lat || !long) {
        return false;
    }
    return true;
}

const retrieveWeatherData = async (data) => new Promise((res) => {
    const {
        username,
        lat,
        long
    } = data

    if (!verifyUserExists(username)) {
        res({
            status: 500,
            type: 'ERR_USER',
            message: 'Please Sign in or Sign Up'
        })
    } else if (!verifyInputs(lat, long)) {
        res({
            status: 500,
            type: 'ERR_INVLD_COORDS',
            message: 'Inputs invalid. Please check lat, long'
        })
    } else {
        res(requestWeatherData(data))
    }
})

module.exports = {
    retrieveWeatherData
}