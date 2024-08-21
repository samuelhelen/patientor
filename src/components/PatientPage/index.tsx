// TODO: refactor with PatientListPage and AddPatientModal

import { Box, Button, Typography } from "@mui/material";
// the commented out stuff if you want to replace gender texts with icons:
// https://mui.com/material-ui/material-icons/
// import {} from "@mui/icons-material"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

import { Diagnosis, EntryFormValues, Patient } from "../../types";

import patientService from "../../services/patients";

import Entries from "./Entries";
import AddEntryModal from "../AddEntryModal";

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

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

  // TODO: refactor, possibly with PatientListPage/index.tsx:
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setErrorMessage(undefined);
  };

  // TODO: refactor with submitNewPatient from PatientListPage
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({ ...patient, entries: [...patient.entries, entry] });
      setModalOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === "string"
        ) {
          const message = error.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setErrorMessage(message);
        } else {
          setErrorMessage("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", error);
        setErrorMessage("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h5">
          {patient.name} ({patient.gender})
        </Typography>
        {patient.ssn && <div>ssn: {patient.ssn}</div>}
        <div>occupation: {patient.occupation}</div>
      </Box>
      <Entries entries={patient.entries} diagnoses={diagnoses} />

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={errorMessage}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
