import { Entry, Diagnosis, DiagnosisCodes } from "../../types";

const DiagnosisCodeList = ({
  diagnoses,
  diagnosisCodes,
}: {
  diagnoses: Diagnosis[];
  diagnosisCodes: DiagnosisCodes;
}) => {
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

const Entries = ({
  entries,
  diagnoses,
}: {
  entries: Entry[];
  diagnoses: Diagnosis[];
}) => {
  return (
    <div>
      <h4>entries</h4>

      {entries.map((entry) => (
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          {entry.diagnosisCodes && (
            <DiagnosisCodeList
              diagnosisCodes={entry.diagnosisCodes}
              diagnoses={diagnoses}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Entries;
