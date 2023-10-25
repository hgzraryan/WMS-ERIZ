const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    research: {
        type: String,
        required: true
    },    
	category: {
        type: String,
        required: true
    },	
	category_name: {
        type: String,
        required: true
    },
	name: {
        type: String,
        required: true
    }
	/*
	username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    }
	
	,
    password: {
        type: String,
        required: true
    },
	isActive: {
        type: Number,
        default: 0
    },
    refreshToken: [String]
	
	*/
	
});

module.exports = mongoose.model('ResearchList', userSchema);