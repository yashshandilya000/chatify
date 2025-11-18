// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import messageRoute from "./routes/messageRoute.js";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 3000;

app.use("/api/auth", Router);
app.use("/api/message", messageRoute);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../socket/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../socket", "dist", "index.html"));
  });
}

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
