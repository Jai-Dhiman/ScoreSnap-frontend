import { useState } from "react";
import axios from "axios";

const Component = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mxlFile, setMxlFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMxlFile(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:3000/api/process_image", formData, {
        responseType: "blob",
      });

      const mxlBlob = new Blob([response.data], { type: "application/vnd.recordare.musicxml+xml" });
      const mxlUrl = URL.createObjectURL(mxlBlob);
      setMxlFile(mxlUrl);
    } catch (err) {
      console.error("Error processing image:", err);
      setError(`An error occurred while processing the image: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">ScoreSnap</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            Upload Score Image
          </label>
          <input type="file" className="form-control" id="imageUpload" onChange={handleFileChange} accept="image/*" />
        </div>
        {preview && (
          <div className="mb-3">
            <img src={preview} alt="Preview" className="img-fluid mb-2" style={{ maxHeight: "300px" }} />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={!file || loading}>
          {loading ? "Processing..." : "Process Score"}
        </button>
      </form>
      {loading && (
        <div className="mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Processing your score...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {mxlFile && (
        <div className="mt-3">
          <h3>Processed Score</h3>
          <p>Your score has been successfully processed!</p>
          <a href={mxlFile} download="processed_score.mxl" className="btn btn-success">
            Download MusicXML File
          </a>
        </div>
      )}
    </div>
  );
};

export default Component;
