const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env'});

const {retrieveWeatherData} = require('./api/weatherData/controllers')
const {addUser}  = require('./api/users/controllers')
const {logUser, logOutUser} = require('./api/users/controllers')
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());


app.post('/user', async (req, res) => {
    const user = req.body.username;
    const addNewUser = await addUser(user);

    res.send(addNewUser);
});

app.post('/session', async (req, res) => {
    const user = req.body.username
    const userLogin = await logUser(user);

    res.send(userLogin);
})

app.delete('/endSession', async (req, res) => {
    const user = req.body.username
    const userLogin = await logOutUser(user);

    res.send(userLogin);
})

app.get('/location', async (req, res) => {
    const data = await retrieveWeatherData(req.body);

    res.send(data);
})

app.listen(process.env.PORT || port, () => {
    console.log('Listening')
})