const fs = require('fs');
const {writeNewUser, loginUser} = require('./models');


const addUser = (userData) => new Promise((res) => {
    res(writeNewUser(userData));
});

const logUser = (userData) => new Promise((res) => {
    res(loginUser(userData))
})


module.exports = {
    addUser,
    logUser
}