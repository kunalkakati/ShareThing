const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    collage_id:{
        type: String,
        default: "college.tihu421"
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