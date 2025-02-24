import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userModel from "./models/userModel.js"


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://soumyasathyansathyan:soumya1917@cluster0.tzwip.mongodb.net/OLX")
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));


app.post('/signup',(req,res) =>{
     userModel.create(req.body)
     .then(user => res.json(user))
     .catch(err =>res.json(err))

})
app.post('/', (req,res) => {
    const {email,password} =req.body

    userModel.findOne({email:email})
    .then(user =>{
        if(user){

            if(user.password  === password) {
                res.json("success")
            } else{
                res.json("the password is incorrect")
            }   
        }else{
            res.json("no record exist")
        }
    })
})


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})