"use strict";
var test = require("blue-tape");
var theon = require("theon");
test('theon exists', function (t) {
    t.plan(1);
    t.notEquals(theon, undefined);
});
