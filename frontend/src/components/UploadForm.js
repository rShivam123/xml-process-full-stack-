
import React, { useState } from "react";
import { uploadXML } from "../services/api";
import "../styles/uploadForm.css";


const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an XML file first!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    await uploadXML(formData);
    setLoading(false);
    onUploadSuccess();
    setFile(null);
  };

  return (
    <div className="upload-section">
      <h2 className="upload-title">CreditSea XML Report Processor</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-row">
          <input
            type="file"
            accept=".xml"
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />
          <button type="submit" className="upload-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload XML"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
