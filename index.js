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

module.exports = processSection;
