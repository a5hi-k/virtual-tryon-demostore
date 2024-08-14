
import React from 'react';
import ErrorPopup from './ErrorPopup';

const ProcessedImage = ({ processedImageUrl, modelImageUrl, errorMessage, onErrorClose }) => {
  return (
    <div className="processed-image">
      <h2>Orginal Image</h2>
      {modelImageUrl && (
        <div>
          <h3>Model Image</h3>
          <img src={modelImageUrl} alt="Model" />
        </div>
      )}
      {processedImageUrl ? (
        <div>
          <h3>Processed Image</h3>
          <img src={processedImageUrl} alt="Processed" />
        </div>
      ) : (
        <p>No image to display</p>
      )}
      {errorMessage && <ErrorPopup message={errorMessage} onClose={onErrorClose} />}
    </div>
  );
};

export default ProcessedImage;

