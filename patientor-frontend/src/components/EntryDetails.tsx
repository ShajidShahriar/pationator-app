import { Entry, Diagnosis } from "../types";

const EntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) => {
  const renderDiagnoses = () => {
    if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0) return null;

    return (
      <ul>
        {entry.diagnosisCodes.map((code) => {
          const diagnosisName = diagnoses.find((d) => d.code === code)?.name;
          return (
            <li key={code}>
              <strong>{code}</strong> {diagnosisName ? `- ${diagnosisName}` : ""}
            </li>
          );
        })}
      </ul>
    );
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={{ border: "2px solid red", padding: "10px", margin: "10px 0" }}>
          <h4> Hospital Visit ({entry.date})</h4>
          <p>
            <em>{entry.description}</em>
          </p>
          {renderDiagnoses()}
          <p>Discharged on: {entry.discharge.date}</p>
          <p>Reason: {entry.discharge.criteria}</p>

          <p>Diagnosed by: {entry.specialist}</p>
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div style={{ border: "2px solid blue", padding: "10px", margin: "10px 0" }}>
          <h4>Occupational Healthcare ({entry.date})</h4>
          {renderDiagnoses()}

          <p>
            Employer: <strong>{entry.employerName}</strong>
          </p>
          <p>
            <em>{entry.description}</em>
          </p>
          {entry.sickLeave && (
            <p>
              Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </p>
          )}
          <p>Diagnosed by: {entry.specialist}</p>
        </div>
      );

    case "HealthCheck":
      return (
        <div style={{ border: "2px solid green", padding: "10px", margin: "10px 0" }}>
          <h4> Routine Health Check ({entry.date})</h4>
          {renderDiagnoses()}

          <p>
            <em>{entry.description}</em>
          </p>
          <p>Health Rating: {entry.healthCheckRating}</p>
          <p>Diagnosed by: {entry.specialist}</p>
        </div>
      );

    default:
      return null;
  }
};

export default EntryDetails;
