const {verifyUserExists} = require('../utils/users');
const {verifyInputs} = require('../utils/inputs');

const {requestWeatherData} = require('./models')

const retrieveWeatherData = async (data) => new Promise((res) => {
    const {
        userName,
        lat,
        long
    } = data

    if (!verifyUserExists(userName)) {
        res({
            status: 500,
            type: 'ERR_NON_USER',
            message: 'User either does not exist, or does not have access'
        })
    }
    if (!verifyInputs(lat, long)) {
        res({
            status: 500,
            type: 'ERR_INVLD_COORDS',
            message: 'Inputs invalid. Please check lat, long'
        })
    }

    res(requestWeatherData(data))
})

module.exports = {
    retrieveWeatherData
}