// Mocha test
var eventRouter = require('./router.js'),
    assert = require('assert');

/*
*
*/
describe('event-router', function() {
    describe('.publish', function() {
        it('should return a "publish" property that is a function', function () {
            assert.equal(typeof eventRouter.publish, 'function');
        });
    });
    describe('.unpublish', function() {
        it('should return a "unpublish" property that is a function', function () {
            assert.equal(typeof eventRouter.unpublish, 'function');
        });
    });
    describe('.subscribe', function() {
        it('should return a "subscribe" property that is a function', function () {
            assert.equal(typeof eventRouter.subscribe, 'function');
        });
    });
    describe('.unscribe', function() {
        it('should return a "unscribe" property that is a function', function () {
            assert.equal(typeof eventRouter.unscribe, 'function');
        });
    });
});