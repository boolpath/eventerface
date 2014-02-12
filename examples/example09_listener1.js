// GLOBAL NAMESPACE - ONE EMITTER (IN ANOTHER FILE), MANY LISTENER (ONE IN THIS FILE)
var eventerface = require('../eventerface');

// Find the existing 'app' global namespace
// (created in example09_emitter.js)
eventerface.find('app', function (app) {
    // Handle events emitted by other members of the 'app' global namespace
    app.on('helloWorld', function () {
        console.log('Hello!');
    });
});

/* OUTPUT:
    'Hello!'
    'Hello!'
    'Hello!'
    ...
*/