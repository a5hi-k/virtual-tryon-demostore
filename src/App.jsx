
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
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
    <Router>
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/category/:category"
            element={
              <CostumeGallery 
                onApiResponse={handleApiResponse} 
                onError={handleError} 
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

