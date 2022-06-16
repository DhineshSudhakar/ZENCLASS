import express from "express"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

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

router.post("/login", async (req, res) => {
    const {username, password} = req.body
    const isUserExist = await getUserByName(username)

    if(!isUserExist){
        res.status(401).send({msg: "Invalid credentials"})
    }else{
        const storedPassword = isUserExist.password
        const isPasswordsMatch = await bcrypt.compare(password, storedPassword)
        console.log(isPasswordsMatch)
        if(isPasswordsMatch){
            const token = jwt.sign({id: isUserExist._id}, process.env.ACCESS_TOKEN_SECRET)
            res.send({msg: "Login successful", token})
        }else{
            res.status(401).send({msg: "Invalid credentials"})
        }
    }
 
})



export const userRouter = router


