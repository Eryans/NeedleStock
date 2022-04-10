const express = require("express");
const dotenv = require('dotenv').config();
const port = process.env.port ||  5000;
const app = express();
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddleware');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose.connect(
    "mongodb+srv://n33dl34dm1n:ma4ng31pomme@cluster0.ydg15.mongodb.net/need-stock?retryWrites=true&w=majority"
    );

app.use('/api/user',require('./routes/userRoutes'));
app.use('/api/jewel',require('./routes/jewelryRoute'));

app.use(errorHandler)

app.listen(port,() => {
    console.log(`Server runs on ${port}`);
})