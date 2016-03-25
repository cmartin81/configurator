#!/usr/bin/env node
"use strict";

const fs = require('fs');
const _ = require('lodash');
const config = require('../index.js');
const argv = require('optimist').argv;

if (_.isEmpty(argv._ )) {
	process.stdin.on('readable', function (){
		const chunk = process.stdin.read();
		if (chunk !== null) {
			console.log(parseResult(chunk, argv.e));
			process.exit(0);
		}
		console.log('Usage: json-configurator -e [environment] <file>');
		console.log('Please specify a file to parse');
		process.exit(1);
	});
} else {
	const file = fs.readFileSync(argv._[0]).toString();
	console.log(parseResult(file, argv.e));
}

function parseResult(text, env) {
	try {
		return config(JSON.parse(text), env)
	} catch (err) {
		console.log('ERROR: Input is not formatted as json');
		process.exit(1)
	}
}

