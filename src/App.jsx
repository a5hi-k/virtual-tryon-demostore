import React, { useState } from 'react';
import CostumeGallery from './components/CostumeGallery';
import ProcessedImage from './components/ProcessedImage';
import './App.css';

const App = () => {
  const [processedImage, setProcessedImage] = useState(null);

  const handleApiResponse = (response) => {
    // Assuming the response is an array and you want to display the first processed image
    const imageUrl = response[0]?.url || null;
    setProcessedImage(imageUrl);
  };

  return (
    <div className="App">
      <h1>Zaima</h1>
      <CostumeGallery onApiResponse={handleApiResponse} />
      {processedImage && <ProcessedImage imageUrl={processedImage} />}
    </div>
  );
};

export default App;
