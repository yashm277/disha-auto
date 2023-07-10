//we need this library to use our .env file
import 'dotenv/config'
//get the variables from the .env file
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

export {
    PORT,
    MONGODB_URI
}