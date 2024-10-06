import { useState } from "react";
import axios from "axios";

const Component = () => {
  const [image, setImage] = useState(null);
  const [processedScore, setProcessedScore] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post("http://localhost:3000/api/process_image", formData);
      setProcessedScore(response.data);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Add Score</h2>
        <div className="mb-3">
          <input type="file" className="form-control" onChange={handleImageUpload} accept="image/*" />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={!image}>
          Process Image
        </button>
        {processedScore && (
          <div className="mt-4">
            <h3>Processed Score</h3>
            {/* Display processed score here */}
            <pre className="bg-light p-3 mt-2">{JSON.stringify(processedScore, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Component;
