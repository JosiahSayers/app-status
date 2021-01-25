import bodyParser from 'body-parser';
import express from 'express';
import appsRouter from './routers/apps';
import mongoose from 'mongoose';
import { Environment } from './util/environment';

mongoose.connect(Environment.MONGO_CONN_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(
    () => console.log('Connected to DB'),
    () => {
        console.log('ERROR: Failed to connect to DB');
        process.exit(1);
    }
);

const app = express();

app.set('port', Environment.PORT);
app.use(bodyParser.json());

app.get('/health-check', (req, res) => res.json({ status: 'ok' }));
app.use('/apps', appsRouter);

export default app;
