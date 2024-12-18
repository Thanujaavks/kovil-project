import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import UserOTPVerification from "../modals/UserOTPVerification.js";
import sendEmail from "../utils/email-service/email.js";
import jwt from "jsonwebtoken";
import sendPasswordResetEmail from "../utils/reset_password.js";

// Register a new user
const addUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        contactNo,
    } = req.body;
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400).json({message: "User already exists"})
    }

    const user = await User.create({
        name,
        email,
        contactNo,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNo: user.contactNo,
        })
    } else {
        res.status(400).json({message: "Invalid user data"})
    }
})

// Verify a user
// const verifiedUser = asyncHandler(async (req, res) => {
//     const _id = req.params.id;
//     const user = await User.findById({_id});
//     if (user) {
//         user.firstName = req.body.firstName || user.firstName;
//         user.lastName = req.body.lastName || user.lastName;
//         user.email = req.body.email || user.email;
//         user.role = req.body.role || user.role;
//         user.profilePic = req.body.profilePic || user.profilePic;
//         user.isVerified = req.body.isVerified || user.isVerified;
//         // user.isEmailVerified = req.body.isEmailVerified || user.isEmailVerified;
//
//         if (req.body.password) {
//             user.password = req.body.password;
//         }
//         const updatedUser = await user.save();
//
//         res.status(200).json({
//             _id: updatedUser._id,
//             firstName: updatedUser.firstName,
//             lastName: updatedUser.lastName,
//             email: updatedUser.email,
//             role: updatedUser.role,
//             profilePic: updatedUser.profilePic,
//             isVerified: updatedUser.isVerified,
//             // isEmailVerified: updatedUser.isEmailVerified,
//         })
//     } else {
//         res.status(404)
//         throw new Error("User not found")
//     }
// })

// Login a user
// const loginUser = asyncHandler(async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});
//     if (user && (await user.matchPassword(password))) {
//         res.status(200).json(user)
//     } else {
//         res.status(401)
//         throw new Error("Invalid email or password")
//     }
// })

// user forgot password
// const forgotPassword = asyncHandler(async (req, res) => {
//     const {email} = req.body;
//     // const user = await User.findOne({email});
//     if(!email) {
//         res.status(404).json({message: "Email not found"})
//     }
//     const user = await User.findOne({email});
//     if (!user) {
//         res.status(404).json({message: "User not found"})
//     }
//     const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '60'});
//     const date = new Date();
//     const newMinutes = date.getMinutes() + 60;
//     date.setMinutes(newMinutes);
//     user.resetPasswordToken = token;
//     user.resetPasswordExpire = date;
//     await user.save();
//
//     const verificationEmailResponse = await sendPasswordResetEmail(email, token, user.name);
//     if (verificationEmailResponse.error) {
//         res.status(404).json({message: "Email couldn't send", verificationEmailResponse})
//     } else {
//         res.status(200).json({message: "Email sent successfully"})
//     }
//
// })


// user reset password
// const resetPassword = asyncHandler(async (req, res) => {
//     const _id = req.params.id;
//     const user = await User.findById({_id});
//     if (user) {
//         user.password = req.body.password;
//         const resetPassword = await user.save();
//         res.status(200).json({message: "Password reset successfully", resetPassword})
//     } else {
//         res.status(404)
//         throw new Error("User not found")
//     }
// })

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users)
})
// const addUser = asyncHandler(async (req, res) => {
//     const {
//         name,
//         email,
//         contactNo,
//     } = req.body;
//
//     const users = await User.create({
//         name,
//         email,
//         contactNo,})
//
//     if (users) {
//         res.status(201).json(users)
//     } else {
//         res.status(400).json({status: "FAILED", message: "Invalid Data"});
//
//     }
// });





export {getUsers, addUser}

