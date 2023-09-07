import React from 'react';
import CategoryCard from './categoryCard/CategoryCard';
import { useCategories } from '../services/categoryService';

function Home() {
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!Array.isArray(categories?.categories)) {
    return <div>Données de catégories non valides</div>;
  }

  return (
    <div className="home">
      <h1>TP2 - Livre de recettes en React</h1>
      <h2>Liste des catégories de recettes</h2>
      <div className="category-list">
        {categories.categories.map((category) => (
          <CategoryCard key={category.idCategory} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;