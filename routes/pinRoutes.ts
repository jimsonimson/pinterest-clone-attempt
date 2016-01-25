"use strict";
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');

let router = express.Router();
let User = mongoose.model('User');
let Pinboard = mongoose.model('Pinboard');
let Pin = mongoose.model('Pin');

let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

//POST: /api/pins
router.post('/', auth, (req, res, next) => {
  Pinboard.findOne({ _id: req.body.pinboard }).exec((err, pinboard)=>{
    if (err) return next(err);
    if (!pinboard) return next({ status: 404, message: "Pinboard could not be found. Check pinRoutes path."});
    req['pinboard'] = pinboard;
    next();
  });
});

//POST: /api/pins --This is called when Pinboard exists and User is Logged In
router.post('/', auth, (req, res, next) => {
  let pin = new Pin(req.body);
  pin.created = Date.now();
  pin.deleted = null;
  pin.createdBy = req['payload']._id;
  pin.save((err, p) => {
    if (err) return next(err);
    if (!p) return next({ message: 'Error saving comment. Check pinRoutes path.'});
    req['pinboard'].pins.push(p._id);
    req['pinboard'].save();
    User.update({ _id: req['payload']._id }, { $push: { pins: p._id }}, (err, result) =>{
      if (err) return next(err);
      p.populate('createdBy', 'email username', (err, com) =>{
        res.send(p);
      });
    });
  });
});

// DELETE: /api/comments/:id
router.delete('/:id', auth, (req, res, next) => {
  Pin.update({ _id: req.params.id }, { deleted: Date.now() }, (err, result) => {
    if (err) return next(err);
    res.send({ message: 'Deleted the comment.' });
  });
});

export = router;
