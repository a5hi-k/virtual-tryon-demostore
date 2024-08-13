import React, { useState } from 'react';
import TryOnModal from './TryOnModal';

const costumes = [
  { id: 1, name: 'shirt1', imageUrl: '/images/shirt1.jpeg' },
  { id: 2, name: 'suit1', imageUrl: '/images/suit1.jpeg' },
  { id: 3, name: 'tshirt1', imageUrl: '/images/tshirt1.jpeg' },
  { id: 4, name: 'tshirt2', imageUrl: '/images/tshirt2.jpeg' },
  { id: 5, name: 'tshirt3', imageUrl: '/images/tshirt3.jpg' },
  { id: 6, name: 'womentop1', imageUrl: '/images/womentop1.jpeg' },
  { id: 7, name: 'womentop2', imageUrl: '/images/womentop2.jpeg' },
  { id: 8, name: 'womentop3', imageUrl: '/images/womentop3.jpg' },
  { id: 9, name: 'womentop4', imageUrl: '/images/womentop4.jpeg' },
];

const CostumeGallery = ({ onApiResponse }) => {
  const [selectedCostume, setSelectedCostume] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleTryOnClick = (costume) => {
    setSelectedCostume(costume);
    setShowModal(true);
  };

  return (
    <div className="costume-gallery">
      {costumes.map((costume) => (
        <div key={costume.id} className="costume-card">
          <img src={costume.imageUrl} alt={costume.name} />
          <button onClick={() => handleTryOnClick(costume)}>Try On Virtually</button>
        </div>
      ))}
      {showModal && (
        <TryOnModal
          costume={selectedCostume}
          onClose={() => setShowModal(false)}
          onApiResponse={onApiResponse} 
        />
      )}
    </div>
  );
};

export default CostumeGallery;
