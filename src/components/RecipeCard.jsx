// Affichage des recettes

import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link depuis react-router-dom

function RecipeCard({ recipe }) {
  const {
    strMeal,            // Titre de la recette
    strCategory,        // Catégorie de la recette
    strMealThumb,       // Image de la recette (s'il y en a une)
    strInstructions,    // Instructions de la recette
    idMeal,             // ID de la recette
  } = recipe;

  // Filtrer les ingrédients vides ou nuls et créer une liste
  const ingredients = [];
  const measures = [];
  for (let i = 1; i <= 20; i++) { // Le nombre maximum d'ingrédients possible est de 20
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (recipe[ingredientKey] && recipe[measureKey]) {
      ingredients.push(recipe[ingredientKey]);
      measures.push(recipe[measureKey]);
    }
  }

  return (
    <div className="recipe-card">
      <h3>{strMeal}</h3>
      {/* <p>Catégorie : {strCategory}</p> */}
      {strMealThumb && <img src={strMealThumb} alt={strMeal} />}
      {/* Ajoute un lien pour voir la recette complète */}
      <Link to={`/recipes/${idMeal}`}>Voir la recette complète</Link>
    </div>
  );
}

export default RecipeCard;
