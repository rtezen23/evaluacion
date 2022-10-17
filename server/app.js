const express = require('express');
var cors = require('cors');
const path = require('path');

const { usersRouter } = require('./routes/users.routes');
const { fichasRouter } = require('./routes/fichas.routes');
const { viewsRouter } = require('./routes/views.routes');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/fichas', fichasRouter);
app.use('/*', viewsRouter);

module.exports = { app };