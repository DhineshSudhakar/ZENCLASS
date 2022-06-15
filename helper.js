import { client } from "./db.js";

export async function UpdateMovie(id, data) {
    return await client.db("B33WD").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function DeleteMovie(id) {
    return await client.db("B33WD").collection("movies").deleteOne({ id: id });
}
export async function createMovie(data) {
    return await client.db("B33WD").collection("movies").insertMany(data);
}


export async function getMovieById(id) {
    return await client.db("B33WD").collection("movies").findOne({ id: id });
}
export async function getAllMovies() {
    return await client.db("B33WD").collection("movies").find({}).toArray();
}


//**************** user controllers *******************

export async function createUser(data) {
    return await client.db("B33WD").collection("users").insertOne(data);
}

export async function getUserByName(username) {
    return await client.db("B33WD").collection("users").findOne({ username });
}
