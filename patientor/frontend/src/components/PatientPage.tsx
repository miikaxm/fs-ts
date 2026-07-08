import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';


const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(patient => {
        setPatient(patient);
      });
    }
  }, [id]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  if (patient.gender == "male") {
    return (
        <div>
            <Typography variant="h5">{patient.name} <MaleIcon></MaleIcon></Typography>
            <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">date of birth: {patient.dateOfBirth}</Typography>
        </div>
    );
  } if (patient.gender == "female") {
    return (
        <div>
            <Typography variant="h5">{patient.name} <FemaleIcon></FemaleIcon></Typography>
            <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">date of birth: {patient.dateOfBirth}</Typography>
        </div>
    );
  } else {
    return (
        <div>
            <Typography variant="h5">{patient.name} <TransgenderIcon></TransgenderIcon></Typography>
            <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">date of birth: {patient.dateOfBirth}</Typography>
        </div>
    );
  }
  
};

export default PatientPage;