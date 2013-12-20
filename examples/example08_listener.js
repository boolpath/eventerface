// GLOBAL NAMESPACE - ONE LISTENER (IN THIS FILE), MANY EMITTERS (IN OTHER FILES)
var eventerface = require('../eventerface');

// Create a global namespace by providing the desired name
// and a callback function to receive the evented interface object
eventerface.create('/app', function (app) {
    // Handle events emitted by other members of the 'app' global namespace
    app.on('helloWorld', function () {
        console.log('Hello world!');
    });
});

/* OUTPUT:
    'Hello world!'      // from emitter 1
    'Hello world!'      // from emitter 2
*/