import { Diagnosis, Entry } from "../../types";

import EntryDetails from "./EntryDetails";

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
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default Entries;
