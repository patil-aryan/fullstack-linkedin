import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ''

    },
    bannerImage: {
        type: String,
        default: ''
    },
    headline: {
        type: String,
        default: "LinkedIn User"
    },
    skills: [String],
    location: {
        type: String,
        default: "Somewhere on Earth"
    },
    about: {
        type: String,
        default: ''
    },
    birthdate: {
        type: Date,
        required: false

    },
    experience:[{
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    education: [{
        school: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
    }],
    connection: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
},{timestamps: true})


const User = mongoose.model("User", userSchema)

export default User;