const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
	value: {
		type: Number,
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);