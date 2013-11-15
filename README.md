#event-router

Event-based distributed middleware with transparent support for EventEmitter and socket events.


#Examples


All examples below require the 'event-router' module:

``` js
var eventRouter = require('event-router');
```


## One emitter, same listener

The following code does not print "Hey!" as is might be expected. That is because 'event-router' emitters do not listen to their own events:

``` js
var emitter = eventRouter.bind();

emitter.on('hey', function() {
    console.log('Hey!');            // Does not log
});

emitter.emit('hey');
```


## One emitter, different listener

The proper way to use 'event-router' emitters is to listen to events, not to particular event emitters:

``` js
var emitter = eventRouter.bind();
var listener = eventRouter.bind();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');
});

emitter.emit('hey');
```

In the previous code, 'listener' knows nothing about 'emitter', only about the 'hey' event.


## One listener, many emitters

Since a listener only knows about events and not where they come from, they can listen to the same event even when its emitted by different emitters:

``` js
var emitter1 = eventRouter.bind();
var emitter2 = eventRouter.bind();
var listener = eventRouter.bind();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');     // Prints twice
});

emitter1.emit('hey');
emitter2.emit('hey');
```

## One emitter, many listeners

Likewise, since an emitter does not know who is going to listen to its events, many listeners can listen to the same event:

``` js
var emitter = eventRouter.bind();

var listener1 = eventRouter.bind();
var listener2 = eventRouter.bind();
var listener3 = eventRouter.bind();

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
var emitter1 = eventRouter.bind();
var emitter2 = eventRouter.bind();

var listener1 = eventRouter.bind();
var listener2 = eventRouter.bind();
var listener3 = eventRouter.bind();

listener1.on('hey', function (){
    console.log('"hey" event fired listener #1!');
});
listener2.on('hey', function (){
    console.log('"hey" event fired listener #2!');
});
listener3.on('hey', function (){
    console.log('"hey" event fired listener #3!');
});

emitter1.emit('hey');

setTimeout(function() { 
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