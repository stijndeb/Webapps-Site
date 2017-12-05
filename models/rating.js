const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    beoordeling: {
        type: Number,
        required: true
    }
});

RatingSchema.pre('remove', function (next) {
    this.model('Post').update({}, { $pull: {beoordeling: this._id}}, {safe: true, multi: true}, next);
});

const Rating = module.exports = mongoose.model('Rating', RatingSchema);
