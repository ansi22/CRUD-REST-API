require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// db-connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("DB connected successfully!"));

app.use(express.json());

const developersRouter = require("./routes/developers");
app.use("/developers", developersRouter);

//server-connection
app.listen(3000, () => console.log("Server Started!"));
