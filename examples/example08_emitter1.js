// GLOBAL NAMESPACE - MANY EMITTERS (ONE IN THIS FILE), ONE LISTENER (IN ANOTHER FILE)
var eventerface = require('../eventerface');

// Find the existing 'app' global namespace
// (created in example08_listener.js)
eventerface.find('/app', function (app) {
    // Emit an event to the 'app' global namespace for other members to handle
    app.emit('helloWorld');
});