import patientsData from '../data/patients.ts';
import { v1 as uuid } from 'uuid';
import type { NonSensitivePatients, Patient, NewPatientEntry, Entry, NewEntry } from '../types/types.ts'; 

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: []
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry,): Entry | undefined => {
  
  const patient = patientsData.find(p => p.id === patientId);

  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry
};