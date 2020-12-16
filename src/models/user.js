const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 60,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain "password"')
            }
        }
    },
    age: {
        type: Number,
        // required:true,
        default: 1, // only u don't use required:true
        // custom validator to check age not lessthan 18
        validate(value) {
            if (value <= 0) {
                throw new Error('Enter valid age')
            }
        }
    },
    // adding token to our model
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    // this is to store user avatar image as a binary data because if u deploy our website u lost all images because they r stored locally so we store them as binary data in mongodb and use that data every
    avatar: {
        type: Buffer //no need for another fields multer takes care of that if u want u can use required
    },
}, {// it automatically store time when they were created and when they were updated
    timestamps: true
}
)

// used to get tasks created by user  we use this because we don't have any tasks id in our user profile 
//but we have owner id in tasks if u store all tasks ids created by that user then u can reverse the process means virtual property in tasks model and ref in user model
Schema.virtual('tasks', { // tasks --any name we use this name in .populate('tasks') function
    ref: 'Tasks', // name used to create tasks model
    localField: '_id', // which field in our user profile is reffered in tasks
    foreignField: 'owner' // field name of reffered id in tasks
})

// Generating tokens
Schema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    // console.log(token)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
// Hiding private data visible to user

// Schema.methods.getPublicProfile = function () {
// OR
Schema.methods.toJSON = function () {

    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

// login users
Schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })  // here User is the wor defined to create model and the value exported
    // console.log(user)
    if (!user) {
        throw new Error('Uanble to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}


// hashing password before saving
Schema.pre('save', async function (next) { // we need to use normal function here because of this 
    const user = this
    // console.log('just before saving')

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// creating middleware for deleting all tasks when the user profile who created was deleted
Schema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })

    next()
})


const User = mongoose.model('myusers', Schema)


module.exports = User