const mongoose = require('mongoose');

const promptSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    promptText:{
        type:String,
        required:true,
    
    },
    categrory:{
        type:String,
        default:'General',
        required:true,
},
    tags:{
        type:[String],
        default:[],
    },
    upvotes:{
        type:Number,
        default:0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
},
//createat updateat
{
    timestamps:true,
}
)

const Prompt = mongoose.model("Prompt", promptSchema)

module.exports = Prompt;