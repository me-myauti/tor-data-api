const mongoose = require('mongoose');

mongoose.connect('your_connection_string_here').then(()=>{
    console.log('Database: Connected successfully!');
}).catch(error => console.log(error));
mongoose.Promise = global.Promise;

module.exports = mongoose;