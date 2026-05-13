import express, { Request, Response } from 'express';
import PatientModel from '../models/patient';
import { NonSensitivePatient } from '../types';
import { NewPatientSchema } from '../utils';
import { z } from 'zod';
import { request } from 'node:http';
import { NewEntrySchema ,NewEntry} from '../utils';

const router = express.Router();
//get==========
router.get('/', async (_req: Request, res: Response<NonSensitivePatient[]>) => {
  const patients = await PatientModel.find({});

  const nonSensitivePatients = patients.map(patient => {
    const cleanPatient = patient.toJSON() as unknown as  Record<string, unknown>;
    //Blindfold yourself (unknown), and stop treating this thing like a highly-regulated medical Patient. 
    // Just treat it like a generic, lawless bucket of strings and random data (Record). 
    // I am taking the lid off the bucket so I can reach in and throw the SSN in the trash.
    
    delete cleanPatient.ssn;
    
    return cleanPatient;
  });

  res.json(nonSensitivePatients as NonSensitivePatient[]);
});

//post======

router.post('/' ,async (req:Request ,res: Response) =>{
    try {
        const validPatientData = NewPatientSchema.parse(req.body)
        const patient  = new PatientModel(validPatientData)
        const savedPatient = await patient.save()
        const cleanPatient = savedPatient.toJSON() as unknown as Record<string,unknown>

        delete cleanPatient.ssn
        res.json(cleanPatient as NonSensitivePatient);
        
    } catch (error) {
        if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
    }
})

//get=============

router.get('/:id' , async(req: Request , res: Response ) => {
  try {
    const { id } = req.params;

    const patient = await PatientModel.findById(id);

    if (!patient) {
      res.status(404).send({ error: 'Patient not found' });
      return; 
    }

    const cleanPatient = patient.toJSON() as unknown as  Record<string, unknown>;

    res.json(cleanPatient);
    
  } catch (error) {
    res.status(400).send({ error: 'Malformed patient ID' });
  }
  
})




// --- THE NEW ENTRY ROUTE ---
router.post('/:id/entries', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. Make sure the patient actually exists first!
    const patient = await PatientModel.findById(id);
    if (!patient) {
      res.status(404).send({ error: 'Patient not found in the vault' });
      return; 
    }

    // 2. Hand the payload to the Shapeshifting Bouncer
    const validEntryData = NewEntrySchema.parse(req.body);

    // 3. Mongoose magic: Push the new entry into the patient's array
    patient.entries.push(validEntryData as any);
    
    // 4. Save the patient document back to MongoDB
    await patient.save();

    // 5. Mongoose automatically gives the new entry an _id. 
    // We grab the very last entry we just added to send back to the frontend!
    const addedEntry = patient.entries[patient.entries.length - 1];
    
    res.json(addedEntry);

  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error adding entry' });
    }
  }
});
export default router;