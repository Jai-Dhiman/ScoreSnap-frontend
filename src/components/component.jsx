import { useState } from "react";
import axios from "axios";

const App = () => {
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
    <div>
      <h1>Music Score OCR</h1>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <button onClick={handleSubmit}>Process Image</button>
      {processedScore && (
        <div>
          <h2>Processed Score</h2>
          {/* Display processed score here */}
        </div>
      )}
    </div>
  );
};

export default App;
