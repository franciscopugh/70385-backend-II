import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: "Usuario"
    }
})

const userModel = model("users", userSchema)

export default userModel