const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        default: "No title"
    },
    description: {
        type: String,
        default: "No description"
    },
    tags: {
        type: String,
        default: "Genaral"
    },
    department:{
        type: String,
        default: ""
    },
    author:{
        type: String,
        default:"Unknown"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Blogs", BlogSchema);