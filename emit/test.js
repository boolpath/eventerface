// Mocha test

var module = emit = require('./emit'), 
	on = require('../on'),
    eventEmitter = require('events').EventEmitter,
    emitter1 = new eventEmitter(),
    emitter2 = new eventEmitter(),
    emitter3 = new eventEmitter(),
    map = require('../events-map').create(),
    assert = require('assert');


describe('emit', function() {
	before(function(){
	    emit.bind(emitter1, map);
	    on.bind(emitter1, map);
	    emit.bind(emitter2, map);
	    on.bind(emitter2, map);
        emit.bind(emitter3, map);
        on.bind(emitter3, map);
	});
	describe('#bind()', function() {
        it('should return a "bind" property that is a function', function () {
            assert.equal(typeof module.bind, 'function');
        });
    });
    describe('emitter.emit()', function() {
        it('should invoke the callback', function (done) {
            var callback = function(message) {
	            assert.equal(message, 'oh');
	            done();
            };
            emitter3.on('hey', function() { console.log("hey3!") });
            emitter2.on('hey', callback);
            emitter1.emit('hey', 'oh'); //setTimeout(function() { }, 500);
        });
    });
});
