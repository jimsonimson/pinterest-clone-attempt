"use strict";
var express = require("express");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var router = express.Router();
var Pinboard = mongoose.model("Pinboard");
var User = mongoose.model('User');
var Pin = mongoose.model('Pin');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/', function (req, res, next) {
    Pinboard.find({})
        .exec(function (err, pinboards) {
        if (err)
            return next(err);
        res.json(pinboards);
    });
});
router.get('/:id', function (req, res, next) {
    Pinboard.findOne({ _id: req.params.id })
        .populate('createdBy', 'username email')
        .populate('pins')
        .populate('pins.createdBy', 'username email')
        .exec(function (err, pinboard) {
        Pin.populate(pinboard.pins, { path: 'createdBy', select: 'username email' }, function (err, out) {
            if (err)
                return next(err);
            if (!pinboard)
                return next({ message: 'Could not find your pinboard.' });
            pinboard.pins = pinboard.pins.filter(function (pin) { return (pin.deleted === null); });
            res.send(pinboard);
        });
    });
});
router.post('/', auth, function (req, res, next) {
    var newPinboard = new Pinboard(req.body);
    newPinboard.createdBy = req['payload']._id;
    newPinboard.save(function (err, pinboard) {
        if (err)
            return next(err);
        User.update({ _id: req['payload']._id }, { $push: { 'pinboards': pinboard._id } }, function (err, results) {
            if (err)
                return next(err);
            res.send(pinboard);
        });
    });
});
router.put('/:_id', function (req, res, next) {
    Pinboard.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: 'Could not find and update the book' });
        res.send(result);
    });
});
module.exports = router;
