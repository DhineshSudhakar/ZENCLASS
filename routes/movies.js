import express from "express"
import { getAllMovies, getMovieById, createMovie, DeleteMovie, UpdateMovie } from "../helper.js"
import { auth } from "../middlewares/auth.js"

const router = express.Router()

router.get("/",auth, async (req, res) => {
    const movies = await getAllMovies()
    res.send(movies)
})

router.get("/:id",auth, async (req, res) => {
    const {id} = req.params
    // const movie = movies.find((ele) => ele.id === id )

    const movie = await getMovieById(id)

    movie ? res.send(movie) : res.status(404).send({msg: "No such movie"})
})

// create movie api

// express.json() -> inbuilt middleware

router.post("/",auth, async (req, res) => {
    const data = req.body
    console.log(data)

    // db.collection.insertMany(data)

    const result = await createMovie(data)
    res.send(result)
})


router.delete("/:id", auth, async (req, res) => {
    const {id} = req.params

    const movie = await DeleteMovie(id)

    movie.deletedCount > 0 ? res.send(movie) : res.status(404).send({msg: "No such movie"})
})

router.put("/:id", auth, async (req, res) => {
    const {id} = req.params
    const data = req.body
    const movie = await UpdateMovie(id, data)

    movie.matchedCount ? res.send(movie) : res.status(404).send({msg: "No such movie"})
})


export const moviesRouter = router


