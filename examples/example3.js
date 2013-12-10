// ONE LISTENER, MANY EMITTERS
var eventerface = require('../eventerface.js').create();

var emitter1 = eventerface.emitter();
var emitter2 = eventerface.emitter();
var listener = eventerface.emitter();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');
});

emitter1.emit('hey');
emitter2.emit('hey');

/* OUTPUT:
    "hey" event fired listener!
    "hey" event fired listener!
*/