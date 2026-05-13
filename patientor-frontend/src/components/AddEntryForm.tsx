import { useState } from "react";
import { Entry } from "../types";
import { EntryFormValues, HealthCheckRating } from "../types";
import { Diagnosis } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  diagnoses : Diagnosis[]
}

const AddEntryForm = ({ onSubmit ,diagnoses }: Props) => {

    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  // 1. The Core Base State (Every visit needs these)
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");

  const [type, setType] = useState<EntryFormValues["type"]>("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");

  const handleDiagnosisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(event.target.selectedOptions, (option) => option.value);
    setDiagnosisCodes(value);
  };



  const addEntry = (event: React.FormEvent) => {
    event.preventDefault();

    // Base object shared by everyone
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria }
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          // sickLeave: { ... } // Optional
        });
        break;
    }
  };

  return (
    <div
      style={{ border: "2px dashed black", padding: "20px", marginTop: "20px" }}
    >
      <h3>Add New Medical Entry</h3>

      <form onSubmit={addEntry}>
        <div
          style={{
            marginBottom: "15px",
            paddingBottom: "15px",
            borderBottom: "1px solid gray",
          }}
        >
          <label>
            <strong>Entry Type: </strong>
          </label>
          <select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="HealthCheck">Health Check</option>
            <option value="Hospital">Hospital Visit</option>
            <option value="OccupationalHealthcare">
              Occupational Healthcare
            </option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description: </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Specialist: </label>
          <input
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            required
          />
        </div>

        {/* --- DYNAMIC FIELDS --- */}

        {type === "HealthCheck" && (
          <div style={{ marginBottom: "10px", padding: "10px", background: "#e8f5e9" }}>
            <label>Health Check Rating (0-3): </label>
            <select
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            >
              <option value={0}>Healthy</option>
              <option value={1}>Low Risk</option>
              <option value={2}>High Risk</option>
              <option value={3}>Critical Risk</option>
            </select>
          </div>
        )}

        {type === "Hospital" && (
          <div style={{ marginBottom: "10px", padding: "10px", background: "#ffebee" }}>
            <div>
              <label>Discharge Date: </label>
              <input
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>Discharge Criteria: </label>
              <input
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              />
            </div>
          </div>
        )}

        {type === "OccupationalHealthcare" && (
          <div style={{ marginBottom: "10px", padding: "10px", background: "#e3f2fd" }}>
            <label>Employer Name: </label>
            <input
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </div>
        )}
        <div style={{ marginBottom: "10px" }}>
    <label><strong>Diagnosis Codes (Hold Ctrl/Cmd to select multiple):</strong></label>
    <select multiple value={diagnosisCodes} onChange={handleDiagnosisChange} style={{ width: '100%', height: '100px' }}>
      {diagnoses.map(d => (
        <option key={d.code} value={d.code}>
          {d.code} - {d.name}
        </option>
      ))}
    </select>
  </div>

        <button
          type="submit"
          style={{ marginTop: "15px", padding: "5px 15px", cursor: "pointer" }}
        >
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default AddEntryForm;
