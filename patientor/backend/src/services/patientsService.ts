import patientsData from '../data/patients.ts';
import type { NonSensitivePatients, Patient } from '../types/diagnosis.ts'; 

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getNonSensitivePatients
};