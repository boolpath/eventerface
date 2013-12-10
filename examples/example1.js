// ONE EMITTER, SAME LISTENER
var eventerface = require('../eventerface.js').create();

var emitter = eventerface.emitter();

emitter.on('hey', function () {
    console.log('Hey!');
});

emitter.emit('hey');

/* OUTPUT:
    [Nothing. Emitters do not listen to their own events]
*/
