const userData = require('../../data/users.json');

const verifyUserExists = (username) => {
    if (userData[username] && userData[username].sessionActive === true) {
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