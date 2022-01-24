const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/angular-auth', { //
mongoose.connect('mongodb+srv://alexander:aleksson@cluster0.acuz9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));