import { useState } from "react";
import { Gender } from "../types";
import { PatientFormValues } from "../types";
interface Props {
  onSubmit: (values: PatientFormValues) => void;
}

const AddPatientForm = ({ onSubmit }: Props) => {
  // Local state just for the typing
  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.Other);

const addPatient = (event: React.FormEvent) => {
    event.preventDefault(); 
    
    // 1. Package the data
    onSubmit({
      name,
      ssn,
      dateOfBirth,
      occupation,
      gender
    });
    setName("");
    setSsn("");
    setDateOfBirth("");
    setOccupation("");
    setGender(Gender.Other);
  };

  return(
    <div style={{ border: "2px dashed gray", padding: "20px", marginBottom: "20px" }}>
      <h3>Add New Patient</h3>
      <form onSubmit={addPatient}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <label>SSN: </label>
          <input value={ssn} onChange={(e) => setSsn(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Date of Birth: </label>
          {/* Using type="date" gives us a free calendar UI! */}
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Occupation: </label>
          <input value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Gender: </label>
          <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
            {Object.values(Gender).map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ padding: "5px 15px", cursor: "pointer" }}>
          Add Patient
        </button>
      </form>
    </div>

  )
}

export default AddPatientForm;