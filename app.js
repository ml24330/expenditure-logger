"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
require('dotenv').config();
var PORT = process.env.PORT || 8000;
var schema_1 = __importDefault(require("./graphql/schema"));
mongoose_1.default.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.swmsg.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function () { return console.log('connection established'); });
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'build')));
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: true
}));
app.get('*', function (req, res) {
    return res.sendFile(path_1.default.resolve(__dirname, 'build', 'index.html'));
});
app.listen(PORT, function () { return console.log("Server started on port " + PORT); });
