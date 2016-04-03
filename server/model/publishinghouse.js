var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Publishinghouse = new Schema({
    
    name: String
    
});

module.exports = mongoose.model('Publishinghouse', Publishinghouse);