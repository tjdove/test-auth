import express from "express";
export const autoRouter = express.Router();

//Client methods to prisma.
import { getAutoByPlate, getAutos } from "../database";

// Get All
autoRouter.get("/", async (req, res) => {
  console.log("/auto");
  const autos = await getAutos();
  res.send(autos);
  // res.status(201).json(autos);
});

// Get one by Plate
autoRouter.get("/plate/:id", async (req, res) => {
  console.log("/auto/plate/:PLATE");
  const plate: string = req.params.id;
  console.log("/plate/:id:  " + plate);
  const auto = await getAutoByPlate(plate);
  console.log("/plate/:id:auto  " + auto);
  console.log(auto);
  if (auto == null) {
    res.status(404).send("Plate Not Found");
  } else {
    //res.statusCode;
    res.send(auto);
  }
});

// Create
/* autoRouter.post("/", async (req, res) => {
  const user = req.body;
  const createdAuto = await createAuto(user);
  res.status(201).json(createdAuto);
}); */

// Update
/* autoRouter.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const updatedAuto = await updateAuto(id, data);
  res.status(200).json(updatedAuto);
}); */

// Delete
/* autoRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await removeAuto(id);
  res.status(204).send();
}); */
