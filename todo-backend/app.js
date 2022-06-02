import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import cors from 'cors';
import userRouter from './src/routes/users.routes.js';
import env from './config.js'

await mongoose.connect(env.db_url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.log)

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(cors({
    credentials: true,
    origin: env.frontend_url
}))


app.get('/', (req, res) => {
    res.send('OK')
})

// Handle User routes 
app.use('/user', userRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(err.status || 404).json({
        message: "Not found"
    })
});

// Internal error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: "Internal error occured"
    })
});

export default app;