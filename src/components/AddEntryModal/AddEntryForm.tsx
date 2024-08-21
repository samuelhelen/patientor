import { useState, ChangeEvent, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import {
  CommonEntryFields,
  Diagnosis,
  Discharge,
  EntryFormValues,
  EntryType,
  HealthCheckRating,
  entryTypeFields,
} from "../../types";

import EntrySpecificFields from "./EntrySpecificFields";

const entryTypeOptions: Array<{ value: EntryType; label: string }> =
  Object.values(EntryType).map((v) => ({
    value: v,
    label: v.toString(),
  }));

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  // CommonEntryFields
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);

  // Specific Entry Fields
  // Hospital
  const [dischargeDate, setDischargeDate] = useState<Discharge["date"]>("");
  const [criteria, setCriteria] = useState("");

  const [type, setType] = useState<EntryType>(EntryType.Hospital);

  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);

  // Event handlers

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    const value = event.target.value;

    // TODO: move to utils
    const isEntryType = (variable: string): variable is EntryType => {
      return typeof variable === "string" && entryTypeFields.includes(variable);
    };
    if (!isEntryType(value)) {
      console.error(
        "AddEntryForm onEntryTypeChange issue. You shouldn't be here.",
      );

      // TODO: remove
      console.log(`value: '${value}', entryTypeFields: '${entryTypeFields}'`);

      return;
    }
    const entryType: EntryType = value;
    setType(entryType);
  };

  const onDiagnosisCodesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const codes = event.target.value.split(", ");
    if (codes.length === 0 || codes[0] === "") {
      setDiagnosisCodes([]);
      return;
    }
    setDiagnosisCodes(codes);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const commonFields: CommonEntryFields = {
      description,
      specialist,
      date,
      // type,
    };
    if (diagnosisCodes.length) {
      commonFields.diagnosisCodes = diagnosisCodes;
    }

    const entryCandidate: EntryFormValues = ((): EntryFormValues => {
      switch (type) {
        case EntryType.Hospital: {
          const discharge = {
            date: dischargeDate,
            criteria,
          };
          return {
            ...commonFields,
            discharge,
            type,
          };
        }
        // case EntryType.OccupationalHealthcare: {

        // }
        case EntryType.HealthCheck: {
          const healthCheckEntryCandidate = {
            ...commonFields,
            healthCheckRating,
            type,
          };
          return healthCheckEntryCandidate;
        }
        default:
          throw new Error(
            "AddEntryForm addEntry entryCandidate issue: missing sth",
          );
      }
    })();

    onSubmit(entryCandidate);
  };

  // Rendering

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Diagnosis codes (optional)"
          placeholder="Z57.1, N30.0"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
        />

        <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
        <Select
          label="EntryType"
          fullWidth
          value={type}
          onChange={onEntryTypeChange}
          style={{ marginBottom: 20 }}
        >
          {entryTypeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <EntrySpecificFields
          type={type}
          dischargeDate={dischargeDate}
          setDischargeDate={setDischargeDate}
          criteria={criteria}
          setCriteria={setCriteria}
        />

        {/* TODO: refactor with AddPatientForm: */}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
