"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data = [{
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "1",
        title: "log 1",
        detail: "detail 1",
        amount: 1241,
        currency: 1,
        date: "2020-01-01"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "2",
        title: "log 2",
        detail: "detail 2",
        amount: 130,
        currency: 2,
        date: "2019-11-21"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "3",
        title: "log 3",
        detail: "detail 3",
        amount: 12410,
        currency: 1,
        date: "2020-05-01"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "4",
        title: "log 4",
        detail: "detail 4",
        amount: 12,
        currency: 1,
        date: "2020-08-01"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "5",
        title: "log 5",
        detail: "detail 5",
        amount: 889,
        currency: 1,
        date: "2020-01-09"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "6",
        title: "log 6",
        detail: "detail 6",
        amount: 121,
        currency: 2,
        date: "2020-03-21"
    }, {
        userId: "8",
        id: "7",
        title: "log 7",
        detail: "detail 7",
        amount: 200,
        currency: 1,
        date: "2020-03-10"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "8",
        title: "log 8",
        detail: "detail 8",
        amount: 140,
        currency: 2,
        date: "2020-01-01"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "9",
        title: "log 9",
        detail: "detail 9",
        amount: 110,
        currency: 1,
        date: "2020-01-01"
    }, {
        userId: "7eb1f48a-dc56-44bf-b597-150f9e6f1d51",
        id: "10",
        title: "log 10",
        detail: "detail 10",
        amount: 121,
        currency: 1,
        date: "2019-10-10"
    }];
var _data = {
    find: function (_a) {
        var userId = _a.userId, args = __rest(_a, ["userId"]);
        return data.filter(function (log) { return log.userId === userId; });
    }
};
exports.default = _data;
