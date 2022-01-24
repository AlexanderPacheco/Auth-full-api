const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true //Agrega automaticamente los campos created_at y updated_at
});

module.exports = model('User', userSchema, 'users'); //Esto permite interactual con la BD