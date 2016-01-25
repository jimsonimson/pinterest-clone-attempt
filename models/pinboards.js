"use strict";
var mongoose = require('mongoose');
var PinboardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }]
});
exports.Pinboard = mongoose.model('Pinboard', PinboardSchema);
