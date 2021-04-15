const fs = require('fs');
const {getUserData} = require('../utils/users');
const {writeToData} = require('../utils/data');

const writeNewUser = (username) => new Promise(res => {
	const userData = getUserData();
	if (userData[username]) {
		res({
			status: 500,
			type: 'ERR_USR_NOT_UNIQUE',
			message: 'User already exists'
		})
	}

	userData[username] = {
		username,
		sessionActive: true,
		locations: [],
	}

	res(writeToData(username, userData, "NEW_USER"))
})

const loginUser = (username) => new Promise(res => {
	const userData = getUserData();
    if (userData[username] && userData[username].sessionActive === false) {

		userData[username].sessionActive = true;
		res(writeToData(username, userData, "LOGIN_USER"));

    } else if (userData[username] && userData[username].sessionActive === true) {

	    res({
			status: 404,
			type: 'ERR_USER_LOGGED_IN',
			message: 'User Already Logged In'
		});		

	}

    res({
        status: 404,
        type: 'ERR_NON_USER',
        message: 'User Not Found'
    });
});

const logout = (username) => new Promise(res => {
	const userData = getUserData();
	
	if (!userData[username]) {
		res({
			status: 500,
			message: 'Error: User Does Not Exist',
			payload: userData[username]
		});
	}

	if (userData[username].sessionActive === false) {
		res({
			status: 500,
			message: 'ERR_NO_USER',
			payload: 'Error: User must be logged in to log out'
		});
	}

	if (userData[username].sessionActive === true) {
		userData[username].sessionActive = false;
		res(writeToData(username, userData, "LOGOUT_USER"));
	}
});



module.exports = {
	writeNewUser,
	loginUser,
	logout
}