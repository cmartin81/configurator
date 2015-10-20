# json-configurator

Configuration tool for loading json that contains environment variables. 
It supports variables which is deeply nested!!
Prefix your environment variables with *$* and postfix it with *_*  (se example)
```
var config = {
  apiEndpoint : 'https://test.com',
  $prod_apiEndpoint' : 'https://prod.com'
  $local_apiEndpoint' : 'http://localhost:8080'
};

require('json-configurator')(configJson, 'prod').apiEndpoint; // https://prod.com
require('json-configurator')(configJson, 'local').apiEndpoint; // http://localhost:8080
require('json-configurator')(configJson, 'foobar').apiEndpoint; // https://test.com
```


## Install

```
$ npm install --save json-configurator
```


## Usage

```js
var configJson = {
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

```

## License

MIT © [cmartin81](https://github.com/cmartin81)
