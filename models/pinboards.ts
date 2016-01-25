"use strict";

import mongoose = require('mongoose');
let PinboardSchema = new mongoose.Schema({
  title: { type: String, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }]
});

export let Pinboard = mongoose.model('Pinboard', PinboardSchema);
