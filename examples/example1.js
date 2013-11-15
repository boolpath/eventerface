var eventRouter = require('../router.js');


var emitter = eventRouter.bind();

emitter.on('hey', function() {
    console.log('Hey!');
});

emitter.emit('hey');

/* OUTPUT:
    [Nothing. Emitters do not listen to their own events]
*/