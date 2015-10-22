var _ = require('lodash');
var regForStaging = /^\$\w*?_/;

function processSection(variables, stage) {
	var result = {};
	_.forEach(variables, function (val, key) {
		if (typeof val === 'object') {
			var innerSection = processSection(val, stage);
			result[key] = innerSection;
		} else if (key.indexOf('$' + stage + '_') === 0) {
			var newKey = key.substring(stage.length + 2);
			result[newKey] = val;
		} else if (regForStaging.exec(key) === null && result[key] === undefined) {
			result[key] = val;
		}
	});
	return result;
}

function bindReferences(orgJson, variables) {
	var result = {};
	_.forEach(variables, function (val, key) {
		if (typeof val === 'object') {
			var innerSection = bindReferences(orgJson, val);
			result[key] = innerSection;
		} else if (regForStaging.exec(key) === null && result[key] === undefined) {
			result[key] = _.template(val)(orgJson);
		}
	});
	return result;
}

var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });

function process(variables, stage){
	var json = processSection(variables, stage);
	var result = bindReferences(json, json);
	return result;
}

module.exports = process;
