import {
  Diagnosis,
  DiagnosisCodes,
  Entry,
  EntryType,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckEntry,
} from "../../types";
import { assertNever } from "../../utils";

const entryStyle = {
  borderStyle: "solid",
  borderColor: "black",
  padding: "1em",
  marginBottom: "0.5em",
};

const DiagnosisCodeList = ({
  diagnoses,
  diagnosisCodes,
}: {
  diagnoses: Diagnosis[];
  diagnosisCodes: DiagnosisCodes | undefined;
}) => {
  if (!diagnosisCodes) {
    return null;
  }

  const diagnosisNameFromCode = (diagnoses: Diagnosis[], code: string) => {
    const diagnosis = diagnoses.find(
      (diagnosis: Diagnosis) => diagnosis.code === code,
    );
    return diagnosis ? diagnosis.name : "";
  };

  return (
    <ul>
      {diagnosisCodes.map((code) => (
        <li key={code}>
          {code} {diagnosisNameFromCode(diagnoses, code)}
        </li>
      ))}
    </ul>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  // NOTE: the diagnosisCodes default [] might make debugging more difficult
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} {entry.type} {entry.employerName}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
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
        {entry.date} {entry.type}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
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
        {entry.date} {entry.type}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>Health rating: {entry.healthCheckRating}</div>
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
