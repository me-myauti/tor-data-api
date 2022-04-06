const mongoose = require('../database');

const dataSchema = new mongoose.Schema({
    ip: {
        type: String,
        require: true,
        unique: true
    }
})

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;