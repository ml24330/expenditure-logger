"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var LogSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model("Log", LogSchema);
