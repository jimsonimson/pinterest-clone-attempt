"use strict";
import mongoose = require('mongoose');

let PinSchema = new mongoose.Schema({
  pintitle: { type: String, required: true },
  imgurl: { type: String, required: true },
  created: { type: Number, default: Date.now },
  deleted: { type: Number, default: null },
  pinboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Pinboard', required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export let Pin = mongoose.model('Pin', PinSchema);
