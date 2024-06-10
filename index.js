// expenses manager app
import express from "express";
import { port } from "./constants/common.js";

const app = express();
const expenses = [];

app.post("/expenses", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});