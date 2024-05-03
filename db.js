const mongoose = require('mongoose');

const dbURI = process.env.DB_URL;

mongoose.connect(dbURI)             //To connect database
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
