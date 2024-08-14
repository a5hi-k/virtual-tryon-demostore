
import React, { useState } from 'react';
import CostumeGallery from './components/CostumeGallery';
import ProcessedImage from './components/ProcessedImage';
import './App.css';

const App = () => {
  const [processedImage, setProcessedImage] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleApiResponse = (response, modelImage) => {
    const imageUrl = response[0]?.url || null;
    setProcessedImage(imageUrl);
    setModelImage(modelImage);
  };

  const handleError = (message) => {
    setErrorMessage(message);
  };

  return (
    <div className="App">
      <h1>Zaima</h1>
      {processedImage && (
        <ProcessedImage 
          processedImageUrl={processedImage} 
          modelImageUrl={modelImage}
          errorMessage={errorMessage} 
          onErrorClose={() => setErrorMessage(null)}
        />
      )}
      <CostumeGallery onApiResponse={handleApiResponse} onError={handleError} />
    </div>
  );
};

export default App;
