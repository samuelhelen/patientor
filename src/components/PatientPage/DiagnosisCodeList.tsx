import { Diagnosis, DiagnosisCodes } from "../../types";

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

export default DiagnosisCodeList;
