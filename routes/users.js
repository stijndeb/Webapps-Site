const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


//Register
router.post('/register',(req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        }else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

//authenticate
router.post('/authenticate',(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, process.env.secret, {
                    expiresIn: 604800 // 1 week in seconds
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

//profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

//validate
router.get('/validate',(req, res, next) => {
    res.send('VALIDATE');
});

router.post('/checkemail', function(req, res, next){
    User.find({email: req.body.email}, function(err, result){
        if(result.length){
            res.json({'email': 'alreadyexists'})
        }else { res.json({'email': 'ok'})
        }
    });
});

router.post('/checkusername', function(req, res, next){
    User.find({username: req.body.username}, function(err, result){
        if(result.length){
            res.json({'username': 'alreadyexists'})
        }else { res.json({'username': 'ok'})
        }
    });
});



module.exports = router;

