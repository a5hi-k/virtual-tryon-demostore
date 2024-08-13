import React, { useState } from 'react';
import CostumeGallery from './components/CostumeGallery';
import ProcessedImage from './components/ProcessedImage';
import './App.css';

const App = () => {
  const [processedImage, setProcessedImage] = useState(null);

  const handleApiResponse = (response) => {
    const imageUrl = response[0]?.url || null;
    setProcessedImage(imageUrl);
  };

  return (
    <div className="App">
      <h1>Zaima</h1>
      {processedImage && <ProcessedImage imageUrl={processedImage} />}
      <CostumeGallery onApiResponse={handleApiResponse} />
      
    </div>
  );
};

export default App;
