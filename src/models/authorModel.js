const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "first name is requried"],
        trim:true
    },
    lname: {
        type: String,
        required:[ true,"lastname is requried"],
        trim:true
    },
    title: {
        type: String,
        required:[true, "title is required"],
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required: [true,"email required"],
        unique: true,

    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })



module.exports = mongoose.model('Author', authorSchema)