const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    // storing id of user who created the task
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'myusers' // myusers id the model name used in user model to create model
    }
}, {
    timestamps: true
})

Schema.pre('save', async function (next) {
    const user = this
    console.log('just before saving')
    next()
})

const Task = mongoose.model('Tasks', Schema)

module.exports = Task