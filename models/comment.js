const mongoose = require('mongoose');

const CommentSchema =  mongoose.Schema({
    inhoud: {
        type: String,
        required: true
    },
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    beoordeling: {
        type: Number,
        default: 0,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }
});


CommentSchema.pre('remove', function (next) {
    this.model('Post').update({}, { $pull: {comments: this._id}}, {safe: true, multi: true}, next);
})

const Comment = module.exports = mongoose.model('Comment', CommentSchema);



