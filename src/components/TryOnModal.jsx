
import React, { useState, useEffect } from 'react';
import { client } from "@gradio/client";
import ErrorPopup from './ErrorPopup';

const modelImages = {
  upper: [
    { id: 1, name: 'menmodel1', imageUrl: '/images/menmodel1.jpg' },
    { id: 2, name: 'menmodel2', imageUrl: '/images/menmodel2.jpg' },
    { id: 3, name: 'menmodel3', imageUrl: '/images/menmodel3.jpg' },
    { id: 4, name: 'womenmodel1', imageUrl: '/images/womenmodel1.jpg' },
    { id: 5, name: 'womenmodel2', imageUrl: '/images/womenmodel2.jpeg' },
    { id: 6, name: 'womenmodel3', imageUrl: '/images/womenmodel3.jpeg' },
  ],
  lower: [
    { id: 1, name: 'menmodel1', imageUrl: '/images/menmodel1.jpg' },
    { id: 2, name: 'menmodel2', imageUrl: '/images/menmodel2.jpg' },
    { id: 3, name: 'menmodel3', imageUrl: '/images/menmodel3.jpg' },
    { id: 4, name: 'womenmodel5', imageUrl: '/images/womenmodel5.jpeg' },
    { id: 5, name: 'womenmodel2', imageUrl: '/images/womenmodel2.jpeg' },
    { id: 6, name: 'womenmodel3', imageUrl: '/images/womenmodel3.jpeg' },
  ],
  saree: [
    { id: 1, name: 'womenmodel1', imageUrl: '/images/womenmodel11.jpg' },
    { id: 2, name: 'womenmodel2', imageUrl: '/images/womenmodel12.jpeg' },
    { id: 3, name: 'womenmodel3', imageUrl: '/images/womenmodel13.jpeg' },
    { id: 4, name: 'womenmodel4', imageUrl: '/images/womenmodel8.jpg' },
    { id: 5, name: 'womenmodel5', imageUrl: '/images/womenmodel14.jpeg' },
    { id: 6, name: 'womenmodel6', imageUrl: '/images/womenmodel10.jpeg' },
  ],
  kurtha: [
    { id: 1, name: 'menmodel1', imageUrl: '/images/menmodel1.jpg' },
    { id: 2, name: 'menmodel2', imageUrl: '/images/menmodel4.jpeg' },
    { id: 3, name: 'menmodel3', imageUrl: '/images/menmodel3.jpg' },
    { id: 4, name: 'womenmodel7', imageUrl: '/images/womenmodel7.jpg' },
    { id: 5, name: 'womenmodel8', imageUrl: '/images/womenmodel8.jpg' },
    { id: 6, name: 'womenmodel9', imageUrl: '/images/womenmodel9.jpeg' },
  ],
};

const TryOnModal = ({ costume, onClose, onApiResponse, onError }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentModelImages, setCurrentModelImages] = useState([]);
  const [dressType, setDressType] = useState('dresses');

  useEffect(() => {
    let dress_type = 'dresses'; 

    switch (costume.category) {
      case 'upper':
        setCurrentModelImages(modelImages.upper);
        dress_type = 'upper_body';
        break;
      case 'lower':
        setCurrentModelImages(modelImages.lower);
        dress_type = 'lower_body';
        break;
      case 'saree':
      case 'kurtha':
        setCurrentModelImages(modelImages[costume.category]);
        dress_type = 'dresses';
        break;
      default:
        setCurrentModelImages([]);
    }

    setDressType(dress_type);
  }, [costume]);

  const handleImageUpload = (event) => {
    setUploadedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleGenerate = async () => {
    if ((selectedModel || uploadedImage) && !loading) {
      setLoading(true);
      try {
        const app = await client("zen-vton/main1");
        
        const costumeResponse = await fetch(costume.imageUrl);
        const costumeImageBlob = await costumeResponse.blob();

        let modelImageBlob;
        let modelImageUrl;
        if (selectedModel) {
          const modelResponse = await fetch(selectedModel.imageUrl);
          modelImageBlob = await modelResponse.blob();
          modelImageUrl = selectedModel.imageUrl;
        } else {
          const uploadedResponse = await fetch(uploadedImage);
          modelImageBlob = await uploadedResponse.blob();
          modelImageUrl = uploadedImage;
        }

        const result = await app.predict("/tryon", [
          { background: modelImageBlob, layers: [], composite: null },
          costumeImageBlob,
          "A beautiful dress!",
          true,
          true,
          30,
          42,
          dressType
        ]);

        onApiResponse(result.data, modelImageUrl);
        console.log(result.data);
      } catch (error) {
        console.error('Error during API call:', error);
        setErrorMessage('Failed to generate the try-on image. Please try again.');
        onError('Failed to generate the try-on image. Please try again.');
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
          {currentModelImages.map((model) => (
            <div key={model.id} className="model-card">
              <img
                src={model.imageUrl}
                alt={model.name}
                onClick={() => setSelectedModel(model)}
                style={{ border: selectedModel === model ? '2px solid blue' : 'none' }}
              />
            </div>
          ))}
        </div>
        <div className="upload-section">
          <h3>Or Upload Your Own Image</h3>
          <p>For better results, upload a proper image as of reference models</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
        </div>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Loading... please wait " : "Try On"}
        </button>
        <button onClick={onClose} disabled={loading}>Close</button>
        {errorMessage && <ErrorPopup message={errorMessage} onClose={() => setErrorMessage(null)} />}
      </div>
    </div>
  );
};

export default TryOnModal;

