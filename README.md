#eventerface

Evented API development framework for distributed, loosely coupled architectures.

# USAGE

## Local (same file)
``` js
// Create an local event namespace 'app'
var app = require('eventerface').create(),
    emitter = new app.emitter(),
    listener = new app.emitter();

listener.on('hey', function () {
    console.log('hey');
});
emitter.emit('hey');
```  

## Global (different files, same file system)
``` js
var eventerface = require('eventerface');
// Create an events namespace
eventerface.create('/app', function (app) {
    // Start emitting and listening to events using the provided 'app' emitter
    app.on('/web/register', function (user) {
        app.emit('/db/newUser/', user);
    }); 
});
```  

## Distributed (different file systems)


## What's wrong with traditional event emitters?


## Why evented APIs?


#Examples


All examples below require the 'eventerface' module:

``` js
var eventerface = require('eventerface');
```

## NAMESPACES

### Global namespaces

## One emitter, same listener

The following code does not print "Hey!" as is might be expected. That is because 'eventerface' emitters do not listen to their own events:

``` js
// Create a global namespace by providing the desired name
// and a callback function to receive the evented interface object
eventerface.create('/app', function (app) {
    // Start emitting and listening to events using the provided 'app' emitter
    app.on('hey', function () {
        console.log('Hey!');
    });
    app.emit('hey');
});
```


## One emitter, different listener

The proper way to use 'eventerface' emitters is to listen to events, not to particular event emitters:

``` js
var emitter = eventerface.emitter();
var listener = eventerface.emitter();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');
});

emitter.emit('hey');
```

In the previous code, 'listener' knows nothing about 'emitter', only about the 'hey' event.


## One listener, many emitters

Since a listener only knows about events and not where they come from, they can listen to the same event even when its emitted by different emitters:

``` js
var emitter1 = eventerface.emitter();
var emitter2 = eventerface.emitter();
var listener = eventerface.emitter();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');     // Prints twice
});

emitter1.emit('hey');
emitter2.emit('hey');
```

## One emitter, many listeners

Likewise, since an emitter does not know who is going to listen to its events, many listeners can listen to the same event:

``` js
var emitter = eventerface.emitter();

var listener1 = eventerface.emitter();
var listener2 = eventerface.emitter();
var listener3 = eventerface.emitter();

listener1.on('hey', function () {
    console.log('"Hey" event fired listener #1!');
});
listener2.on('hey', function () {
    console.log('"Hey" event fired listener #2!');
});
listener3.on('hey', function () {
    console.log('"Hey" event fired listener #3!');
});

emitter.emit('hey');
```

The output of the previous code should be:
``` js
'"hey" event fired listener #1!'
'"hey" event fired listener #2!'
'"hey" event fired listener #3!'
```

## Many emitters, many listeners

Now, combining the two previous examples, it is also possible to have a set of listeners listening to a particular event that is emitted by different emitters:

``` js
var emitter1 = eventerface.emitter();
var emitter2 = eventerface.emitter();

var listener1 = eventerface.emitter();
var listener2 = eventerface.emitter();
var listener3 = eventerface.emitter();

listener1.on('hey', function () {
    console.log('"hey" event fired listener #1!');
});
listener2.on('hey', function () {
    console.log('"hey" event fired listener #2!');
});
listener3.on('hey', function () {
    console.log('"hey" event fired listener #3!');
});

emitter1.emit('hey');

setTimeout(function () { 
    emitter2.emit('hey');
}, 1000);
```

The previous code should print three lines, and the same three lines again after 1000 ms: 
``` js
    '"hey" event fired listener #1!'
    '"hey" event fired listener #2!'
    '"hey" event fired listener #3!'
    '"hey" event fired listener #1!'  // 1000 ms later
    '"hey" event fired listener #2!'  // 1000 ms later
    '"hey" event fired listener #3!'  // 1000 ms later
```
