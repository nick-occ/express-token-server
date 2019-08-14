const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
    name: 'string',
    mapUrl: 'string',
    mapService: 'string',
    basemap:  'string',
    center:  'array',
    zoom:  'number'
});

const Config = mongoose.model('projects', ConfigSchema);

module.exports = {Config};
