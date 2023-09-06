// Affichage des catégories de recettes

import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link depuis react-router-dom
import './CategoryCard.css'; 

function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <h3>{category.strCategory}</h3>
      {/* Lien vers la page de catégorie spécifique */}
      <Link to={`/categories/${category.strCategory}`} className="button-link">
        Voir les recettes de cette catégorie
      </Link>
    </div>
  );
}

export default CategoryCard;