const User = require('./../models/usersModel')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const responseMsgs = require('./../utilities/responseMsgs')
const errorHandler = require('./../utilities/errorHandler')

const register = async(req,res)=>{
    try{
        let newUserData = req.body
        let validationErrors = validationResult(req)
        if(!validationErrors.isEmpty()){
            throw(validationErrors)
        }

        let hashedPassword = await bcrypt.hash(newUserData.userPassword,6)
        let addUser = await User.create({...newUserData , userPassword : hashedPassword})
        res.status(201).json({
            'status' : responseMsgs.SUCCESS,
            data : addUser
        })
    }catch(er){
        // console.log(er.errors[0]);
        errorHandler(res,er)
    }
}

// er.errors[0] -> express validator
// er.message -> Database

const login = async (req,res)=>{
    try {
        let credentials = req.body
        let getUser = await User.findOne({userEmail : credentials.userEmail})
        if(!getUser){
            throw('User Not Found')
        }
        let checkPassword = await bcrypt.compare(credentials.userPassword, getUser.userPassword)
        if(!checkPassword){
            throw('Wrong Password')
        }
        let token = jwt.sign({
            name : getUser.userName
        },process.env.JWTKEY)

        res.cookie('jwt',token).json({
            status : responseMsgs.SUCCESS,
            data : 'Logged In Successfully'
        })
    } catch (er) {
        console.log(er);
        res.json({
            status : responseMsgs.FAIL,
            data : er
        })
    }
}

const getAllUsers = async (req,res)=>{
    try {
        
    } catch (er) {
        
    }
}

const getSingleUser = async (req,res)=>{
    try {
        
    } catch (er) {
        
    }
}

const updateUserData = async (req,res)=>{
    try {
        
    } catch (er) {
        
    }
}

const updateUserPassword = async (req,res)=>{
    try {
        
    } catch (er) {
        
    }
}

module.exports = {
    register,
    login,
    getAllUsers,
    getSingleUser,
    updateUserData,
    updateUserPassword
}


// jkldjkljeij6781567$%%$#^5356YGSHJADHJKDAJHKIOUD897&*^&*^%&

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWhtZWQiLCJpYXQiOjE3MjcyNTY3NTR9.dJDFqGuqWYgJRYH8dyT3d1IBx8n8tbCw1iJWcVjE_jI
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWhtZWQiLCJpYXQiOjE3MjcyNTY4Njh9.0aXwWBN3aH4puFGt0gM9iZh-KOGc6r5xLuA2YARfIMo