#eventerface

Evented API development framework for distributed, loosely coupled architectures.

## Why Eventerface? 

### A different way of thinking about events

Node.js event-driven model is awesome, but there is something weird about it: event emitters need to be known by the parties interested in generating events for them. This is not a problem in cases where the parties know and have access to each other, like a conversation between friends:

``` js
var EventEmitter = require('events').EventEmitter,
    friend1 = new EventEmitter(),
    friend2 = new EventEmitter();

// friend1 says 'hi!' to friend2
friend2.emit('say', 'hi!');

// friend2 listens to the 'say' event and answers back to friend1
friend2.on('say', function (message) {
    if (message === 'hi!') {
        friend1.emit('say', 'hi!');
    }
});

// friend1 listens to the 'say' event and continues the conversation
friend1.on('say', function (message) {
    // friend1 continues the conversation
});
```  

However, not all events and interactions in the real world happen between parties that know each other or each other's names (or variables), so a different approach is needed in order to enable decoupled interactions such as conversations between strangers, which are possible in the real world because there is a namespace that carries voice events between them: the air.

### Dealing with events, not event emitters

Using Eventerface, the previous conversation can be written in such a way that it doesn't matter if the parties know each other or not, because the events are emitted into a namespace (e.g. air) using the namespace's event emitter, not the other parties' emitters:

``` js
var eventerface = require('eventerface'),
    air = eventerface.create(), // A namespace that carries events between the member parties
    person1 = new air.emitter(),
    person2 = new air.emitter();

// person1 says 'hi!' to person2
person1.emit('say', 'hi!'); // Notice that person1 uses its own emitter instead of person2's

// person2 listens to the 'say' event, and answers back to person1
person2.on('say', function (message) {
    if (message === 'hi!') {
        person2.emit('say', 'hi!'); // Notice that person2 used its own emitter, not person1's
    }
});

// person1 listens to the 'say' event and continues the conversation
person1.on('say', function (message) {
    // person1 continues the conversation
});

```  

In this way, a party that wants to emit an event only needs to emit it into a given namespace, and it will be automatically routed to all the listeners subscribed to that event in the same namespace (e.g. people in the same room). Notice that thinking about events by themselves, and not about their event emitters, causes a change in notation that makes more sense when reading the code, because when a person wants so say something, she uses her own mouth (i.e. calls her own #emit method), not the target person's mouth (or #emit method).

# Usage

### Local (same file)
``` js
// Create the 'app' local namespace
var app = require('eventerface').create(),
    emitter = new app.emitter(),
    listener = new app.emitter();

listener.on('hey', function () {
    console.log('hey');
});
emitter.emit('hey');
```  

### Global (different files, same file system)
Eventerface enables the creation of event namespaces that are accessible from more than one file in the same file system by using a unix socket server to create a global namespace.

First, the global namespace has to be created in the designated main file using the #create method:
``` js
// main.js
var eventerface = require('eventerface');

// Create the 'app' global namespace
eventerface.create('/app', function (app) {
    app.on('/database/ready', function () { // Subscribe to events of the 'app' namespace
        app.emit('/database/query', query); // Emit events into the 'app' namespace
    });
});
```  

Then, any other files in the application folder can get access to the created global namespace using the #find method:
``` js
// database.js
var eventerface = require('eventerface');

// Find the 'app' global namespace
eventerface.find('/app', function (app) {
    app.on('/database/query', function (query) { // Subscribe to events of the 'app' namespace
        // Query the database
    });
    app.emit('/database/ready');                 // Emit events into the 'app' namespace
});
```  

In this usage example, the main.js module listens to the 'ready' event of the database module and then emits a 'query' event to the database. Notice that the modules know nothing about the origin of the events nor the location of the other modules, because Eventerface emitters only care about event names and interact directly with the namespace itself, not with event emitters.

### Distributed (different file systems)
``` js

```

# Evented APIs

# Examples

# License

MIT



