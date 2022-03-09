import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientsEntry,
} from "../types";

const getEntries = (): PatientsEntry[] => {
  return patients;
};

const getSinglePatient = (id: string): PatientsEntry | unknown => {
  const patient = patients.filter((p) => p.id === id);
  if (patient) return patient[0];
  return null;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect or missing id");
  }

  return id;
};

const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  const id = uuid(); // eslint-disable-line
  const newEntry = {
    id: parseId(id),
    ...entry,
  };
  patients.push(newEntry);
  return newEntry;
};

const addEntry = (entry: NewEntry, patient: PatientsEntry): Entry => {
  const id = uuid(); // eslint-disable-line
  const newEntry = {
    id: parseId(id),
    ...entry,
  };
  patients.find((p) => p.id === patient.id)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getSinglePatient,
  addEntry,
};
