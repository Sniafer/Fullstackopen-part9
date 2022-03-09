import moment from "moment";
import {
  Gender,
  NewPatientEntry,
  NewEntry,
  HealthCheckRating,
  PatientsEntry,
  NewBaseEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing comment");
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return moment.utc(date).format("YYYY-MM-DD");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing visibility: " + gender);
  }
  return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthRating(rating)) {
    throw new Error("Health rating error: " + rating);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isType = (param: any): param is Type => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   return Object.values(Type).includes(param);
// };

// const parseType = (type: unknown): Type => {
//   if (!type || !isType(type)) {
//     throw new Error("Incorrect or missing visibility: " + type);
//   }
//   return type;
// };

const arrayIsString = (codes: Array<unknown>): codes is Array<string> => {
  let notString = false;
  codes.forEach((item) => {
    if (typeof item !== "string") notString = true;
  });
  if (!notString && codes.length > 0) return true;
  return false;
};

const parseCodes = (codes: Array<unknown>): Array<string> => {
  if (!codes || !arrayIsString(codes)) {
    throw new Error("Array is not an array of strings: " + codes);
  }
  return codes;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export const toNewPatientsEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseText(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseText(ssn),
    gender: parseGender(gender),
    occupation: parseText(occupation),
    entries: [],
  };

  return newEntry;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown[];
  type: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
  discharge?: {
    date: unknown;
    criteria: unknown;
  };
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
  let codes;

  if (entry.diagnosisCodes) {
    codes = parseCodes(entry.diagnosisCodes);
  }

  const newBaseEntry: NewBaseEntry = {
    description: parseText(entry.description),
    date: parseDate(entry.date),
    specialist: parseText(entry.specialist),
    diagnosisCodes: codes,
  };

  let newEntry: NewEntry = {
    ...newBaseEntry,
  } as NewEntry;
  const typeCheck = () => {
    const assertNever = () => {
      throw new Error(`Unhandled discriminated union member`);
    };
    switch (entry.type) {
      case "HealthCheck":
        newEntry = {
          ...newEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        };
        return newEntry;
      case "OccupationalHealthcare":
        newEntry = {
          ...newEntry,
          type: "OccupationalHealthcare",
          employerName: parseText(entry.employerName),
          sickLeave: {
            startDate: parseDate(entry.sickLeave?.startDate),
            endDate: parseDate(entry.sickLeave?.endDate),
          },
        };
        return newEntry;
      case "Hospital":
        newEntry = {
          ...newEntry,
          type: "Hospital",
          discharge: {
            date: parseDate(entry.discharge?.date),
            criteria: parseText(entry.discharge?.criteria),
          },
        };
        return newEntry;
      default:
        return assertNever;
    }
  };

  typeCheck();

  if (newEntry.type) {
    return newEntry;
  } else {
    throw new Error(`Missing or incorrect type`);
  }
};

export const isPatient = (patient: unknown): patient is PatientsEntry => {
  return (patient as PatientsEntry) !== undefined;
};
