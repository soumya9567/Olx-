import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userModel from "./models/userModel.js"
import bcrypt from "bcrypt"

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://soumyasathyansathyan:soumya1917@cluster0.tzwip.mongodb.net/OLX")
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));


app.post('/signup', (req, res) => {
    const { email, name, password } = req.body
    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({ name, email, password: hash })
                .then(user => res.json(user))
                .catch(err => res.json(err))
        }).catch(err => {
            console.log(err.message)
        })


})
app.post('/', (req, res) => {
    const { email, password } = req.body
    userModel.findOne({ email: email })
        .then(user => {


            if (user) {

                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        res.json("success")
                    } else{
                        res.json("the password is incorrect")

                    }



                })
            } else {
                res.json("no record exist")
            }
        })
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})