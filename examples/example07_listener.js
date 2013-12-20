// GLOBAL NAMESPACE - ONE LISTENER, DIFFERENT EMITTER (IN ANOTHER FILE)
var eventerface = require('../eventerface');

// Find the existing 'app' global namespace
// (created in example07_emitter.js)
eventerface.find('/app', function (app) {
    // Handle events emitted by other members of the 'app' global namespace
    app.on('helloWorld', function () {
        console.log('Hello world!');
    });
});

/* OUTPUT:
    Hello world!
    Hello world!
    Hello world!
    ...
*/