import express from "express"
import bcrypt, { hash } from "bcrypt"

import { createUser, getUserByName } from "../helper.js"

const router = express.Router()

async function genHashPassword(password){
    const noOfRounds = 10
    const salt = await bcrypt.genSalt(noOfRounds)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
}


router.post("/signup", async (req, res) => {
    const {username, password} = req.body
    const hashedPassword = await genHashPassword(password)
    const isUserExist = await getUserByName(username)

    if(!isUserExist){
        const result = await createUser({
            username,
            password: hashedPassword
        })
        res.send(result)
    }else{
        res.status(400).send({msg: "User already exists"}) 
    }
 
})



export const userRouter = router


