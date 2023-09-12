import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import bodyParser from 'body-parser'

import manageUser from './controllers/manageUser.controller.js'
import User from './model/User.model.js'
let { createUser, getUser, updateUser, deleteUser } = manageUser

const app = express()

app.use(bodyParser.json())

app.post('/api', createUser)
app.get('/api/:user_id', getUser)
app.patch('/api/:user_id', updateUser)
app.delete('/api/:user_id', deleteUser)

mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(3000, () => console.log('localhost and db running in port 3000'))
    })