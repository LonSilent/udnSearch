'use strict';

var path = require('path');

var express = require('express');
var app = express();

var logger = require('morgan');

app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, '../frontend')));

app.use('/api', require(path.resolve(__dirname, './api.js')));

app.listen(3000);
