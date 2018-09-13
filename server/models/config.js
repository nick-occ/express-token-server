var mongoose = require('mongoose');

var ConfigSchema = new mongoose.Schema({
    name: 'string',
    mapService: 'string',
    basemap:  'string',
    center:  'array',
    zoom:  'number'
})

var Config = mongoose.model('Config', ConfigSchema);

module.exports = {Config};