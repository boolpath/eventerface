// GLOBAL NAMESPACE - 
// MANY EMITTERS (ONE IN THIS FILE), 
// MANY LISTENERS (IN OTHER FILES),
// SEPARATE INTERFACE CREATOR (IN ANOTHER FILE)
var eventerface = require('../eventerface');

// Find the existing 'app' global namespace
// (created in example10_creator.js)
eventerface.find('app', function (app) {
    // Emit an event to the 'app' global namespace for other members to handle
    app.emit('helloWorld');
});