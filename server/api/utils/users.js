const userData = require('../../data/users.json');

const verifyUserExists = (userName) => {
    if (userData[userName]) {
        return true;
    }
    return false;
}

const getUserData = () => {
    return userData;
}

module.exports = {
    verifyUserExists,
    getUserData
}