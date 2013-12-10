// ONE EMITTER, DIFFERENT LISTENER
var eventerface = require('../eventerface.js').create();

var emitter = eventerface.emitter();
var listener = eventerface.emitter();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');
});

emitter.emit('hey');

/* OUTPUT:
    "hey" event fired listener!
*/