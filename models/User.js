const mongoose = require('mongoose');

const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
    }
)


userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return
    }
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password, salt)
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password)
}



module.exports = mongoose.model("User", userSchema); 