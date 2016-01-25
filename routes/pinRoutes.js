"use strict";
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');
var Pinboard = mongoose.model('Pinboard');
var Pin = mongoose.model('Pin');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
router.post('/', auth, function (req, res, next) {
    Pinboard.findOne({ _id: req.body.pinboard }).exec(function (err, pinboard) {
        if (err)
            return next(err);
        if (!pinboard)
            return next({ status: 404, message: "Pinboard could not be found. Check pinRoutes path." });
        req['pinboard'] = pinboard;
        next();
    });
});
router.post('/', auth, function (req, res, next) {
    var pin = new Pin(req.body);
    pin.created = Date.now();
    pin.deleted = null;
    pin.createdBy = req['payload']._id;
    pin.save(function (err, p) {
        if (err)
            return next(err);
        if (!p)
            return next({ message: 'Error saving comment. Check pinRoutes path.' });
        req['pinboard'].pins.push(p._id);
        req['pinboard'].save();
        User.update({ _id: req['payload']._id }, { $push: { pins: p._id } }, function (err, result) {
            if (err)
                return next(err);
            p.populate('createdBy', 'email username', function (err, com) {
                res.send(p);
            });
        });
    });
});
router.delete('/:id', auth, function (req, res, next) {
    Pin.update({ _id: req.params.id }, { deleted: Date.now() }, function (err, result) {
        if (err)
            return next(err);
        res.send({ message: 'Deleted the comment.' });
    });
});
module.exports = router;
