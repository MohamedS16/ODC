const {body} = require('express-validator')
const User = require('./../models/usersModel')

const usersValidation = ()=>{
    return [
        body('userName').notEmpty().withMessage('Name cant be Empty'),
        body('userPassword').notEmpty().withMessage('Password cant be Empty'),
        body('userEmail').notEmpty().withMessage('Email cant be Empty')
        .isEmail().withMessage('Email Format is invalid')
        .custom(async (data)=>{
            let checkUser = await User.findOne({userEmail : data})
            if(checkUser){
                throw('User Already Exists');
            }
        }),
        body('userPhone').notEmpty().withMessage('Phone cant be Empty')
        .isMobilePhone().withMessage('Phone Format is Invalid')
        .custom(async (data)=>{
            let checkUser = await User.findOne({userPhone : data})
            if(checkUser){
                throw('Phone Already Exists')
            }
        }),
        body('userGender').notEmpty().withMessage('Please Select a Gender'),
        body('userAddress').notEmpty().withMessage('Address Cant be Empty')
    ]
}

module.exports = usersValidation