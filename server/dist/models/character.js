"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CharacterSchema = new Schema({
    name: { type: String },
    coords: [[{ type: String }]],
}, { collection: "Characters" });
module.exports = mongoose.model("Character", CharacterSchema);
