// GLOBAL NAMESPACE - ONE EMITTER, SAME LISTENER
var eventerface = require('../eventerface');

// Create a global namespace by providing the desired name
// and a callback function to receive the evented interface object
eventerface.create('/app', function (app) {
    // Start emitting and listening to events using the provided 'app' emitter
    app.on('hey', function () {
        console.log('Hey!');
    });
    app.emit('hey');
});

/* OUTPUT:
    [Nothing. Emitters do not listen to their own events]
*/