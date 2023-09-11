import {mongoose, Schema} from "mongoose";

let userSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

let User = mongoose.model('User', userSchema)

export default User