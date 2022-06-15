import express from "express"
import dotenv from 'dotenv'
import { moviesRouter } from "./routes/movies.js"

import { userRouter } from "./routes/user.js"

dotenv.config()

const PORT = process.env.PORT

const app = express()

// to parse the req.body into json -> inbuilt middleware 
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Welcome to movies api")
})

app.use("/movies", moviesRouter)

app.use("/user", userRouter)


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

