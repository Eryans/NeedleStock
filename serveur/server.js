const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.port || 5000;
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.MONGODB_LINK);

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/group", require("./routes/groupsRoutes"));
app.use("/api/item", require("./routes/itemsRoute"));
app.use("/api/request",require("./routes/requestRoute"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server runs on ${port}`);
});
