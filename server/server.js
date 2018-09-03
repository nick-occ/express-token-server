const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');

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
    params.append('username', jwt.verify(body.username, config.token_secret));
    params.append('password', jwt.verify(body.password, config.token_secret));

    axios.post(config.token_url, params)
    .then((response) => {
        jwt.sign(response.data.token, config.token_secret, (err, signedToken) => {
            res.set('x-esri-token', signedToken).send({token: signedToken});
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
})

app.listen(3000, () => console.log('Listening on port 3000'));
