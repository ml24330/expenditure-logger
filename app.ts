import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

require('dotenv').config();

const PORT = process.env.PORT || 8000;

import Schema from './graphql/schema';

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.swmsg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => console.log('connection established'));

const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'build')));

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));