const express = require("express");
const app = express();
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://n33dl34dm1n:ma4ng31pomme@cluster0.ydg15.mongodb.net/need-stock?retryWrites=true&w=majority"
    );

app.get("/getUsers", (req,res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    }); 
});

app.post("/createUser",async (req,res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user)
});

app.put("/updateUser/:id",async(req,res) => {
    
    const user = UserModel.findById()
    const updatedUser = UserModel(user)
})

app.listen(3001,() => {
    console.log("Server runs on 3001");
})