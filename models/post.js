const mongoose = require('mongoose');

//post schema
const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    inhoud: {
        type: String,
        required: true
    },
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    beoordeling: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category"
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    datum: {
        type: Date,
        default: Date.now
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);






