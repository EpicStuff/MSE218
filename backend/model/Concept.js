const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conceptSchema = new Schema({
    uniqueID: {
        type: Number, 
        required: true,
        unique: true     // note that this only works when there's no problems of duplicates already in the database
    },
    name: {
        type: String,
        required: true
    },
    parent: {
        type: Number
    },
    description: {
        type: String
    },
    colour: {
        type: String
    },
    shape: {
        type: String
    },
    courses: {
        type: Array
    },    
    related: {
        type: Array
    },
    LaTeX: {
        type: Boolean
    }, 
    leaf: {
        type: Boolean
    }
})


module.exports = mongoose.model("Concept", conceptSchema);

