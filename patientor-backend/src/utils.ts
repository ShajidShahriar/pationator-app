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

const BaseEntrySchema = z.object({
  description: z.string().min(1, "Description cannot be empty"),
  date: z.string().date("Invalid date format"),
  specialist: z.string().min(1, "Specialist cannot be empty"),
  diagnosisCodes: z.array(z.string()).optional()
});

// 2. The Health Check Rules
const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().min(0).max(3)
});

// 3. The Hospital Rules
const HospitalSchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date("Invalid discharge date"),
    criteria: z.string().min(1, "Discharge criteria needed")
  })
});

// 4. The Occupational Healthcare Rules
const OccupationalSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, "Employer name required"),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional()
});

// 5. THE ULTIMATE SHAPESHIFTER BOUNCER
export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckSchema,
  HospitalSchema,
  OccupationalSchema
]);


export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;