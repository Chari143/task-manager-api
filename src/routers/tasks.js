const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')
const auth = require('../middleware/auth')

// Authenticting task
// saving task to db
router.post('/tasks', auth, async (req, res) => {
    try {
        // const task = new Task(req.body)
        const task = new Task({ // for authentication
            ...req.body, //it copies all task body given by user 
            owner: req.user._id // gives user id who just authenticated
        })
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(e)

    }
})

// Updating tasks
// Now we r using authentiation when updating task and in here we have to give task id because an user can create multiple tasks but we also take the id of the user who created id for checking if the user who updating the task is same as the user who created them

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedKeys = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedKeys.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' })
    }
    try {
        //we don't use password field in here
        // const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            return task[update] = req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Tasks
// Now we r using authentiation when deleting task and in here we have to give task id because an user can create multiple tasks but we also take the id of the user who created id for checking if the user who deleting the task is same as the user who created them

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const taskToDelete = await Task.findByIdAndDelete(req.params.id)
        const taskToDelete = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!taskToDelete) {
            res.status(400).send({ error: 'Unable to find Task' })
        }
        res.status(200).send({ DeletedTask: taskToDelete })
    } catch (e) {
        res.status(500).send()
    }
})



// fetching all tasks
// Now we r using authentiation in here we have to give task id because an user can create multiple tasks but we also take the id of the user who created id for checking if the user who fetching the tasks is same as the user who created them


// For filtering tasks for out need    /tasks/completed=true
router.get('/tasks', auth, async (req, res) => {
    // try {
    // const tasks = await Task.find({})


    // const tasks = await Task.find({ owner: req.user._id })
    // res.status(200).send(tasks)

    // OR
    // await req.user.populate('tasks').execPopulate()

    // for filtering
    // pagination means limiting tasks for each page
    // sorting by createdAt etc..    /tasks/sortBy=createdAt:desc
    const match = {}
    const sort = {}
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 // here it defaultly sorted by createdAt if want sort with different field u have to do new approch search web
    }
    if (req.query.completed) {
        match.completed = req.query.completed === 'true' // it check if completed is ===  true or false if u can directly assign req.query.completed it gives string not boolean if u cant to use like this search for changind string to boolean
        // console.log(match.completed = req.query.completed === 'true')
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: { //pagination
                limit: parseInt(req.query.limit),// it takes limit value provided in link if it not provided it is neglected so no need for if statement for checking value
                skip: parseInt(req.query.skip),
                // sort: {
                //     createdAt: -1
                // }
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)

    } catch (e) {
        res.status(500).send(e)
    }
})




// fething single task by id

// Now we r using authentiation in here we have to give task id because an user can create multiple tasks but we also take the id of the user who created id for checking if the user who fetching the tasks is same as the user who created them

router.get('/tasks/:id', auth, async (req, res) => { //   /:id said that after /user/  there is something
    // console.log(req.params)
    // console.log(Task.findById(_id)) // gives access to id we give in url  it prints in normal console if we send request  
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id }) // for getting only tasks which having task id and owner id same as we specified
        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)

    }

})

module.exports = router





