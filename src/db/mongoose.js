const mongoose = require('mongoose')
// const validator = require('validator')
require('dotenv').config({ path: 'src/config/dev.env' })
// console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, { // creates task-manager-api db
    useNewUrlParser: true,
    useCreateIndex: true, // create index if insert documents
    useUnifiedTopology: true,
    useFindAndModify: false //gives deprecation warning if u use findOneAndUpdata() --see promise-chaining.js file in playground directory
})

// Defining data model
// const User = mongoose.model('user',{ //user is the name of the model
//     // creating model(fields we want and type of data accepts in each field)
//     name:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         required:true,
//         // custom validator
//         validate(value){
//             if(value<18){
//                 throw new Error('Age must be greater than 18')
//             }
//     }
//     },
//     love:{
//         type:Boolean

//         }

// })

// OR    defining schema seperately and using that to create model

// const Schema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,// removes spaces if someone gives only spaces or spaces between letters
//         lowercase:true,// change email to lowercase before saving
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         maxlength:20,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password must not contain "password"')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         // required:true,
//         default:0, // only u don't use required:true
//         // custom validator to check age not lessthan 18
//         validate(value){
//             if(value<18){
//                 throw new Error('Age must be greater than 18')
//             }
//     }
//     },
//     love:{
//         type:Boolean,
//         default:false

//     }
// })

// const User = mongoose.model('user',Schema)
// // creating new user
// const me =  new User({
//     name:'"HimaBindhu',
//     email:'chennahari72@gmail.com',
//     password:'     ChariHB143   ', //'     ChariHB143 password  '-- error because it contain password
//     age:19,
//     love:true
// })
// // Saving the data to db
// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })

// finding data in our database


// User.find((error,data)=>{
//     if(error){
//         return console.log(error)
//     }
//     console.log(data)
// })

// // OR usng callback
// const callback = (error,data)=>{
//     if(error){
//         return console.log(error)
//     }
//     console.log(data)
// }

// User.find({name:'HimaBindhu'},callback);



