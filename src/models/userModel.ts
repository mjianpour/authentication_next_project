
import { profile } from "console";
import mongoose, {mongo} from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please type your Email here."],
        unique: true
    }, 

    username: {
        type: String,
        required: [true, "Please type your username here."],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please type your password here."]
    },

    profile: {
        firstName: {
            type: String},
        lastName: {
            type: String},
        displayName: {
            type: String},
        gender: {
            type: String},
        dateOfBirth: {
            type: String},
        country: {
            type: String,
        },
        isProfileEdited: {
            type: Boolean
        }
    },

    appLanguage: {
        type: String
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema); 

export default User