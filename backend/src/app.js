// const express = require("express");
import path from "path";
import express from "express";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import messageRoute from "./routes/messageRoute.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 3000;

app.use(express.json()); //it helps to read a json data from the request body/client side,it is a midlleware built in function of express

app.use("/api/auth", Router);
app.use("/api/message", messageRoute);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../socket/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../socket", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
