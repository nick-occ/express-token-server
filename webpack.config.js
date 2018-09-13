const path = require('path');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path:'.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path:'.env.development'});
}