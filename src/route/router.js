const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")
const middleware = require ("../middleware/auth")


// author api
router.post("/authors",authorController.createAuthor);
router.post("/login", authorController.Login)

// blog api
router.post("/blogs",middleware.authentication,blogController.blogcreate); // create blog
router.get("/blogs",middleware.authentication ,blogController.getBlog) // get blog by filter

//update api
router.put("/blogs/:blogId",middleware.authentication,middleware.authorisation,blogController.updateBlog);

// delete api
router.delete("/blogs/:blogId",middleware.authentication,middleware.authorisation,blogController.deleteblog); // delete by id
router.delete("/blogs",middleware.authentication,blogController.deleteByQuery) // delete by query


module.exports = router;