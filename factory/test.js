// Mocha test
var module = require('./factory.js'),
    assert = require('assert');

/** Tests that the module returns a "route" method
 *
 */
describe('factory', function() {
	describe('.createEmitter', function() {
        it('should contain a "createEmitter" property that is a function', function () {
            assert.equal(typeof module.createEmitter, 'function');
        });
    });
    describe('.createEmitter()', function() {
        it('should return an object', function () {
            assert.equal(typeof module.createEmitter(), 'object');
        });
    });
});