const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Post = mongoose.model('Post');
let Comment = mongoose.model('Comment')

//get all posts
router.get('/', (req,res,next)=>{
    console.log("alles");
    let query = Post.find().populate('category').populate({path: 'auteur', select: 'username'});
    query.exec((err, posts)=>{
        if(err) throw err;
        res.json(posts);
    })
});

//get one post
router.get('/:id', (req,res,next) =>{
    let query = Post.findById(req.params.id).populate({path: 'comments', populate: {path: 'auteur', select: 'username'}})
                    .populate({path: 'auteur', select: 'username'})
                    .populate('category');
    query.exec((err, post) =>{
    console.log("hi");
    console.log(post);
    if(err) return next(err);
        res.json(post);
    });
});

//new post
router.post('/post', (req,res,next) =>{
    let post = new Post({title: req.body._title, inhoud: req.body.inhoud, auteur: req.body.auteur, category: req.body.category })
    post.save((err,post)=>{
        if(err) return next(err);
        res.json(post);
    });
});

//Edit post
router.put('/:id', (req,res,next) =>{
    Post.findByIdAndUpdate(req.params.id, req.body, (err,post) =>{
        if(err) return next(err);
        res.json(post);
    });
});

//Delete post
router.delete('/:id', (req,res,next) =>{
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;
        Comment.remove({ _id: {$in: post.comments}}, (err) => {
            if(err) throw err;
            Post.findByIdAndRemove(req.params.id, req.body, (err,post) =>{
                if(err) return next(err);
                res.json(post);
            });
        })
    })
    
});

//Delete comment
router.delete('/comment/:id', (req,res,next) =>{
    Comment.findByIdAndRemove(req.params.id, req.body, (err,comment) =>{
        if(err) throw err;
        res.json(comment);
    });
});


router.put('/:id/upvote', (req, res, next) => {
    Post.findById(req.params.id, (err, post)=> {
        if(err) return next(err);
        post.beoordeling += 1;
        res.json(post);
    });
  });
  
router.post('/:id/comments', (req, res, next) => {
    
    let newComment = new Comment({
        inhoud: req.body.inhoud,
        auteur: req.body.auteur,
        post: req.params.id
    });

    newComment.save((err, comment) =>{
        if(err) throw err;
        Post.findById(req.params.id, (err, post) => {
            if(err) return next(err);
            post.comments.push(comment);
            post.save((err, post)=>{
                if(err) throw err;
                res.json(comment);
            })
        });
    });
  });

  
 /*  router.put('/:id1/comments/:id2/upvote', (req, res, next)=> {    

    Comment.findById(req.params.id2, (err, comment) =>{
        if(err) throw err;
jomjklmjm
        comment.beoordeling +=1;
        res.json(comment);
    })
    
     /* Post.findById(req.params.id1, (err, post)=> {
        if(err) return next(err);

        post.getComment(req.params.id1,req.params.id2, (err,comment) =>{
            if(err) throw err;
            
            comment.beoordeling +=1;
            res.json(comment);
        });
    });  

  }); */


module.exports = router;