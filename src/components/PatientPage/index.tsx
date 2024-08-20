import { Box, Typography } from "@mui/material";
// the commented out stuff if you want to replace gender texts with icons:
// https://mui.com/material-ui/material-icons/
// import {} from "@mui/icons-material"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Patient } from "../../types";

import patientService from "../../services/patients";

import Entries from "./Entries";

const PatientPage = () => {
  const { patientId } = useParams();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (typeof patientId !== "string") {
      return;
    }

    const fetchPatient = async () => {
      const newPatient = await patientService.getById(patientId);
      // TODO: handle error responses

      setPatient(newPatient);
    };
    fetchPatient();
  }, [patientId]);

  // TODO: handle loading and error notification separately:
  if (!patient) {
    return <div>Loading or patient loading failed</div>;
  }

  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h5">
          {patient.name} ({patient.gender})
        </Typography>
        {patient.ssn && <div>ssn: {patient.ssn}</div>}
        <div>occupation: {patient.occupation}</div>
      </Box>
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientPage;
