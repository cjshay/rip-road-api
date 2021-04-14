const fs = require('fs');
const filePath = require('path').resolve(__dirname, '../../data/users.json');

const writeToData = (username, userData, type) => new Promise((res) => {

    fs.writeFile(filePath, JSON.stringify(userData), (err) => {
        if (err) {
            res({
                status: 500,
                message: `Error Writing to data: ${err}`,
                payload: userData[username]
            });
        };
        res({
            status: 200,
            message: getMessageType(type),
            payload: userData[username]
        });
    });
});

const writeUserLocations = (username, userData) => new Promise((res) => {
    let locationsArray = userData[username.username].locations;

    locationsArray.push([username.lat, username.long]);

    fs.writeFile(filePath, JSON.stringify(userData), (err) => {
        if (err) {
            res(err);
        };
    });
});

const getMessageType = (type) => {
    switch(type) {
        case "NEW_USER":
            return "Success in creating new user";
        case "LOGIN_USER":
            return "Success in Logging in User";
        case "LOGOUT_USER":
            return "Success in Logging Out User";
        default:
            break;
    }
}

module.exports = {
    writeToData,
    writeUserLocations
}