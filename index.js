import express from "express";
import { port } from "./constants/common.js";

const app = express();
const expenses = [];
app.use(express.json());

app.post("/expenses", (req, res) => {
  const userObj = req.body;
  const id = expenses.length + 1;
  const createdAt = new Date().toLocaleString();
  const newUser = { id, ...userObj, createdAt };
  expenses.push(newUser);
  if (!expenses) {
    res.status(400).send("User is not found");
  } else {
    res.send(expenses);
  }
});

app.get("/expenses", (req, res) => {
  if (expenses.length < 1) {
    res.status(404).json({
      success: false,
      message: "Fill in the field to display the data",
      data: null,
    });
  } else {
    res.status(200).json({ success: true, data: expenses });
  }
});
app.get("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const userId = expenses.find((user) => user.id === parseInt(id));
  if (!userId) {
    res
      .status(404)
      .json({ success: false, message: "User not found", data: null });
  } else {
    res.status(200).json({ success: true, data: userId });
  }
});

app.put("/expenses", (req, res) => {
  const id = parseInt(req.body.id);
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "User not found", data: null });
  } else {
    const userUpdateTime = new Date().toLocaleString();
    const updatedUser = { ...req.body, userUpdateTime };
    expenses[index] = updatedUser;
    res.json({ success: true, data: updatedUser });
  }
});

app.delete("/expenses/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const findIndex = expenses.findIndex((user) => user.id === userId);
  if (findIndex !== -1) {
    expenses.splice(findIndex, 1);
    res.json({ success: true, message: "User successfully deleted " });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
