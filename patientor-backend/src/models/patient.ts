import mongoose, { Schema } from 'mongoose';
import { Patient } from '../types';

const patientSchema = new Schema<Patient>({
    name: {type:String , required: true},
    dateOfBirth:{type: String , required : true},
    ssn:{ type : String , required : true ,unique:true} ,
    gender:{type: String, required: true},
    occupation:{type: String, required: true},
})

patientSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    const cleanObject = returnedObject as unknown as Record<string, unknown>;
    
    cleanObject.id = String(cleanObject._id);
    
    delete cleanObject._id;
    delete cleanObject.__v;
  }
});

export default mongoose.model<Patient>('Patient', patientSchema);