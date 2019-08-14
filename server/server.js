const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const mongoose = require('./db/mongoose');
const {Config} = require('./models/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/token', (req, res) => {
    var body = _.pick(req.body, ["username","password"]);

    var params = new URLSearchParams();
    params.append('f', 'json');
    params.append('client', 'referer');
    params.append('referer','localhost:3001');
    params.append('expiration', '60');
    params.append('username', jwt.verify(body.username, process.env.ARCGIS_SECRET));
    params.append('password', jwt.verify(body.password, process.env.ARCGIS_SECRET));

    axios.post(process.env.ARCGIS_TOKEN_URL, params)
    .then((response) => {
        jwt.sign(response.data.token, process.env.ARCGIS_SECRET, (err, signedToken) => {
            res.set('x-esri-token', signedToken).send({token: signedToken});
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/config', (req, res) => {
    Config.findOne({}).then((config)  => {
        res.send({config})
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/search', (req, res) => {
    let body = _.pick(req.body, ["term","latitude","longitude"]);
    console.log(body);
    let params = new URLSearchParams();
    params.append('term', body.term);
    params.append('latitude', body.latitude);
    params.append('longitude', body.longitude);

    let headers = {
        Authorization: `Bearer ${process.env.YELP_API}`
    };

    axios.get(process.env.YELP_URL,{
        params,
        headers
    }).then((response) => {
        let businessData = response.data;
        res.send(businessData);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));
