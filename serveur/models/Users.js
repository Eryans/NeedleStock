const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Veuillez préciser un nom'],
        unique:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: [true,'Veuillez tapez un mot de passe']
    }
},{
    timestamps:true
})

const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel;