// Mocha test
var eventRouter = require('./router.js'),
    assert = require('assert');

/** Tests that the module returns a "route" method
 *
 */
describe('event-router', function() {
	describe('.bind', function() {
        it('should contain a "bind" property that is a function', function () {
            assert.equal(typeof eventRouter.bind, 'function');
        });
    });
    describe('.bind()', function() {
        it('should return an object', function () {
            assert.equal(typeof eventRouter.bind(), 'object');
        });
    });
    describe('.bind().emit', function() {
        it('should return an "emit" property that is a function', function () {
            assert.equal(typeof eventRouter.bind().emit, 'function');
        });
    });
    describe('.bind().on', function() {
        it('should return an "on" property that is a function', function () {
            assert.equal(typeof eventRouter.bind().on, 'function');
        });
    });
});