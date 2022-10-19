const express = require('express');
var cors = require('cors');
const path = require('path');

const { usersRouter } = require('./routes/users.routes');
const { fichasRouter } = require('./routes/fichas.routes');
const { baseRouter } = require('./routes/base.routes');
const { carterasRouter } = require('./routes/carteras.routes');
const { viewsRouter } = require('./routes/views.routes');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({limit: "5mb", extended: true}))
app.use(express.urlencoded({limit: "5mb", extended: true, parameterLimit: 10000}))

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/fichas', fichasRouter);
app.use('/api/v1/base', baseRouter);
app.use('/api/v1/carteras', carterasRouter);
app.use('/*', viewsRouter);

module.exports = { app };