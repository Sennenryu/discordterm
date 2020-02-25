"use strict";

var Err = require("err");

try {
    module.exports = require("lwip");
} catch (e) {
    e = new Err("Failed to load lwip. Use GraphicsMagick instead.", "CANNOT_LOAD_LWIP", { reason: e });
    module.exports = {
        open: function open(source, type, cb) {
            return cb ? cb(e) : type(e);
        },
        create: function create(width, height, color, cb) {
            return cb(e);
        }
    };
}