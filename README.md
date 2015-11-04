# koa-request-pjax
A simple middleware to grab & set PJAX related headers

## Installation

```
$ npm install koa-request-pjax --save
```

## Example
```
var koa = require('koa');
var pjax = require('koa-request-pjax');
var app = koa();

app.use(pjax());
app.use(function *(){
  this.body = 'Hello World';
  
  // When this is a PJAX request, an `object` is set on the request:
  // ex: { container: '#content' }
  if (this.request.pjax) {

    /**
      * Do some PJAX-related magic here
      * ...
      */
    
    // This will set the 'X-PJAX-URL' response header
    this.request.pjax.url = "http://localhost:3000/foo/bar";

    // This will set the 'X-PJAX-Version' response header
    this.request.pjax.version = "http://localhost:3000/foo/bar";
  }
});

app.listen(3000);
```
