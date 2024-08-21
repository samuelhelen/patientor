import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";

import {
  Diagnosis,
  Entry,
  EntryType,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckEntry,
} from "../../types";
import { assertNever } from "../../utils";

import DiagnosisCodeList from "./DiagnosisCodeList";

import HealthIndicator from "./HealthIndicator";

const entryStyle = {
  borderStyle: "solid",
  borderColor: "black",
  padding: "1em",
  marginBottom: "0.5em",
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  // NOTE: the diagnosisCodes default [] might make debugging more difficult
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} {/*entry.type*/} Occupational healthcare
        <MedicalInformationIcon /> {entry.employerName}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.sickLeave && (
        <div>
          Sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </div>
      )}
      <div>
        <DiagnosisCodeList
          diagnosisCodes={entry.diagnosisCodes}
          diagnoses={diagnoses}
        />
      </div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const HospitalEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  // NOTE: the diagnosisCodes default [] might make debugging more difficult
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} {/*entry.type*/} Hospital
        <LocalHospitalIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.discharge && (
        <div>
          Discharged until {entry.discharge.date} with the following criteria:{" "}
          {entry.discharge.criteria}
        </div>
      )}
      <div>
        <DiagnosisCodeList
          diagnosisCodes={entry.diagnosisCodes}
          diagnoses={diagnoses}
        />
      </div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  // NOTE: the diagnosisCodes default [] might make debugging more difficult
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} {/*entry.type*/} Health check
        <MonitorWeightIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <HealthIndicator rating={entry.healthCheckRating} />
      <div>
        <DiagnosisCodeList
          diagnosisCodes={entry.diagnosisCodes}
          diagnoses={diagnoses}
        />
      </div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

// TODO: NICE PROP DRILLING RIGHT HERE
const EntryDetails = ({
  diagnoses,
  entry,
}: {
  diagnoses: Diagnosis[];
  entry: Entry;
}) => {
  switch (entry.type) {
    case EntryType.OccupationalHealthcare: {
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    }
    case EntryType.Hospital: {
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    }
    case EntryType.HealthCheck: {
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    }
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
