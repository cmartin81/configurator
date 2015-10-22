# json-configurator

Configuration tool for loading json that contains environment variables and self references. 
It also supports variables which is deeply nested!!
Prefix your environment variables with *$* and postfix it with *_* (se example). To reference to another variable inside the same json prefix it with <%= and postfix it with %>
Se examples:

```
var config = {
  apiEndpoint : 'https://test.com',
  $prod_apiEndpoint' : 'https://prod.com'
  $local_apiEndpoint' : 'http://localhost:8080'
  userEndpoint: '<%= apiEndpoint %>/users'
};

require('json-configurator')(configJson, 'prod').apiEndpoint; // https://prod.com
require('json-configurator')(configJson, 'prod').userEndpoint; // https://prod.com/users
require('json-configurator')(configJson, 'local').apiEndpoint; // http://localhost:8080
require('json-configurator')(configJson, 'local').userEndpoint; // http://localhost:8080/users
require('json-configurator')(configJson, 'foobar').apiEndpoint; // https://test.com
require('json-configurator')(configJson, 'foobar').userEndpoint; // https://test.com/users
```


## Install

```
$ npm install --save json-configurator
```


## Usage

```js
var configJson = {
  'baseUrl': 'http://test.com',
  '$prod_baseUrl': 'https://prod.com',
  'endpoints': {
    'users': '<%= baseUrl %>/users',
	'accounts': '<%= baseUrl %>/accounts'
	},
  foo: 'bar',
  foobar: 'foobar',
  $prod_foo: 'foo in prod',
  $test_foo: 'foo in test',
  deep:{
    veryDeep: {
      publicKey: 'abc',
      secret: 'secret',
      $prod_secret: 'super secret'
    }
  }
};

var config = require('json-configurator')(configJson, 'prod');

console.log(config.deep.veryDeep.secret) 
// super secret

console.log(config.endpoints.users)
// https://prod.com/users

```

## License

MIT © [cmartin81](https://github.com/cmartin81)
