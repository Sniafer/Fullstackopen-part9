import express from "express";
import patientsServices from "../services/patientsServices";
import { isPatient, toNewEntry, toNewPatientsEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  res.send(patientsServices.getSinglePatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientsEntry(req.body);
    const addedEntry = patientsServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id", (req, res) => {
  try {
    const patient = patientsServices.getSinglePatient(req.params.id);
    if (!patient || !isPatient(patient)) {
      throw new Error("Incorrect or missing visibility: " + patient);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsServices.addEntry(newEntry, patient);
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
