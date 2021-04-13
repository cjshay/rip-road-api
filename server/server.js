const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env'});

const {retrieveWeatherData} = require('./api/weatherData/controllers')
const {addUser}  = require('./api/users/controllers')
const {logUser} = require('./api/users/controllers')
const app = express();

app.use(cors());
app.use(express.json());


app.post('/userCreate', async (req, res) => {
    const user = req.body.userName;
    const addNewUser = await addUser(user);

    res.send(addNewUser);
});

app.post('/userLogin', async (req, res) => {
    const user = req.body.userName
    const userLogin = await logUser(user);

    res.send(userLogin);
})

app.get('/locations', async (req, res) => {
    const data = await retrieveWeatherData(req.body);

    res.send(data);
})

app.listen(8080, () => {
    console.log('Listening')
})