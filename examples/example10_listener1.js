// GLOBAL NAMESPACE - 
// MANY EMITTERS (IN OTHER FILES), 
// MANY LISTENERS (ONE IN THIS FILE),
// SEPARATE INTERFACE CREATOR (IN ANOTHER FILE)
var eventerface = require('../eventerface');

// Find the existing 'app' global namespace
// (created in example9_emitter.js)
eventerface.find('app', function (app) {
    // Handle events emitted by other members of the 'app' global namespace
    app.on('helloWorld', function () {
        console.log('Hello!');
    });
});

/* OUTPUT:
    'Hello!'    // from emitter 1
    'Hello!'    // from emitter 2
*/