import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import EntryDetails from "./EntryDetails";

const PatientDetails = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getById(id);
        setPatient(data);
      }
    };
    fetchPatient();
  }, [id]);
  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div style={{ marginTop: "20px", border: "1px solid black", padding: "10px" }}>
      <h2>{patient.name}</h2>
      <p>
        <strong>SSN:</strong> {patient.ssn}
      </p>
      <p>
        <strong>Gender:</strong> {patient.gender}
      </p>
      <p>
        <strong>Occupation:</strong> {patient.occupation}
      </p>

      <h3>Medical Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No medical history found.</p>
      ) : (
        <div>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
