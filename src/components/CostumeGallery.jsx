
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TryOnModal from './TryOnModal';

const costumes = [
  { id: 1, name: 'tshirt1', imageUrl: '/images/tshirt1.jpg', category: 'upper' },
  { id: 2, name: 'tshirt2', imageUrl: '/images/tshirt2.jpeg', category: 'upper' },
  { id: 3, name: 'tshirt3', imageUrl: '/images/tshirt3.jpg', category: 'upper' },
  { id: 4, name: 'shirt1', imageUrl: '/images/shirt1.jpeg', category: 'upper' },
  { id: 5, name: 'shirt2', imageUrl: '/images/shirt2.jpeg', category: 'upper' },
  { id: 6, name: 'shirt3', imageUrl: '/images/shirt3.jpeg', category: 'upper' },
  { id: 7, name: 'shirt4', imageUrl: '/images/shirt4.jpeg', category: 'upper' },
  { id: 8, name: 'shirt5', imageUrl: '/images/shirt5.jpeg', category: 'upper' },
  { id: 9, name: 'shirt6', imageUrl: '/images/shirt6.jpg', category: 'upper' },
  { id: 10, name: 'top1', imageUrl: '/images/top1.jpeg', category: 'upper' },
  { id: 11, name: 'top2', imageUrl: '/images/top2.jpeg', category: 'upper' },
  { id: 12, name: 'pant1', imageUrl: '/images/pant1.jpg', category: 'lower' },
  { id: 13, name: 'pant2', imageUrl: '/images/pant2.jpeg', category: 'lower' },
  { id: 14, name: 'pant3', imageUrl: '/images/pant3.jpeg', category: 'lower' },
  { id: 15, name: 'pant4', imageUrl: '/images/pant4.jpg', category: 'lower' },
  { id: 16, name: 'pant5', imageUrl: '/images/pant5.jpg', category: 'lower' },
  { id: 17, name: 'pant6', imageUrl: '/images/pant6.jpg', category: 'lower' },
  { id: 18, name: 'skirt1', imageUrl: '/images/skirt1.jpg', category: 'lower' },
  { id: 19, name: 'skirt2', imageUrl: '/images/skirt2.jpg', category: 'lower' },
  { id: 20, name: 'skirt3', imageUrl: '/images/skirt3.jpeg', category: 'lower' },
  { id: 21, name: 'saree1', imageUrl: '/images/saree1.jpg', category: 'saree' },
  { id: 22, name: 'saree2', imageUrl: '/images/saree2.jpeg', category: 'saree' },
  { id: 23, name: 'saree3', imageUrl: '/images/saree3.jpeg', category: 'saree' },
  { id: 24, name: 'saree4', imageUrl: '/images/saree4.jpeg', category: 'saree' },
  { id: 25, name: 'saree5', imageUrl: '/images/saree5.jpeg', category: 'saree' },
  { id: 26, name: 'saree6', imageUrl: '/images/saree6.jpeg', category: 'saree' },
  { id: 27, name: 'kurtha1', imageUrl: '/images/kurtha1.jpg', category: 'kurtha' },
  { id: 28, name: 'kurtha2', imageUrl: '/images/kurtha2.jpeg', category: 'kurtha' },
  { id: 29, name: 'kurtha3', imageUrl: '/images/kurtha3.jpeg', category: 'kurtha' },
  { id: 30, name: 'kurtha4', imageUrl: '/images/kurtha4.jpg', category: 'kurtha' },
  { id: 31, name: 'kurtha5', imageUrl: '/images/kurtha5.jpeg', category: 'kurtha' },
  { id: 32, name: 'kurtha6', imageUrl: '/images/kurtha6.jpeg', category: 'kurtha' },
  { id: 33, name: 'kurtha7', imageUrl: '/images/kurtha7.jpg', category: 'kurtha' },

];
const CostumeGallery = ({ onApiResponse, onError }) => {
  const { category } = useParams();
  const [selectedCostume, setSelectedCostume] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredCostumes = costumes.filter((costume) => costume.category === category);

  const handleTryOnClick = (costume) => {
    setSelectedCostume(costume);
    setShowModal(true);
  };

  return (
    <div className="costume-gallery">
      {filteredCostumes.map((costume) => (
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
          onError={onError}
        />
      )}
    </div>
  );
};

export default CostumeGallery;