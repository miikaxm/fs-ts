import diagnosesData from '../data/diagnoses.ts';
import type { Diagnosis } from '../types/types.ts';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getDiagnoses
};