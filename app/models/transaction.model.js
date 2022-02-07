const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    name: String,
    description: String,
	
	 to: String,
    from: String,
	
	 symbol: String,	
	 address: String,
    name: String,
	
	 type: String,
    value: String
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);