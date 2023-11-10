import express from "express";
export const jobRouter = express.Router();

//Client methods to prisma.
import { removeJob, createJob } from "../database";

// Get All
/* jobRouter.get("/", async (req, res) => {
  const jobs = await getJobs();
  res.send(jobs);
  // res.status(201).json(jobs);
}); */

// Create
jobRouter.post("/", async (req, res) => {
  const job = req.body;
  const createdJob = await createJob(job);
  res.status(201).json(createdJob);
});

// Update
/* jobRouter.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const updatedJob = await updateJob(id, data);
  res.status(200).json(updatedJob);
}); */

// Delete
jobRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await removeJob(id);
  res.status(204).send();
});
