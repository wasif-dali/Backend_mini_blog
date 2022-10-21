const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required :[ true,"title required"],
        trim :true
    },

    body : {
        type : String,
        required :[ true,"body required"],
        trim:true
    },

    authorId : {
        type : ObjectId,
        required :[true,"authroId reuired"],
        ref : "Author"
    },

    tags : [
        {
            type : String,
            trim:true
        }
    ],

    category : {
        type : String,
        required :[true,"category required"],
        trim:true
    },

    subcategory : [{
        type : [String,"subcategory required"],
        trim:true
    }],

    deletedAt : Date,

    isDeleted : {
        type : Boolean,
        default : false
    },

    publishedAt : Date,

    isPublished : {
        type : Boolean,
        default : false
    }

}, { timestamps : true} )

module.exports = mongoose.model("Blog", blogSchema)