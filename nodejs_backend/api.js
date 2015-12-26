'use strict';

var exec = require('child_process').exec;
var path = require('path');

var express = require('express');
var router = express.Router();

var parser = require(path.resolve(__dirname, './stdout2json.js'));

router.get('/', (req, res) => {
	var query = req.query.q || '';
	var mode = req.query.m || 'normal';
	var distance = parseInt(req.query.d, 10) || 0;

	if (query === '') {
		res.json('Please input query');
		return;
	}

	var command = ['python3', path.resolve(__dirname, '../searchText_for_nodejs.py'), '\"' + query + '\"', mode, distance].join(' ');
	console.log('command :', command);

	exec(command, {
		maxBuffer: 10 * 1024 * 1024
	}, (error, stdout, stderr) => {
		if (error) {
			res.json(error);
		} else {
			// console.log('stdout: ' + stdout);
			console.log('info :', stderr);
			res.json(parser(stdout));
		}
	});
});

module.exports = router;
