const express = require('express')
require('./db/mongoose')
// require('dotenv').config({ path: 'src/config/.env' })
// const users = require('./models/user.js')
// const tasks = require('./models/tasks')
// const Task = require('./models/tasks')

const hb = express()


// we use environment variables because if we don't all the ApiKeys we use all deploy so if some one hack it be a problem and mongodb local url not work when our app deployed

// const port = process.env.PORT || 3000 // without env variables
const port = process.env.PORT// here we already assign 3000 to PORT in env variable in src/config/dev.env



hb.use(express.json()) // takes the json data send from postman

// // // saving user to db
// // hb.post('/users',(req,res) => {
// //     console.log(req.body) // it prints data if u press send in postman
// //     res.send('testing')

// //     const user = new users(req.body) // taking data send from postman and save it to mongodb
// //     user.save().then(()=>{
// //         res.status(201).send(user)
// //     }).catch((err)=>{
// //         // status(400) is for client error
// //         res.status(400).send(err) // if we send password in postman smaller than the required it shows error in postman
// //     })

// // })


// // OR ----using AsyncAwait
// // saving user to db

// hb.post('/users',async(req,res) => {

//     const user = new users(req.body) // taking data send from postman and save it to mongodb

//     try{
//         await user.save()
//         res.status(201).send(user)
//     } catch(e){
//         res.status(400).send(e)
//     }

// })

// // Updating users
// hb.patch('/users/:id',async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','email','password','age']
//     const isValidOperation =await updates.every((update)=>{
//         return allowedUpdates.includes(update)
//     })
//     // checking if we enter only required fields without this mongodb neglect field that r not in validation
//     if(!isValidOperation){
//         return res.status(400).send({error:'invalid update'})
//     }
//     try{
//         const user = await users.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
//         if(!user){
//             return res.status(400).send()
//         }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// // Deleting Users

// hb.delete('/users/:id',async(req,res)=>{
//     try{
//         const userToDelete = await users.findByIdAndDelete(req.params.id)
//         if(!userToDelete){
//             return res.status(404).send({error:'Unable To Find User'})
//         }
//         res.status(200).send({DeletedUser:userToDelete})
//     }catch(e){
//         res.status(500).send()
//     }

// })


// // fetching all users
// // hb.get('/users',(req,res)=>{
// //     users.find({}).then((users)=>{
// //         res.status(200).send(users)
// //     }).catch((e)=>{
// //         res.status(500).send(e)// 500 because in here error accured in server side
// //     })
// // })



// // OR ----using AsyncAwait
// // fetching all users

// hb.get('/users',async(req,res)=>{
//     try{
//         const user = await users.find({})
//         res.status(200).send(user)
//     } catch(e){
//         res.status(500).send(e)
//     }

// })



// // fething single user by id
// // hb.get('/users/:id',(req,res)=>{ //   /:id said that after /user/  there is something
// //     console.log(req.params) // gives access to id we give in url  it prints in normal console if we send request  
// //     const _id = req.params.id
// //     users.findById(_id).then((user)=>{
// //         // there is a chance we don't get user so we use some condition
// //         if (!user) {
// //             return res.status(404).send()
// //         }

// //         res.status(200).send(user)

// //     }).catch((e)=>{
// //         res.status(500).send(e)
// //     })
// // })



// // OR ----using AsyncAwait
// // fething single user by id


// hb.get('/users/:id',async(req,res)=>{ //   /:id said that after /user/  there is something
//     console.log(req.params) // gives access to id we give in url  it prints in normal console if we send request  
//     const _id = req.params.id
//     try{
//         const user = await users.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.status(200).send(user)

//     } catch (e){
//         res.status(500).send(e)

//     }
// })



// // // saving task to db
// // hb.post('/tasks',(req,res)=>{
// //     const task = new tasks(req.body)
// //     task.save().then(()=>{
// //         res.status(201).send(task)
// //     }).catch((e)=>{
// //         res.status(400).send(e)
// //     })
// // })


// // OR ----using AsyncAwait
// // saving task to db
// hb.post('/tasks',async(req,res)=>{
//     try{
//         const task = new tasks(req.body)
//         await task.save()
//         res.status(201).send(task)

//     } catch(e){
//         res.status(400).send(e)

//     }
// })

// // Updating tasks

// hb.patch('/tasks/:id',async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedKeys = ['description','completed']
//     const isValidOperation = updates.every((update)=>{
//         return allowedKeys.includes(update)
//     })
//     if(!isValidOperation){
//         return res.status(400).send({error:'Invalid update'})
//     }
//     try{
//         const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
//         if(!task){
//             return res.status(400).send()
//         }
//         res.status(200).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// // Delete Tasks

// hb.delete('/tasks/:id',async(req,res)=>{
//     try{
//         const taskToDelete = await Task.findByIdAndDelete(req.params.id)
//         if(!taskToDelete){
//             return res.status(400).send({error:'Unable to find Task'})
//         }
//         res.status(200).send({DeletedTask:taskToDelete})
//     }catch(e){
//         res.status(500).send(e)
//     }
// })




// // // fetching all tasks
// // hb.get('/tasks',(req,res)=>{
// //     Task.find({}).then((task)=>{
// //         res.status(200).send(task)
// //     }).catch((e)=>{
// //         res.status(500).send(e)// 500 because in here error accured in server side
// //     })
// // })


// // OR ----using AsyncAwait
// // fetching all tasks
// hb.get('/tasks',async (req,res)=>{
//     try{
//         const tasks = await Task.find({})
//         res.status(200).send(tasks)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })


// // fething single task by id
// // hb.get('/tasks/:id',(req,res)=>{ //   /:id said that after /user/  there is something
// //     console.log(req.params)
// //     // console.log(Task.findById(_id)) // gives access to id we give in url  it prints in normal console if we send request  
// //     const _id = req.params.id
// //     Task.findById(_id).then((task)=>{
// //         // there is a chance we don't get user so we use some condition
// //         if (!task) {
// //             return res.status(404).send()
// //         }

// //         res.status(200).send(task)


// //     }).catch((e)=>{
// //         res.status(500).send(e)
// //     })
// // })



// // OR ----using AsyncAwait
// // fething single task by id
// hb.get('/tasks/:id',async (req,res)=>{ //   /:id said that after /user/  there is something
//     console.log(req.params)
//     // console.log(Task.findById(_id)) // gives access to id we give in url  it prints in normal console if we send request  
//     const _id = req.params.id
//     try{
//         const task = await Task.findById(_id)
//         if (!task) {
//             return res.status(404).send()
//         }

//         res.status(200).send(task)
//     } catch(e){
//         res.status(500).send(e)

//     }

// })


// hb.listen(port,()=>{
//     console.log('Server started at port 3000')
// });





// seperating all our code according to category using express routes

// const router = new express.Router()

// router.get('/test',(req,res)=>{
//     res.send('This is from my router')
// })






// without middleWare:   new request -> run route handler

// with middleWare:    new request  ->  do something  -> run route handler


// // middeware function created by us we have to specify middleware function before any use functions like below
// hb.use((req,res,next)=>{
//     // console.log(req.method,req.path)
//     // next() // without this all the user requests not work

//     if(req.method === 'GET'){
//         res.send('Get requests are disabled')
//     }else{
//         next()
//     }
// })

// OR importing our middleware from another file
// but if we use middleware here it is applyed to both user and task so we specify this in in routers/user.js


// // creating a middleware function to disable all requests when our website is in maintainance mode
// by using this code all the requests are not working
// hb.use((req,res,next)=>{
//     res.status(503).send('Site is currently in maintainance. Come again later!')
// })





// importing above all user code from other file
const Userrouter = require('./routers/user')

hb.use(Userrouter) // registering our router without this it show error in our browser

const Taskrouter = require('./routers/tasks')

hb.use(Taskrouter)


// File uploads
// npm i multer
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000, //Ristrict the filesize to 1Mb here size in bits 1Mb = 1million (or) 10lacks
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) { // OR using regex for multiple file extentions
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('please upload a doc OR docx file only'))
        }
        cb(undefined, true)
        // cb(new Error('File must be pdf')) // if another file type is uploaded it throw error
        // cb(undefined, true) //if required type file is uploaded error is undefined
        // cb(undefined,false) it not gives any error but it also not store file file if file is required or another it rejects all
    }
})

// hb.post('/upload', upload.single('upload'/* here upload is the key name we used in postman form-data key */), (req, res) => {
//     res.send()
// })

// OR
// HAndling errors

// hb.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next /*4 arguments r compulsary*/) => {
//     res.status(400).send({ error: error.message })
// }
// )




hb.listen(port, () => {
    console.log('Server started at port ' + port)
});


// Athentication --- encrypt passwords for security
// npm i bcrypt
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const myFunction = async () => {
    // const password = 'ChariHB143'
    // const hashedPassword = await bcrypt.hash(password,8) // 8 is the how many times password is hashed 8 is best
    // console.log(password)
    // console.log(hashedPassword)
    // const isMatch = await bcrypt.compare('ChariHB143',hashedPassword)
    // console.log(isMatch)


    // 
    const token = jwt.sign({ _id: 'harihimabindhu143' }, process.env.JWT_SECRET, { expiresIn: '7 days' }) //harihimabindhu143 is id we want from user &  they r l overs   is secret key byusing this th token will be created don't share this   & expiresIn is the  expiring time for token u can give sec,hours .......
    console.log(token) // if u search middle value of token in base64decode  u can get {"_id":"harihimabindhu143","iat":1598537706}  iat is the time stamp when token is created

    // Verifying token
    const data = jwt.verify(token, process.env.JWT_SECRET) //u have to enter secret key to vetify token if it is correct or not
    console.log(data)

}
myFunction()

// how  .toJSON method works
const love = {
    name: 'HimaBindhu'
}
love.toJSON = function () {
    console.log(this)
    // return this
    return {}

}
console.log(JSON.stringify(love))



// here for getting owner id we have to find the user first and take owner then or we can give a relationship between user and task in task model

const tasks = require('./models/tasks')// we specified these two above
const users = require('./models/user.js')

const main = async () => {
    // taking task and found user who created the task
    // const task = await tasks.findById('5f49039ffbf4221b043dba4e') // id of task we just created
    // // console.log(task)
    // await task.populate('owner').execPopulate() // gives the owner profile by ref we specified in task model
    // console.log(task.owner)


    // Takind user ans find the tasks created by that user
    const user = await users.findById('5f48fcdc79da1d03e0a1cafe') // owner id in the task
    // console.log(user.tasks) // u dont get any tasks for this we can set up a virtual property in user model we use this because we don't have any tasks id in our user profile 
    //but we have owner id in tasks if u store all tasks ids created by that user then u can reverse the process means virtual property in tasks model and ref in user model
    await user.populate("tasks").execPopulate() // tasks is the name specified in virtual property
    console.log(user.tasks) // no we get task
}
// main()