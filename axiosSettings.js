const axios = require('axios')

const summary = axios.create({
    baseUrl: 'https://onionoo.torproject.org/summary'
});

module.exports = summary;