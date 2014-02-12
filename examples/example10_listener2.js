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
        console.log('world!');
    });
});

/* OUTPUT:
    'world!'    // from emitter 1s
    'world!'    // from emitter 2
*/