// Page des catégories 
// Lorsqu'un utilisateur clique sur une catégorie, il est dirigé vers cette page où sont affichées les recettes de cette catégorie.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import RecipeCard from '../recipeCard/RecipeCard';
import { getRecipesByCategory } from '../../services/recipeListService'; 
import './CategoryPage.css';

import { useDispatch, useSelector } from 'react-redux';

function CategoryPage() {
  const { categoryName } = useParams();

  // Utilisez la fonction useQuery pour obtenir les recettes de la catégorie
  const { data: recipes, isLoading, isError, error } = useQuery(
    ['recipes', categoryName], // Utilisez une clé unique pour identifier cette requête
    () => getRecipesByCategory(categoryName)
  );

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!Array.isArray(recipes)) {
    return <div>Aucune recette trouvée pour cette catégorie.</div>;
  }

  return (
    <div className="category-page">
      <h2>Recettes de la catégorie : {categoryName}</h2>
      {/* Ajout d'un lien pour retourner à la page d'accueil */}
      <Link to="/" className="button-link">Retour à la page d'accueil</Link>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
