const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    _id: String,
    courseDescription: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("Course", courseSchema);