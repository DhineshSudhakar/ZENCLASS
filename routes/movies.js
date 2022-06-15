import express from "express"
import { getAllMovies, getMovieById, createMovie, DeleteMovie, UpdateMovie } from "../helper.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const movies = await getAllMovies()
    res.send(movies)
})

router.get("/:id", async (req, res) => {
    const {id} = req.params
    // const movie = movies.find((ele) => ele.id === id )

    const movie = await getMovieById(id)

    movie ? res.send(movie) : res.status(404).send({msg: "No such movie"})
})

// create movie api

// express.json() -> inbuilt middleware

router.post("/", async (req, res) => {
    const data = req.body
    console.log(data)

    // db.collection.insertMany(data)

    const result = await createMovie(data)
    res.send(result)
})


router.delete("/:id", async (req, res) => {
    const {id} = req.params

    const movie = await DeleteMovie(id)

    movie.deletedCount > 0 ? res.send(movie) : res.status(404).send({msg: "No such movie"})
})

router.put("/:id", async (req, res) => {
    const {id} = req.params
    const data = req.body
    const movie = await UpdateMovie(id, data)

    movie.matchedCount ? res.send(movie) : res.status(404).send({msg: "No such movie"})
})


export const moviesRouter = router


