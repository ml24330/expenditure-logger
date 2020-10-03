"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var schema_1 = __importDefault(require("./graphql/schema"));
mongoose_1.default.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.swmsg.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function () { return console.log('connection established'); });
var app = express_1.default();
app.use(cors_1.default());
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: true
}));
app.listen(8000, function () { return console.log('started listening'); });
