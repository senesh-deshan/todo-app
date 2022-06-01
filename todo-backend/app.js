import express from 'express';

const app = express();


app.get('/', (req, res) => {
    res.send('OK')
})


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