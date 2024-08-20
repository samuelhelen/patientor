import { Entry, DiagnosisCodes } from "../../types";

const DiagnosisCodeList = ({
  diagnosisCodes,
}: {
  diagnosisCodes: DiagnosisCodes;
}) => {
  return (
    <ul>
      {diagnosisCodes.map((code) => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  );
};

const Entries = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      <h4>entries</h4>

      {entries.map((entry) => (
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          {entry.diagnosisCodes && (
            <DiagnosisCodeList diagnosisCodes={entry.diagnosisCodes} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Entries;
