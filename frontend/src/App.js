import "./App.css";
import { useState } from "react";
import ReportView from "./components/ReportView";
import UploadForm from "./components/UploadForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>CreditSea XML Report Processor</h2>
      </header>

      <section className="upload-section">
        <div className="upload-form">
          <UploadForm onUploadSuccess={() => setRefresh(!refresh)} />
        </div>
      </section>

      <section className="reports-container">
        <h2 className="reports-header"> Ready Credit Reports</h2>
        <ReportView refresh={refresh} />
      </section>
    </div>
  );
}

export default App;


