import mongoose,{Schema} from "mongoose";
import { Diagnosis } from "../types";


const diagnosisSchema = new Schema<Diagnosis>({
    code:{type : String ,required : true ,unique : true},
    name: {type : String ,required : true},
    latin: { type: String }

})

diagnosisSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    
    const cleanObject = returnedObject as unknown as Record<string, unknown>;    // some retarded shit right here
    delete cleanObject._id;
    delete cleanObject.__v;
  }
});

export default mongoose.model<Diagnosis>('Diagnosis', diagnosisSchema);