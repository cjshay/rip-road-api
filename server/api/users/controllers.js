const fs = require('fs');
const {writeNewUser, loginUser, logout} = require('./models');


const addUser = (userData) => new Promise((res) => {
    res(writeNewUser(userData));
});

const logUser = (userData) => new Promise((res) => {
    res(loginUser(userData))
});

const logOutUser = (userData) => new Promise((res) => {
    res(logout(userData));
})


module.exports = {
    addUser,
    logUser,
    logOutUser
}