
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Tops', path: '/category/upper', imageUrl: '/images/upper_g.jpeg' },
  { name: 'Lower', path: '/category/lower', imageUrl: '/images/lower_g.jpg' },
  { name: 'Saree', path: '/category/saree', imageUrl: '/images/saree_g.jpeg' },
  { name: 'Kurtha', path: '/category/kurtha', imageUrl: '/images/kurtha_g.jpeg' },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="categories">
        {categories.map((category) => (
          <div key={category.name} className="category-card">
            <Link to={category.path}>
              <h2>{category.name}</h2>
              <img src={category.imageUrl} alt={category.name} className="category-image" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
