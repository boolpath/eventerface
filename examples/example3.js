var eventRouter = require('../router.js');


var emitter1 = eventRouter.bind();
var emitter2 = eventRouter.bind();
var listener = eventRouter.bind();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');
});

emitter1.emit('hey');
emitter2.emit('hey');

/* OUTPUT:
    "hey" event fired listener!
    "hey" event fired listener!
*/