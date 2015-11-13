var _ = require('lodash');
var regForStaging = /^\$\w*?_/;

function isStagingVariable(key, stage) {
	return key.indexOf('$' + stage + '_') === 0;
}

function processSection(variables, stage) {
	var result = {};
	_.forEach(variables, function (val, key) {
		if (isStagingVariable(key, stage)) {
			var newKey = key.substring(stage.length + 2);
			var innerSection = typeof val === 'object' ? processSection(val, stage): val;
			result[newKey] = innerSection;
		} else if (regForStaging.exec(key) === null && result[key] === undefined) {
			var innerSection = typeof val === 'object' ? processSection(val, stage): val;
			result[key] = innerSection;
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
			if (typeof val === 'string'){
				result[key] = _.template(val)(orgJson);
			} else {
				result[key] = val;
			}
		}
	});
	return result;
}

function process(variables, stage){
	var json = processSection(variables, stage);

	var result = bindReferences(json, json);
	return result;
}


module.exports = process;


