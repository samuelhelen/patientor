import { FormControl, Input, InputLabel /*TextField*/ } from "@mui/material";

const Date = ({
  label,
  date,
  setDate,
}: {
  label: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <FormControl fullWidth style={{ marginTop: 15 }}>
      <InputLabel htmlFor="date-input" shrink>
        {label}
      </InputLabel>
      <Input
        style={{ marginBottom: 10, marginTop: 10 }}
        id="date-input"
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
    </FormControl>
    // <TextField
    //   type="date"
    //   label={label}
    //   fullWidth
    //   value={date}
    //   onChange={({ target }) => setDate(target.value)}
    //   InputLabelProps={{
    //     shrink: true
    //   }}
    // />
  );
};

export default Date;
