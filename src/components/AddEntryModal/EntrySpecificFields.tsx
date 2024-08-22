import { Dispatch, SetStateAction } from "react";

import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import {
  EntryType,
  HealthCheckRating,
  healthCheckRatingFields,
} from "../../types";

import Date from "./Date";

const healthCheckRatingOptions = healthCheckRatingFields.map((v) => ({
  value: HealthCheckRating[v],
  label: v,
}));

type StringSetter = Dispatch<SetStateAction<string>>;
const EntrySpecificFields = ({
  type,
  dischargeDate,
  setDischargeDate,
  criteria,
  setCriteria,
  employerName,
  setEmployerName,
  sickStartDate,
  setSickStartDate,
  sickEndDate,
  setSickEndDate,
  healthCheckRating,
  setHealthCheckRating,
}: {
  type: EntryType;
  dischargeDate: string;
  setDischargeDate: StringSetter;
  criteria: string;
  setCriteria: StringSetter;
  employerName: string;
  setEmployerName: StringSetter;
  sickStartDate: string;
  setSickStartDate: StringSetter;
  sickEndDate: string;
  setSickEndDate: StringSetter;
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: Dispatch<SetStateAction<HealthCheckRating>>;
}) => {
  // TODO: possibly refactor with AddEntryForm onEntryTypeChange:
  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    const value = event.target.value;

    type Headache = keyof typeof HealthCheckRating;

    const isHcrStringKey = (variable: string): variable is Headache => {
      const hcrStrings = healthCheckRatingFields.map(
        (n) => HealthCheckRating[n],
      );
      return hcrStrings.includes(variable);
    };

    if (!isHcrStringKey(value)) {
      console.error("EntrySpecificFields onHealthCheckRatingChange issue.");

      return;
    }
    const hcrValue: Headache = value;

    const healthCheckRating: HealthCheckRating = HealthCheckRating[hcrValue];
    setHealthCheckRating(healthCheckRating);
  };

  switch (type) {
    case EntryType.Hospital: {
      return (
        <>
          <Date
            label="Discharge date"
            date={dischargeDate}
            setDate={setDischargeDate}
          />
          <TextField
            label="Discharge criteria"
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
          <TextField
            label="Employer name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />

          <InputLabel style={{ marginTop: 20 }} htmlFor="sick-leave">
            Sick leave (optional)
          </InputLabel>
          <fieldset id="sick-leave" style={{ borderStyle: "none" }}>
            <Date
              label="Start date"
              date={sickStartDate}
              setDate={setSickStartDate}
            />
            <Date
              label="End date"
              date={sickEndDate}
              setDate={setSickEndDate}
            />
          </fieldset>
        </>
      );
    }
    case EntryType.HealthCheck: {
      return (
        <>
          <InputLabel>Health check rating</InputLabel>
          <Select
            label="Health check rating"
            fullWidth
            value={HealthCheckRating[healthCheckRating]}
            onChange={onHealthCheckRatingChange}
          >
            {healthCheckRatingOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      );
    }
    default: {
      return (
        <div>Error: You shold not see this but entry type specific inputs</div>
      );
    }
  }
};

export default EntrySpecificFields;
