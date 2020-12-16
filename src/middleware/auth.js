const jwt = require('jsonwebtoken')
const User = require('../models/user')

// user authentication

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') // Authorization name used in postman headeer default  &  replace fun remove Bearer
        // console.log(token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })  //'tokens.token':token  used if a user logout then the token deleted from tokens array so by using this we search if token exists in tokens array
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token // gives the current token used to login in specific mechine if we logout we use this specific token to logout only that machine not from all login machines
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." })
    }
}

module.exports = auth