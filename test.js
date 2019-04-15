"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
function TestComponent(_a) {
    var start = _a.start, name = _a.name, hooks = _a.hooks;
    var setState = hooks.setState;
    var _b = setState(start), counter = _b[0], setCounter = _b[1];
    console.log(name, counter);
    setTimeout(function () { return setCounter(counter + 1); }, 1000);
}
exports.Test = lib_1.withHooks(TestComponent);
var t1 = exports.Test()({ name: "start", start: 0 });
var t2 = exports.Test()({ name: "start", start: 1000 });
