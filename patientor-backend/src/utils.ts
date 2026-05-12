import {z} from 'zod';
import { Gender } from './types';
const GenderEnum = z.enum(["male", "female", "other"]);

export const NewPatientSchema = z.object({
  // Name must be at least 2 characters long and not just numbers
  name: z.string().min(2, "Name is too short"),
  
  // SSN in this app usually follows the Finnish format: DDMMYY-XXXX 
  // Let's at least enforce a minimum length and a hyphen
  ssn: z.string().min(8, "SSN must be at least 8 characters"),
  
  occupation: z.string().min(2, "Occupation is required"),
  
  dateOfBirth: z.string().date("Must be a valid date string"), 
  
  gender: GenderEnum
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;