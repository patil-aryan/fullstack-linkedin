import User from "../models/user.model.js ";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { sendWelcomeEmail } from "../email/emailHandlers.js";


export const signup = async (req, res) => {

    try {
        const {username, email, password, name} = req.body;

    if (!name || !username || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }    

    const existEmail = await User.findOne({email});
    if (existEmail) {
        return res.status(400).json({message: "Email already exists!"})
    }

    const existUsername = await User.findOne({username})
    if (existUsername) {
        return res.status(400).json({message: "Username already exists!"})
    }

    if (password.length < 6) {

        return res.status(400).json({message: "Password must be atleast 6 characters"})

    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = new User({
        name, 
        email,
        username,
        password: hashedpassword
    })

    await user.save();

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

    res.cookie("jwt-linkedin", token, {
        httpOnly: true,
        maxAge: 3*24*60*60*1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    })

    res.status(201).json({message: 'User registerd Successfully'})

    const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username
    try {
        await sendWelcomeEmail(user.email, user.name, profileUrl)
    } catch (emailError) {
        console.log("Error in sending email", emailError)
        
    }
        
    } catch (error) {
        console.log("Error in signup:", error.message)
        res.status(500).json({message: "Internat server error"})
        
    }
    
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body();
        const user = await User.findOne({username})
        if (!user){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid Password"})
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: "3d"});
        await res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3*24*60*60*1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.json({message: "Logged in Successfully"})



    } catch (error) {

        console.error("Error is login controller", error);
        res.status(500).json({message: "Server Error"})
        
    }
}
export const logout = (req, res) => {
    res.clearCookie("jwt-linkedin");
    res.json({message: "Logged out successfully"})
}


export const getCurrentUser = async (req,res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("Error in getCurrentUser Controller", error)
        res.status(500).json({message: "Server Error"})
        
    }
}