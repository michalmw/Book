var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Series = new Schema({
    
    namePl: String,
    nameEn: String,
    typPl: String,
    typEn: String,   
    url: String
    
});

module.exports = mongoose.model('Series', Series);