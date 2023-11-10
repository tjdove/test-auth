import express from "express";
export const autoRouter = express.Router();

//Client methods to prisma.
import { getAutoByPlate } from "../database";

// Get All
/* autoRouter.get("/", async (req, res) => {
  const autos = await getAutos();
  res.send(autos);
  // res.status(201).json(autos);
});
 */
// Get one by Plate
autoRouter.get("/plate/:id", async (req, res) => {
  const plate: string = req.params.id;
  console.log("/plate/:id:  " + plate);
  const user = await getAutoByPlate(plate);
  res.send(user);
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
