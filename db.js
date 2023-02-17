require('dotenv').config();
const mongoose = require("mongoose");


function ConnectToDB(){
    mongoose.connect(process.env.DB_STR,{useNewUrlParser: true,
    useUnifiedTopology: true})

    const db = mongoose.connection

    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
}


module.exports = ConnectToDB 