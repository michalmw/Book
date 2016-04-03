var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Author = new Schema({
    
    name: String,
    photo: String,
    nick: [{}],
	about: {
		bornData: {type: Date, default: ''},
		bornPlace: {type: String, default: ''},
		dieData: {type:Date, default: ''},
		diePlace: {type:String, default: ''}

	}, 
	category: [
		{ 
			
		}
	],
    url: String
    
});

module.exports = mongoose.model('Author', Author);
