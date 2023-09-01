// Home.jsx

import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Utilise l'API pour récupérer la liste des catégories et met à jour l'état
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((categoryList) => {
        // categoryList contient la liste des catégories
        setCategories(categoryList.categories);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  return (
    <div className="home">

      <h2>Liste des catégories de recettes</h2>
      <div className="category-list">
        {categories.map((category) => (
          <CategoryCard key={category.idCategory} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;
