var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

var setName = function(name){
	return _.escape(name).trim();
};

var DomoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	level: {
		type: Number,
		required:true,
		min: 1
	},
	
	age: {
		type: Number,
		min: 0,
		required: true
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdData: {
		type: Date,
		default: Date.now
	}
});

DomoSchema.methods.toAPI = function(){
	return{
		name: this.name,
		age: this.age,
		level: this.level
	};
};

DomoSchema.statics.findByOwner = function(ownerId, callBack){
	
	var search = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return DomoModel.find(search).select("name age level").exec(callBack);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;

