import { useState, SyntheticEvent } from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import {
  CommonEntryFields,
  DateRange,
  Diagnosis,
  Discharge,
  EntryFormValues,
  EntryType,
  HealthCheckRating,
  entryTypeFields,
} from "../../types";

import EntrySpecificFields from "./EntrySpecificFields";
import Date from "./Date";

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
  const [diagnosisCode, setDiagnosisCode] = useState<Diagnosis["code"]>("");
  const [availableDiagnosisCodes, setAvailableDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);

  // Specific Entry Fields
  const [type, setType] = useState<EntryType>(EntryType.Hospital);
  // Hospital
  const [dischargeDate, setDischargeDate] = useState<Discharge["date"]>("");
  const [criteria, setCriteria] = useState("");
  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickStartDate, setSickStartDate] = useState("");
  const [sickEndDate, setSickEndDate] = useState("");
  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

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

      return;
    }
    const entryType: EntryType = value;
    setType(entryType);
  };

  const onAddDiagnosisCode = () => {
    const regex = /^[A-Z]\d\d\.([A-Z0-9]){1,3}$/;
    if (!regex.test(diagnosisCode)) {
      // IS AN INVALID DIAGNOSIS CODE
      // TODO:
      return;
    }

    if (availableDiagnosisCodes.includes(diagnosisCode)) {
      // ALREADY EXISTS
    } else {
      setAvailableDiagnosisCodes(availableDiagnosisCodes.concat(diagnosisCode));
    }

    setDiagnosisCode("");
  };

  const onDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>,
  ) => {
    event.preventDefault();
    const codes = event.target.value;
    setDiagnosisCodes(typeof codes === "string" ? codes.split(",") : codes);
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
        case EntryType.OccupationalHealthcare: {
          if (sickStartDate || sickEndDate) {
            const sickLeave: DateRange = {
              startDate: sickStartDate,
              endDate: sickEndDate,
            };
            return {
              ...commonFields,
              type,
              employerName,
              sickLeave,
            };
          }

          return { ...commonFields, type, employerName };
        }
        case EntryType.HealthCheck: {
          return {
            ...commonFields,
            healthCheckRating,
            type,
          };
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

        <Date label="Date" date={date} setDate={setDate} />

        {/* TODO: Refactor into its own component: */}
        <InputLabel style={{ marginTop: 20 }} htmlFor="diagnosis-codes">
          Diagnosis codes (optional)
        </InputLabel>
        <fieldset id="diagnosis-codes" style={{ borderStyle: "none" }}>
          <Box display="flex">
            <TextField
              label="Add diagnosis code for selection (format A00.000)"
              placeholder="Z57.1"
              fullWidth
              value={diagnosisCode}
              onChange={({ target }) => setDiagnosisCode(target.value)}
            />
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onAddDiagnosisCode}
            >
              Add
            </Button>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="selected-diagnosis-codes">
              Selected diagnosis codes
            </InputLabel>
            <Select
              labelId="selected-diagnosis-codes"
              label="Selected diagnosis codes"
              fullWidth
              value={diagnosisCodes}
              onChange={onDiagnosisCodesChange}
              multiple
            >
              {availableDiagnosisCodes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </fieldset>

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

        {/* TODO: refactor: */}
        <EntrySpecificFields
          type={type}
          dischargeDate={dischargeDate}
          setDischargeDate={setDischargeDate}
          criteria={criteria}
          setCriteria={setCriteria}
          employerName={employerName}
          setEmployerName={setEmployerName}
          sickStartDate={sickStartDate}
          setSickStartDate={setSickStartDate}
          sickEndDate={sickEndDate}
          setSickEndDate={setSickEndDate}
          healthCheckRating={healthCheckRating}
          setHealthCheckRating={setHealthCheckRating}
        />

        {/* TODO: refactor with AddPatientForm: */}
        <Grid>
          <Grid item>
            <Button
              color="warning"
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
