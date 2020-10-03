import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';

require('dotenv').config();

import Schema from './graphql/schema';

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.swmsg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => console.log('connection established'));

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.listen(8000, () => console.log('started listening'));