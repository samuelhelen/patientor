export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// ENTRY TYPES

export enum EntryType {
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
}
export const entryTypeFields: string[] = Object.values(EntryType);

export type DiagnosisCodes = Array<Diagnosis["code"]>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: DiagnosisCodes;
}

// SickLeave:
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  // type: "OccupationalHealthcare";
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: DateRange;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  // type: "Hospital";
  type: EntryType.Hospital;
  discharge: Discharge;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export const healthCheckRatingFields = Object.values(HealthCheckRating).map(
  (f) => Number(f),
);

export interface HealthCheckEntry extends BaseEntry {
  // type: "HealthCheck";
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

// export type CommonEntryFields = Omit<BaseEntry, "id"> & { type: EntryType };
export type CommonEntryFields = Omit<BaseEntry, "id">;

// https://github.com/microsoft/TypeScript/issues/42680
// Omit utility type for unions:
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryFormValues = UnionOmit<Entry, "id">;

// PATIENT TYPES

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
