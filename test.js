'use strict';
var assert = require('assert');
var configurator = require('./');

var configSetup = {
	'baseUrl': 'http://test.com',
	'$prod_baseUrl': 'https://prod.com',
	'endpoints': {
		'users': '<%= baseUrl %>/users',
		'accounts': '<%= baseUrl %>/accounts'
	},
	'interpolation': '<%= foo %>bar',
	'$prod_foo': 'prod foo',
	'$test_foo': 'test foo',
	'nested': {
		'hello': 'hi',
		'$prod_onlyInProduction': 'Only in prod',
		'deep': {
			'abc': 'foobar',
			'$test_abc': 'foobar for test',
		}
	}
};

it('should filter out unnecessarily varibles ', function () {
	var config = configurator(configSetup, 'prod');

	assert.strictEqual(config.foo, 'prod foo' );
	assert.strictEqual(config.nested.onlyInProduction, 'Only in prod' );
	assert.strictEqual(config.nested.deep.abc, 'foobar' );
	assert.strictEqual(config['$test_foo'], undefined );
	assert.strictEqual(config.interpolation, 'prod foobar' );
	assert.strictEqual(config.endpoints.users, 'https://prod.com/users' );


	var configTest = configurator(configSetup, 'test');
	assert.strictEqual(configTest.nested.onlyInProduction,undefined );
	assert.strictEqual(configTest.endpoints.users, 'http://test.com/users' );


});

