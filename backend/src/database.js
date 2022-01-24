const mongoose = require('mongoose');
require('dotenv').config();

//mongoose.connect('mongodb://localhost/angular-auth', { //
mongoose.connect(process.env.CONNECTION_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));