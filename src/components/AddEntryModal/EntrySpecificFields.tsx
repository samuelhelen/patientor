import { Dispatch, /*ChangeEvent,*/ SetStateAction } from "react";

import {
  // InputLabel,
  // Select,
  // SelectChangeEvent,
  TextField,
} from "@mui/material";

import { Discharge, EntryType } from "../../types";

const EntrySpecificFields = ({
  type,
  dischargeDate,
  setDischargeDate,
  criteria,
  setCriteria,
}: {
  type: EntryType;
  dischargeDate: string;
  setDischargeDate: Dispatch<SetStateAction<Discharge["date"]>>;
  criteria: string;
  setCriteria: Dispatch<SetStateAction<string>>;
}) => {
  // OccupationalHealthcare

  // HealthCheck

  switch (type) {
    case EntryType.Hospital: {
      return (
        <>
          <TextField
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Criteria"
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </>
      );
    }
    case EntryType.OccupationalHealthcare: {
      return (
        <>
          <h1>TODO</h1>
        </>
      );
    }
    case EntryType.HealthCheck: {
      return (
        <>
          <h1>TODO</h1>
        </>
      );
    }
    default: {
      return <div>You shold not see this but entry type specific inputs</div>;
    }
    // <InputLabel>Entry type</InputLabel>
    // <Select
    //   label="EntryType"
    //   fullWidth
    //   value={type}
    //   onChange={onEntryTypeChange}
    // >
    //   {entryTypeOptions.map((option) => (
    //     <MenuItem key={option.label} value={option.value}>
    //       {option.label}
    //     </MenuItem>
    //   ))}
    // </Select>
  }
};

export default EntrySpecificFields;
