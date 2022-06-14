import express from "express"
import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// to parse the req.body into json -> inbuilt middleware 
app.use(express.json())

const MONGO_URL = "mongodb://localhost"

// const MONGO_URL = process.env.MONGO_URL

// console.log(process.env)

async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Connected to MongoDB")
    return  client
}

const client = await createConnection()

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/movies", async (req, res) => {
    const movies = await client.db("B33WD").collection("movies").find({}).toArray()
    res.send(movies)
})

app.get("/movies/:id", async (req, res) => {
    const {id} = req.params
    // const movie = movies.find((ele) => ele.id === id )

    const movie = await client.db("B33WD").collection("movies").findOne({ id: id})

    movie ? res.send(movie) : res.status(404).send({msg: "No such movie"})
})

// create movie api

// express.json() -> inbuilt middleware

app.post("/movies", async (req, res) => {
    const data = req.body
    console.log(data)

    // db.collection.insertMany(data)

    const result = await client.db("B33WD").collection("movies").insertMany(data)
    res.send(result)
})

app.listen(4000, () => console.log("Server running on port: 4000"))