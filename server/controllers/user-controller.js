const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                ownedLists: loggedInUser.ownedLists
            }
        })
    })
}

loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
    }
    const user = await User.findOne({email: email});
    const id = await User.findOne({userId: email});
    if(user){
        const match = await bcrypt.compare(password, user.passwordHash);
        if(match){
            const token = auth.signToken(user);

            await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json({
                success: true,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    ownedLists: user.ownedLists
                }
            }).send();
        }else{
            return res.status(401).json({errorMessage: "User with the input email/username and password combination does not exist"});
        }
    }else if(id){
        const match = await bcrypt.compare(password, id.passwordHash);
        if(match){
            const token = auth.signToken(id);

            await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json({
                success: true,
                user: {
                    firstName: id.firstName,
                    lastName: id.lastName,
                    email: id.email,
                    ownedLists: id.ownedLists
                }
            }).send();
        }else{
            return res.status(401).json({errorMessage: "User with the input email/username and password combination does not exist"});
        }
    }else{
        return res.status(401).json({errorMessage: "User with the input email/username and password combination does not exist"});
    }
}

logoutUser = async (req, res) => {
    await res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, userId, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify || !userId) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        if(!userId.match(/^[a-z0-9]+$/i)){
            return res
                .status(400)
                .json({
                    errorMessage: "Username should only contain numbers and charachers."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        const existingUserId = await User.findOne({ userId: userId});
        if (existingUserId) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }


        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName, lastName, email, userId, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                userId: savedUser.userId,
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}