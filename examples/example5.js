var eventRouter = require('../router.js');


var emitter1 = eventRouter.bind();
var emitter2 = eventRouter.bind();

var listener1 = eventRouter.bind();
var listener2 = eventRouter.bind();
var listener3 = eventRouter.bind();


listener1.on('hey', function (){
    console.log('"hey" event fired listener #1!');
});
listener2.on('hey', function (){
    console.log('"hey" event fired listener #2!');
});
listener3.on('hey', function (){
    console.log('"hey" event fired listener #3!');
});

emitter1.emit('hey');

setTimeout(function() { 
    emitter2.emit('hey');
}, 1000);

/* OUTPUT:
    "hey" event fired listener #1!
    "hey" event fired listener #2!
    "hey" event fired listener #3!
    "hey" event fired listener #1!   // 1000 ms later
    "hey" event fired listener #2!   // 1000 ms later
    "hey" event fired listener #3!   // 1000 ms later
*/