"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withHooks = function (component) {
    var initialState = {
        order: 0,
        first: true,
        store: {},
        reset: function () { return output(state.props); },
        props: {},
    };
    var initialHooks = function (state) { return ({
        setState: setStateFactory(state)
    }); };
    var output = function (props) {
        state.order = 0;
        return component(__assign({}, props, { hooks: hooks }));
    };
    return function (props) {
        var state = __assign({}, initialState);
        var hooks = __assign({}, initialHooks(state));
        state.props = props;
        return component(__assign({}, props, { hooks: hooks }));
    };
};
function setStateFactory(state) {
    return function (initial) {
        var value = state.store[state.order] = state.first ? initial : state.store[state.order];
        state.first = false;
        var order = state.order;
        state.order += 1;
        var setState = function (newValue) {
            state.store[order] = newValue;
            state.reset();
        };
        return [
            value,
            setState
        ];
    };
}
function run(component) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return component.apply(void 0, args);
}
exports.run = run;
