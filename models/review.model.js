const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    movieId:{
        type: Number
    },
    title:{
        type: String,
    },
    rating:{
        type: Number,
        required: [true, 'rating is required']
    },
    comment:{
        type: String,
        required: [true, 'comment is required'],
        minlength: [10, 'comment must be longer than 10 characters'],
        maxlength: [550, 'comment cannot be more than 550 characters long']
    },
    poster:{
        type: String
    },
    trailer:{
        type: String
    },
    desc:{
        type:String
    }
},{timestamps: true})

module.exports = mongoose.model('Review', ReviewSchema) 