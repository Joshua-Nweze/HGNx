import {mongoose, Schema} from "mongoose";

let userSchema = Schema({
    name: {
        type: String,
        required: true
    }
})

let User = mongoose.model('User', userSchema)

export default User