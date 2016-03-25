[![Build Status](https://travis-ci.org/cmartin81/configurator.svg)](https://travis-ci.org/cmartin81/configurator)
# json-configurator

Configuration tool for loading json that contains environment variables and self references. 
It also supports variables which is deeply nested!!
Prefix your environment variables with *$* and postfix it with *_* (se example). To reference to another variable inside the same json prefix it with <%= and postfix it with %>

I´ve added a CLI utility for this package.

Se examples:

```
var config = {
  apiEndpoint : 'https://test.com',
  $prod_apiEndpoint' : 'https://prod.com'
  $local_apiEndpoint' : 'http://localhost:8080'
  userEndpoint: '<%= apiEndpoint %>/users'
};

require('json-configurator')(configJson, process.env.STAGE ).userEndpoint;  // let say that STAGE === 'prod' 
// https://prod.com/users

require('json-configurator')(configJson, 'local').userEndpoint; 
// http://localhost:8080/users

require('json-configurator')(configJson, 'foobar').userEndpoint; 
//https://test.com/users

require('json-configurator')(configJson).userEndpoint; 
//https://test.com/users

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

## install CLI

```
$ npm install -g json-configurator
```

## Usage CLI


First create a json file:

	$ echo '{"a":111, "$prod_a":999}' > test.json

	# with pipe	
	$ cat test.json | json-configurator  // => {a:111}
	$ cat test.json | json-configurator -e prod  // => { a: 999 }

	# with argument
	$ json-configurator  test.json // => {a:111}
	$ json-configurator -e prod  test.json // => { a: 999 }


## License

MIT © [cmartin81](https://github.com/cmartin81)
