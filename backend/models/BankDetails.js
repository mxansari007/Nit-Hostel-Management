const mongoose  = require('mongoose');
const validator = require('validator');
const BankDetailsSchema=new mongoose.Schema({
    AccountHolderName: {
		type: String,
	},
    AccountNumber: {
      type: Number,
    },
    BankName:{
        type: String,
    },
    IFSC:{
        type: String,
    }
});

//! we will create a new collection
const BankDetails = new mongoose.model('BankDetails',BankDetailsSchema);


module.exports = BankDetails;