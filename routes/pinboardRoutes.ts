"use strict";

import express = require("express");
import jwt = require('express-jwt');
let mongoose = require("mongoose");
let router = express.Router();
let Pinboard = mongoose.model("Pinboard");
let User = mongoose.model('User');
let Pin = mongoose.model('Pin');
let auth = jwt({
  // where we find the JWT information
  // use it as req.payload.propertyname
  userProperty: 'payload',
  // secret must match the one on the User model, in the genJWT()
  secret: process.env.JWT_SECRET
});

// GET: /api/pinboards
router.get('/', (req, res, next) => {
  Pinboard.find({})
    .exec((err, pinboards) => {
      if (err) return next(err);
      res.json(pinboards);
    });
});

// GET: /api/pinboards/:id
router.get('/:id', (req, res, next) => {
  Pinboard.findOne({ _id: req.params.id })
  .populate('createdBy', 'username email')
  .populate('pins')
  .populate('pins.createdBy', 'username email')
  .exec((err, pinboard) => {
    Pin.populate(pinboard.pins, {path: 'createdBy', select: 'username email'}, (err, out) => {
    if (err) return next(err);
    if (!pinboard) return next({ message: 'Could not find your pinboard.' });
    pinboard.pins = pinboard.pins.filter((pin) => (pin.deleted === null));
    res.send(pinboard);
    });
  });
});

//POST: /api/pinboards
router.post('/', auth, (req, res, next) => {
  let newPinboard = new Pinboard(req.body);
  newPinboard.createdBy = req['payload']._id;
  newPinboard.save((err, pinboard)=> {
    if (err) return next(err);
    User.update({ _id: req['payload']._id}, { $push: { 'pinboards': pinboard._id}}, (err, results) =>{
      if (err) return next(err);
      res.send(pinboard);
    });
  });
});

//PUT: /api/pinboards/:_id
router.put('/:_id', (req, res, next) =>{
  Pinboard.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, (err, result) => {
    if (err) return next(err);
    if (!result) return next ({ message: 'Could not find and update the book'});
    res.send(result);
  });
});

export = router;
