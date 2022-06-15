import { MongoClient } from "mongodb"

import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URL

async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Connected to MongoDB")
    return  client
}

export const client = await createConnection()