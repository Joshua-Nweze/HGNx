import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import bodyParser from 'body-parser'

import createUser from './controllers/manageUser.controller.js'

const app = express()

app.use(bodyParser.json())

app.post('/api', createUser)
// app.get()
// app.patch()
// app.delete()

mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(3000, () => console.log('localhost and db running in port 3000'))
    })