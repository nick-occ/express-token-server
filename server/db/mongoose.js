const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, {
    "useNewUrlParser": true,
    "user": process.env.DB_USER,
    "pass": process.env.DB_PASS,
    "authSource": process.env.DB
}).then(() => {
    console.log('connected to database');
},(err) => {
    console.log(err);
});

module.exports = {
    mongoose
}
