const AsyncHandler = require("express-async-handler")
const { userModel } = require("../Model/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// The Signup function handles user registration. It uses AsyncHandler to handle asynchronous operations.
// It extracts first_name, last_name, email, and password from the request body.
const Signup = AsyncHandler(async (req, res) => {
    let { first_name, last_name, email, password } = req.body
    try {
        // check any of the required filed is empty or not
        if (!first_name || !last_name || !email || !password) {
            // Respond with a message prompting the user to enter all details if any field is missing
            res.json({ message: "please enter all details" })
        }
        else {
            // Hash the password using bcrypt with a salt round of 12
            let hashedPassword = bcrypt.hashSync(password, 12)


            // checks that  user already exist or not by email
            let userExist = await userModel.findOne({ email: email })
            if (!userExist) {
                // create a new user in the database
                let user = await userModel.create({
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword
                })


                // check if user is valid or not
                if (user) {
                    // generates the jwt token  based on user Id and secret key stored in the environment variable
                    let token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
                    // if the token is generated
                    if (token) {
                        res.json({
                            user: user,
                            token: token
                        })
                    }
                }

            }
            else {
                res.json({ message: "user already exist" })
            }
        }

    } catch (error) {
        // if some error occurs send error prompt
        res.json({ message: error.message })
    }
})



// the login function uses the AsyncHandler for handling the async response 
// and it extract the email and password from user
const Login = AsyncHandler(async (req, res) => {
    // extract the email and password from the user
    let { email, password } = req.body
    try {
        // checks that all required fields are filed or not
        if (!email || !password) {
            // sends the prompt message the user has not provided details
            res.json({ message: "please enter all details" })
        }
        else {
            // checks that  user already exist or not by email
            let userExist = await userModel.findOne({ email: email })
            if (!userExist) {
                // if user not exist then prompt user to signup
                res.json({ message: "user not exist please Signup" })
            }
            else {
                // if user exist then check the password by using the bcrypt library
                let verifyPassword = bcrypt.compareSync(password, userExist.password)
                if (verifyPassword) {
                    // if enter password is correct then generate the Token and send to user
                    let token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY)
                    res.json({
                        user: userExist,
                        token: token
                    })
                }
                else {
                    // if user enters wrong password prompt this message
                    res.json({ message: "invalid password" })
                }
            }
        }
    } catch (error) {
        // if any error occurs while execution then prompt th error message
        res.json({ message: error.message })
    }
})


module.exports = { Signup, Login }
