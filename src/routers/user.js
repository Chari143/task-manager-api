const express = require('express')
const router = new express.Router()
const users = require('../models/user')
const auth = require('../middleware/auth') // we r using middleware as argument to each request specified below

// for sending emails
const { sendWelcomeEmail, sendFareWellEmail } = require('../emails/account')


// router.get('/test',(req,res)=>{
//     res.send('This is from my router')
// })




// saving user to db OR user Signup

router.post('/users', async (req, res) => {

    const user = new users(req.body) // taking data send from postman and save it to mongodb

    try {
        const token = await user.generateAuthToken() // genereteing token function in model user

        await user.save()
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

// User login
router.post('/users/login', async (req, res) => {
    // console.log(user)
    try {
        const user = await users.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() // genereteing token function in model user
        // console.log(token)

        // res.status(200).send({user,token})

        // Hiding pivateData
        // res.status(200).send({user:user.getPublicProfile(),token}) // getPublicProfile() is the function we declared by using this we specified which fields of data are visible to user
        // OR but we have to specify getPublicProfile() method every time we want to use it
        res.status(200).send({ user, token }) // another method is we have to change the function name in user model to  toJSON   then it is automatically applied no need to specify

    } catch (e) {
        res.status(400).send()
    }
})


// logout user only from one device
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token // taking all removing token without logout token and save them
            // console.log(token.token !== req.token)
        })
        // console.log(req.user.tokens)
        await req.user.save()
        res.send("logout successfull")
    } catch (e) {
        res.status(500).send()
    }
})

// Logout user from all devices at once
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('Successfully Logout from all devices')
    } catch (e) {
        res.status(500).send()
    }
})

// Updating users

// Now we r using authentiation when updating user and in here we don't want u to give user id because if someone gave anothers id then they update their profile so we change :id to me to delete on my user account

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = await updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    // checking if we enter only required fields without this mongodb neglect field that r not in validation
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid update' })
    }
    try {
        // for hashing password on updating we need to find and update seperately
        // const user = await users.findById(req.params.id) 
        // updates.forEach((update)=>{
        //     console.log(update)
        //     return user[update] = req.body[update]
        // })
        // await user.save() // prints just before saving
        // // code for without hashing
        // // const user = await users.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // if(!user){
        //     return res.status(400).send()
        // }
        // res.status(200).send(user) 


        // Using authentication on updating
        // const user = await users.findById(req.params.id) // no need to find user because we r updating our profile
        updates.forEach((update) => {
            // console.log(update)
            return req.user[update] = req.body[update]
        })
        await req.user.save() // prints just before saving
        // code for without hashing
        // const user = await users.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Deleting Users
// Now we r using authentiation when deleting user and in here we don't want u to give user id because if someone gave anothers id then we delete that use we change :id to me to delete on my user account
// router.delete('/users/:id',async(req,res)=>{
router.delete('/users/me', auth, async (req, res) => {

    try {
        // const userToDelete = await users.findByIdAndDelete(req.user.id) // changing req.params.is to req.user.id
        // if(!userToDelete){
        //     return res.status(404).send({error:'Unable To Find User'})
        // }
        // res.status(200).send({DeletedUser:userToDelete})

        // we dont need to do all of above steps means don't need to do check if user exists r not because we fetching user directly
        await req.user.remove()
        sendFareWellEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

})





// fetching all users

router.get('/users', async (req, res) => {
    try {
        const user = await users.find({})
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

// fetching user profile when they r authenticated

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // console.log(req.user)
})


// fething single user by id


router.get('/users/:id', async (req, res) => { //   /:id said that after /user/  there is something
    console.log(req.params) // gives access to id we give in url  it prints in normal console if we send request  
    const _id = req.params.id
    try {
        const user = await users.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)

    } catch (e) {
        res.status(500).send(e)

    }
})



// File uploads

const multer = require('multer')
const User = require('../models/user')
const sharp = require('sharp')

const upload = multer({
    // dest: 'avatars',//folder we want to store uploaded images  // now we store images in db so remove this line
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload only specified type of files'))

        }
        cb(undefined, true)
    }

})
// uploading avatar // HAndling errors
// hb.post('/upload/me/avatar', upload.single('avatar'), (req, res) => {
//     req.user.avatar = req.file.buffer // taking avatar binary data and 
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// }
// )
//OR  // Authenticating and storing images to db's

// Auto cropping and changing image formatting
// npm install sharp
router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    // req.user.avatar = req.file.buffer // taking avatar binary data and saving it to db
    // /* to see this image copy the binary data use in html*/
    // // <img src="data:image/jpg:base64;binarydata"> // here data means we give data of image,image/jpg means that data is image and jpg type & base64 encoded


    // Auto cropping and changing image formattig
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer() // it resize image & change img type to png
    await req.user.save() // saving to db's // because it takes time we use async and await
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}
)

// Deleting avatar
router.delete('/user/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// fetching avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        //if u dont specify res.set nodejs automatically specify to json
        // res.set('Content-Type', 'application/json') // but we send jpg so use below

        // res.set('Content-Type'/*name of response header */, 'image/jpg') // tellin requester what type of data they r getting back important

        res.set('Content-Type', 'image/png') // using sharp we change all types to png so we use png here
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router