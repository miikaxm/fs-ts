import express, { type Response} from 'express';
import type { NonSensitivePatients } from '../types/diagnosis.ts';
import patientsService from '../services/patientsService.ts';


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default router;