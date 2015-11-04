# koa-request-pjax
A simple middleware to grab & set PJAX related headers

## Installation

```
$ npm install koa-request-pjax --save
```

## Example

When this is a PJAX request, an `object` is set on the koa request:

```js
this.request.pjax = {
  container: '#content'
}
```

You can alter this `object` to set PJAX response headers automatically:

```js
// This will set the 'X-PJAX-URL' response header
this.request.pjax.url = "http://localhost:3000/foo/bar";

// This will set the 'X-PJAX-Version' response header
this.request.pjax.version = "v123";
```

```js
var koa = require('koa');
var pjax = require('koa-request-pjax');
var app = koa();

app.use(pjax());
app.use(function *(){
  this.body = 'Hello World';
  
  if (this.request.pjax) {

    /**
      * Do some PJAX-related magic here
      * ...
      */
    
    this.request.pjax.version = "v123";
    
    // Etc...
  }
});

app.listen(3000);
```
