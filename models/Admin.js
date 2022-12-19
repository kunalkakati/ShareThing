const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;