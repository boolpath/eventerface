// GLOBAL NAMESPACE - ONE EMITTER, DIFFERENT LISTENER (IN OTHER FILE)
var eventerface = require('../eventerface');

// Create a global namespace by providing the desired name
// and a callback function to receive the evented interface object
eventerface.create('app', function (app) {
    // Emit an event to the 'app' global namespace for other members to handle
    setInterval(function () {
        app.emit('helloWorld');
    }, 1000);
});