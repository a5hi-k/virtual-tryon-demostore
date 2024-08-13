import React, { useState } from 'react';
import { client } from "@gradio/client";
import ErrorPopup from './ErrorPopup';

const modelImages = [
  { id: 1, name: 'menmodel1', imageUrl: '/images/menmodel1.jpg' },
  { id: 2, name: 'menmodel2', imageUrl: '/images/menmodel2.jpg' },
  { id: 3, name: 'menmodel3', imageUrl: '/images/menmodel3.jpg' },
  { id: 4, name: 'womenmodel1', imageUrl: '/images/womenmodel1.jpg' },
  { id: 5, name: 'womenmodel2', imageUrl: '/images/womenmodel2.jpeg' },
  { id: 6, name: 'womenmodel3', imageUrl: '/images/womenmodel3.jpeg' },
];

const TryOnModal = ({ costume, onClose, onApiResponse }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageUpload = (event) => {
    setUploadedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleGenerate = async () => {
    if ((selectedModel || uploadedImage) && !loading) {
      setLoading(true);
      try {
        const app = await client("zen-vton/demo_space1");
        
        const costumeResponse = await fetch(costume.imageUrl);
        const costumeImageBlob = await costumeResponse.blob();

        let modelImageBlob;
        if (selectedModel) {
          const modelResponse = await fetch(selectedModel.imageUrl);
          modelImageBlob = await modelResponse.blob();
        } else {
          const uploadedResponse = await fetch(uploadedImage);
          modelImageBlob = await uploadedResponse.blob();
        }

        const result = await app.predict("/tryon", [
          { background: modelImageBlob, layers: [], composite: null },
          costumeImageBlob,
          "A beautiful dress!",
          true,
          true,
          30,
          42,
        ]);

        onApiResponse(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error during API call:', error);
        setErrorMessage('Failed to generate the try-on image. Please try again.');
      } finally {
        setLoading(false);
        onClose();
      }
    }
  };

  return (
    <div className={`modal ${loading ? 'loading' : ''}`}>
      <div className="modal-content">
        <h2>Select a model</h2>
        <div className="model-selection">
          {modelImages.map((model) => (
            <div key={model.id} className="model-card">
              <img
                src={model.imageUrl}
                alt={model.name}
                onClick={() => setSelectedModel(model)}
                style={{ border: selectedModel === model ? '2px solid blue' : 'none' }}
              />
              <p>{model.name}</p>
            </div>
          ))}
        </div>
        <div className="upload-section">
          <h3>Or Upload Your Own Image</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
        </div>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Loading... Don't click! " : "Try On"}
        </button>
        <button onClick={onClose} disabled={loading}>Close</button>
        {errorMessage && <ErrorPopup message={errorMessage} onClose={handleCloseError} />}      </div>
    </div>
  );
};

export default TryOnModal;
