export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<PatientsEntry, "id">;

export type NonSensitivePatientEntry = Omit<PatientsEntry, "ssn" | "entries">;
