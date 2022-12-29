const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const express = require('express');

let gfs, gridfsBucket;
const router = express.Router();

const conn = mongoose.connection;
conn.once("open", function () {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

router.get("/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(res);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.send("image not found" + error);
    }
});

router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});


module.exports = router;