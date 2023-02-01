const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const descriptionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Desciption", descriptionSchema);
