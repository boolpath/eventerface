// ONE EMITTER, MANY LISTENERS
var eventerface = require('../eventerface.js').create();


var emitter = eventerface.emitter();

var listener1 = eventerface.emitter();
var listener2 = eventerface.emitter();
var listener3 = eventerface.emitter();

listener1.on('hey', function () {
    console.log('"hey" event fired listener #1!');
});
listener2.on('hey', function () {
    console.log('"hey" event fired listener #2!');
});
listener3.on('hey', function () {
    console.log('"hey" event fired listener #3!');
});

emitter.emit('hey');

/* OUTPUT:
    "hey" event fired listener #1!
    "hey" event fired listener #2!
    "hey" event fired listener #3!
*/