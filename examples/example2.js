var eventRouter = require('../router.js');


var emitter = eventRouter.bind();
var listener = eventRouter.bind();

listener.on('hey', function () {
    console.log('"hey" event fired listener!');
});

emitter.emit('hey');

/* OUTPUT:
    "hey" event fired listener!
*/