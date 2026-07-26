import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Patient } from "../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import diagnosesService from "../services/diagnoses";
import EntryDetails from "./EntryDetails";


const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  // Get all diagnoses from backend
  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnosisList();
  }, []);

  // Get all patients from backend
  useEffect(() => {
    if (id) {
      patientService.getById(id).then(patient => {
        setPatient(patient);
      });
    }
  }, [id]);

  // If patient not found display it
  if (!patient) {
    return <div>Patient not found</div>;
  }

  const genderIcon =
    patient.gender === "male"
      ? <MaleIcon />
      : patient.gender === "female"
        ? <FemaleIcon />
        : <TransgenderIcon />

  return (
    <>
      <Typography variant="h5">{patient.name} {genderIcon}</Typography>
      <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
      <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
      <Typography variant="subtitle1">Date of birth: {patient.dateOfBirth}</Typography>
      <Typography variant="h5">Entries</Typography>

      {patient.entries.map(entry => (
        <EntryDetails 
          key={entry.id}
          entry={entry}
          diagnoses={diagnoses}
        />
      ))}
    </>
  );
}

export default PatientPage;