// Page des catégories 
// Lorsqu'un utilisateur clique sur une catégorie, il est dirigé vers cette page où sont affichées les recettes de cette catégorie.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { useQuery } from 'react-query';

function CategoryPage() {
  const { categoryName } = useParams();

  // Requête pour obtenir les recettes de la catégorie spécifiée
  const { data: recipes, isLoading, isError, error } = useQuery(
    ['recipes', categoryName], // Utilisez une clé unique pour identifier cette requête
    () =>
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then((response) => response.json())
        .then((data) => data.meals) // Accédez aux données de recettes ici
  );

  // Gérez l'état de chargement et les erreurs
  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }

  // Vérifiez s'il y a des recettes à afficher
  if (!Array.isArray(recipes)) {
    return <div>Aucune recette trouvée pour cette catégorie.</div>;
  }

  return (
    <div className="category-page">
      <h2>Recettes de la catégorie : {categoryName}</h2>
      {/* Ajout d'un lien pour retourner à la page d'accueil */}
      <Link to="/">Retour à la page d'accueil</Link>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;