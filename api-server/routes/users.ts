import express from "express";
export const userRouter = express.Router();

//Client methods to prisma.
import {
  getUser,
  getUsers,
  createUser,
  removeUser,
  updateUser,
  getUserAuth,
} from "../database";

// Get All
userRouter.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
  // res.status(201).json(users);
});

// Create
userRouter.post("/", async (req, res) => {
  const user = req.body;
  const createdUser = await createUser(user);
  res.status(201).json(createdUser);
});

// Get one by ID
userRouter.get("/:id", async (req, res) => {
  const id: number = Number(req.params.id);
  console.log("/users/:id:  " + id);
  const user = await getUser(id);
  res.send(user);
});

// Update
userRouter.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const updatedUser = await updateUser(id, data);
  res.status(200).json(updatedUser);
});

// Delete
userRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await removeUser(id);
  res.status(204).send();
});

// Create
userRouter.post("/auth", async (req, res) => {
  const reqBody = req.body;
  console.log(":" + reqBody.username + ":" + reqBody.password);
  const user = await getUserAuth(reqBody.username, reqBody.password);
  console.log(
    "AUTH:POST:Results: " +
      user?.username +
      ":" +
      user?.password +
      ":" +
      user?.id
  );
  res.status(200).json(user);
});
