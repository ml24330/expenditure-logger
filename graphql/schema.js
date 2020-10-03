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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var uuid_1 = require("uuid");
var log_js_1 = __importDefault(require("../models/log.js"));
var CurrencyEnumType = new graphql_1.GraphQLEnumType({
    name: 'currencies',
    values: {
        HKD: {
            value: 1
        },
        GBP: {
            value: 2
        }
    }
});
var Log = new graphql_1.GraphQLObjectType({
    name: 'Log',
    description: 'Represent the type of a log containing details of a transaction',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        detail: { type: graphql_1.GraphQLString },
        amount: { type: graphql_1.GraphQLFloat },
        currency: { type: CurrencyEnumType },
        date: { type: graphql_1.GraphQLString }
    }); }
});
var LogByDate = new graphql_1.GraphQLObjectType({
    name: 'LogByDate',
    description: 'Represent info about logs recorded on a given day',
    fields: function () { return ({
        date: { type: graphql_1.GraphQLString },
        HKD_amount: { type: graphql_1.GraphQLFloat },
        GBP_amount: { type: graphql_1.GraphQLFloat },
        count: { type: graphql_1.GraphQLInt },
        logs: { type: graphql_1.GraphQLList(Log) }
    }); }
});
var Query = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root query object',
    fields: {
        logs: {
            type: new graphql_1.GraphQLList(Log),
            args: {
                userId: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                id: { type: graphql_1.GraphQLString },
                minAmount: { type: graphql_1.GraphQLFloat },
                maxAmount: { type: graphql_1.GraphQLFloat },
                minDate: { type: graphql_1.GraphQLString },
                maxDate: { type: graphql_1.GraphQLString },
                currency: { type: CurrencyEnumType },
                title: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var logs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, log_js_1.default.find({ userId: args.userId })];
                        case 1:
                            logs = _a.sent();
                            if (args.id) {
                                logs = logs.filter(function (log) { return log.id === args.id; });
                            }
                            if (args.currency) {
                                logs = logs.filter(function (log) { return log.currency === args.currency; });
                            }
                            if (args.minAmount) {
                                logs = logs.filter(function (log) { return log.amount > args.minAmount; });
                            }
                            if (args.maxAmount) {
                                logs = logs.filter(function (log) { return log.amount < args.maxAmount; });
                            }
                            if (args.minDate) {
                                logs = logs.filter(function (log) { return log.date > args.minDate; });
                            }
                            if (args.maxDate) {
                                logs = logs.filter(function (log) { return log.date < args.maxDate; });
                            }
                            if (args.title) {
                                logs = logs.filter(function (log) { return log.title.includes(args.title); });
                            }
                            return [2 /*return*/, logs];
                    }
                });
            }); }
        },
        logsByDate: {
            type: new graphql_1.GraphQLList(LogByDate),
            args: {
                userId: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var logs, logsByDateArray;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, log_js_1.default.find({ userId: args.userId })];
                        case 1:
                            logs = _a.sent();
                            logs = logs.filter(function (log) { return new Date().getTime() - new Date(log.date).getTime() < 365 * 24 * 60 * 60 * 1000; }); // Only return recent data
                            logsByDateArray = [];
                            logs.forEach(function (log) {
                                var dateObject = logsByDateArray.find(function (item) { return item.date === log.date; });
                                if (!dateObject) {
                                    if (log.currency === 1) {
                                        logsByDateArray.push({ date: log.date, GBP_amount: 0, HKD_amount: log.amount, count: 1, logs: [log] });
                                    }
                                    else if (log.currency === 2) {
                                        logsByDateArray.push({ date: log.date, GBP_amount: log.amount, HKD_amount: 0, count: 1, logs: [log] });
                                    }
                                }
                                else {
                                    if (log.currency === 1) {
                                        dateObject.HKD_amount += log.amount;
                                    }
                                    else if (log.currency === 2) {
                                        dateObject.GBP_amount += log.amount;
                                    }
                                    dateObject.count++;
                                    dateObject.logs.push(log);
                                }
                            });
                            logsByDateArray = logsByDateArray.map(function (item) { return (__assign(__assign({}, item), { HKD_amount: Math.round(item.HKD_amount), GBP_amount: Math.round(item.GBP_amount) })); });
                            return [2 /*return*/, logsByDateArray];
                    }
                });
            }); }
        },
        logsByMonth: {
            type: new graphql_1.GraphQLList(LogByDate),
            args: {
                userId: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var logs, logsByDateArray;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, log_js_1.default.find({ userId: args.userId })];
                        case 1:
                            logs = _a.sent();
                            logs = logs.filter(function (log) { return new Date().getTime() - new Date(log.date).getTime() < 2 * 365 * 24 * 60 * 60 * 1000; }); // Only return recent data
                            logsByDateArray = [];
                            logs.forEach(function (log) {
                                var logMonth = log.date.slice(0, -3);
                                var dateObject = logsByDateArray.find(function (item) { return item.date === logMonth; });
                                if (!dateObject) {
                                    if (log.currency === 1) {
                                        logsByDateArray.push({ date: logMonth, GBP_amount: 0, HKD_amount: log.amount, count: 1, logs: [log] });
                                    }
                                    else if (log.currency === 2) {
                                        logsByDateArray.push({ date: logMonth, GBP_amount: log.amount, HKD_amount: 0, count: 1, logs: [log] });
                                    }
                                }
                                else {
                                    if (log.currency === 1) {
                                        dateObject.HKD_amount += log.amount;
                                    }
                                    else if (log.currency === 2) {
                                        dateObject.GBP_amount += log.amount;
                                    }
                                    dateObject.count++;
                                    dateObject.logs.push(log);
                                }
                            });
                            logsByDateArray = logsByDateArray.map(function (item) { return (__assign(__assign({}, item), { HKD_amount: Math.round(item.HKD_amount), GBP_amount: Math.round(item.GBP_amount) })); });
                            return [2 /*return*/, logsByDateArray];
                    }
                });
            }); }
        }
    }
});
var Mutation = new graphql_1.GraphQLObjectType({
    name: 'RootMutation',
    description: 'The root mutation object',
    fields: {
        addLog: {
            type: Log,
            args: {
                userId: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                title: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                detail: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                amount: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
                currency: { type: graphql_1.GraphQLNonNull(CurrencyEnumType) },
                date: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (args.userId === '1') {
                                throw Error('Sample data cannot be modified!');
                            }
                            if (args.amount.toString().split('.')[1] && args.amount.toString().split('.')[1].length > 2) {
                                throw Error('You can have at most two decimal places!');
                            }
                            if (!args.date) {
                                args.date = new Date().toISOString().split('T')[0];
                            }
                            log = new log_js_1.default({
                                userId: args.userId,
                                id: uuid_1.v4(),
                                title: args.title,
                                detail: args.detail,
                                amount: args.amount,
                                currency: args.currency,
                                date: args.date
                            });
                            return [4 /*yield*/, log.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, log];
                    }
                });
            }); }
        },
        deleteLog: {
            type: Log,
            args: {
                userId: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var log;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (args.userId === '1') {
                                throw Error('Sample data cannot be modified!');
                            }
                            return [4 /*yield*/, log_js_1.default.findOneAndDelete({ userId: args.userId, id: args.id })];
                        case 1:
                            log = _a.sent();
                            if (!log) {
                                throw Error('Log not found!');
                            }
                            return [2 /*return*/, log];
                    }
                });
            }); }
        },
        editLog: {
            type: Log,
            args: {
                userId: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                title: { type: graphql_1.GraphQLString },
                detail: { type: graphql_1.GraphQLString },
                amount: { type: graphql_1.GraphQLFloat },
                currency: { type: CurrencyEnumType },
                date: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var log, newLog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (args.userId === '1') {
                                throw Error('Sample data cannot be modified!');
                            }
                            return [4 /*yield*/, log_js_1.default.findOne({ userId: args.userId, id: args.id })];
                        case 1:
                            log = _a.sent();
                            if (!log) {
                                throw Error('Log not found!');
                            }
                            if (args.amount.toString().split('.')[1] && args.amount.toString().split('.')[1].length > 2) {
                                throw Error('You can have at most two decimal places!');
                            }
                            newLog = {
                                userId: args.userId,
                                id: args.id,
                                title: args.title || log.title,
                                detail: args.detail || log.detail,
                                amount: args.amount || log.amount,
                                currency: args.currency || log.currency,
                                date: args.date || log.date
                            };
                            return [4 /*yield*/, log_js_1.default.updateOne({ id: args.id }, newLog)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, newLog];
                    }
                });
            }); }
        }
    }
});
var Schema = new graphql_1.GraphQLSchema({
    query: Query,
    mutation: Mutation
});
exports.default = Schema;
