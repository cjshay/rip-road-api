const fs = require('fs');
const {getUserData} = require('../utils/users');
const filePath = require('path').resolve(__dirname, '../../data/users.json');

const writeNewUser = (userName) => new Promise(res => {
	const userData = getUserData();
	if (userData[userName]) {
		res({
			status: 500,
			type: 'ERR_USR_NOT_UNIQUE',
			message: 'User already exists'
		})
	}

	userData[userName] = {
		userName,
		locations: [],
	}

	fs.writeFile(filePath, JSON.stringify(userData), (err) => {
		if (err) {
			console.log('err');
			res({
				status: 500,
				message: 'Error writing user',
				payload: userData[userName]
			});
		};
		res({
			status: 200,
			message: 'Created New User',
			payload: userData[userName]
		});
	})
})

const loginUser = (userName) => new Promise(res => {
	const userData = getUserData();
    if (userData[userName]) {
        res({
            status: 200,
            message: 'Successfully Logged In',
            payload: userData[userName]
        });
    }
    res({
        status: 404,
        type: 'ERR_NON_USER',
        message: 'User Not Found'
    });
});



module.exports = {
	writeNewUser,
	loginUser
}