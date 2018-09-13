const jwt = require('jsonwebtoken');
const {SHA256} = require('crypto-js');

let token_secret = "affg5eghhjk5664syr646af64hhh3";
let password = 'Google!25';

var token = jwt.sign(password,token_secret);
console.log(token);

var hash = SHA256(password).toString();
console.log(hash);