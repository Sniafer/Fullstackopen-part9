import express from "express";
import patientsServices from "../services/patientsServices";
import toNewPatientsEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientsEntry(req.body);
    const addedEntry = patientsServices.addEntries(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
