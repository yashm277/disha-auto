//example on how to import the whole object called config
import * as config from 'utils/config.js'
//get the express object and assign it to app
import express from "express";
const app = express()
//express router
import { employeesRouter } from './controllers/employees.js'

//mongoose is needed to connect to the database
import mongoose from 'mongoose'
//async function so we can connect to the database
//throws an error if the connection fails
const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log(`connected to the database`)
    } catch (e) {
        console.log(`error connecting to the db: ${e}`)
    }
}
//run the function so we are connected to the database
connectToDB()
//------------- middleware -------------//
//allow the server read json data
app.use(express.json())
//define the endpoint: localhost:3001/ for the router
app.use('/employees', employeesRouter)

export { app }