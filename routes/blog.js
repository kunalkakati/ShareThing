const express = require('express');
const Blogs = require("../models/Blog");
const User = require("../models/User");
const FatchUser = require('../middleware/fatchuser');
const upload = require("../middleware/upload");
const { body, validationResult } = require('express-validator');

const router = express.Router();

//!Route-1(get all user blog from database)
router.get("/fatch_all_blogs", FatchUser, async (req, res) => {
    // console.log("ID:   "+req.user.id);
    try {
        // fatch all notes from database

        const blogs = await Blogs.find({ user: req.user.id});
        res.send(blogs);
    } catch (error) {
        console.log("Problem occured on note routes(/fatch_all_notes)" + error.massage);
        return res.sendStatus(404).send("Internel server error.");
    }

});

//! get all blogs from databases
router.get("/all_blog", async(req,res)=>{
    try {
        // fatch all blogs from database
        const blogs = await Blogs.find({});
        res.send(blogs);
    } catch (error) {
        console.log("Problem occured on note routes(/fatch_all_blogs)" + error.massage);
        return res.sendStatus(404).send("Internel server error.");
    }
})

router.get("/single", async(req,res)=>{
    try {
        // fatch all blogs from database
        const blog = await Blogs.findById(req.body.id);
        res.send(blog);
    } catch (error) {
        console.log("Problem occured on note routes(/fatch_all_blogs)" + error.massage);
        return res.sendStatus(404).send("Internel server error.");
    }
})

//!Route-2 (insert new note to database)
router.post("/add_blogs", FatchUser ,upload.single("file"), [body('description', "Description should not be empty.").isLength({ min: 3 })], async (req, res) => {
    // Handle validation error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        // JS destructuring
        const { title, description, tags } = req.body;
        let user = await User.findOne({_id: req.user.id});
        // if (req.file === undefined) return res.json({'error': "you must select a file."});
        let imgUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        if(req.file !== undefined){
            imgUrl = `http://localhost:5000/api/blog/image/${req.file.filename}`;
        }
        // save to database[title means - title: title (if both name are same)].
        const note = new Blogs({
            user: req.user.id,
            author: user.Username,
            department: user.department,
            imageUrl: imgUrl,
            title, description, tags
        });
        const savedBlog = await note.save();
        res.json(savedBlog);
    } catch (error) {
        console.log("Problem occured on note routes(/add_blogs)" + error.massage);
        return res.sendStatus(404).send("Internel server error.")
    }

});

//!Route-3 (Update notes)
router.put("/update_blog/:id", FatchUser, async (req, res) => {

    try {
        const { title, description, tags } = req.body;
        // create a new object 
        const newNote = {};
        // if user enter new title store to newNote object (same for description or tags)
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tags) { newNote.tags = tags };

        //find the note to be updated.
        let note = await Blogs.findById(req.params.id);
        if (!note) { return res.status(500).send("Not found") }

        // varify the user[check user owns this note]
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not allowed")
        }
        note = await Blogs.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log("Problem occured on blog routes(/add_blogs)" + error.massage);
        return res.sendStatus(404).send("Internel server error.");
    }

});

//!Route-4(Delete blogs)
router.delete("/delete_blog/:id", FatchUser, async (req, res) => {
    try {
        //find the blog to be deleted.v
        let note = await Blogs.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        // varify the user[check user owns this blog]
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Blogs.findByIdAndDelete(req.params.id);
        res.json({ result: "Success" });

    } catch (error) {
        console.log("Problem occured on note routes(/add_notes)" + error);
        return res.sendStatus(404).send("Internel server error.")
    }

});
// !Route-5 (Admin delete)
router.delete("/delete/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        //find the blog to be deleted
        let note = await Blogs.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        // varify the user[check user owns this note]
        note = await Blogs.findByIdAndDelete(req.params.id);
        res.json({ result: "Success" });

    } catch (error) {
        console.log("Problem occured on note routes(/add_notes)" + error);
        return res.sendStatus(404).send("Internel server error.")
    }

});



module.exports = router;