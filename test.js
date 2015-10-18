'use strict';
var assert = require('assert');
var configurator = require('./');

var configSetup = {
	'foo': 'foo',
	'bar': 'bar',
	'$prod_foo': 'prod foo',
	'$test_foo': 'test foo',
	'nested': {
		'hello': 'hi',
		'$prod_secret': 'this is secret',
		'deep': {
			'abc': 'foobar',
			'$test_abc': 'foobar for test'
		}
	}
};

it('should filter out unnecessarily varibles ', function () {
	var config = configurator(configSetup, 'prod');

	assert.strictEqual(config.foo, 'prod foo' );
	assert.strictEqual(config.nested.secret, 'this is secret' );
	assert.strictEqual(config.nested.deep.abc, 'foobar' );
	assert.strictEqual(config['$test_foo'], undefined );

});

