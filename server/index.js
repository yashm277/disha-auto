import { app } from './app.js'
//get the port from .env
import { PORT } from './utils/config.js'
//run the server on the app object with the defined port
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
