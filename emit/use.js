var emit = require('./emit.js'), 
    emitter = (require('events').EventEmitter);

var emitter1 = new emitter(); emit.attachTo(emitter1);
var emitter2 = new emitter(); emit.attachTo(emitter2);
setTimeout(function(){ emitter1.emit("hey", "oh") }, 100);
emitter1.on("hey", function(message) {
    console.log(message);
});
