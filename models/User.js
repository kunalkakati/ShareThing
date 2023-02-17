const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;