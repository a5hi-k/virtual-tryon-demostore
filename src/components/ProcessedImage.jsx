import React from 'react';

const ProcessedImage = ({ imageUrl }) => {
  return (
    <div className="processed-image">
      <h2>Processed Image</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="Processed" />
      ) : (
        <p>No image to display</p>
      )}
    </div>
  );
};

export default ProcessedImage;


