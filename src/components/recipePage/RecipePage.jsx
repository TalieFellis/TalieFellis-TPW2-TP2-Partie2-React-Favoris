// Page de recette individuelle
// Lorsqu'un utilisateur clique sur une recette, il est dirigé vers cette page pour afficher les détails de la recette.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeCard from '../recipeCard/RecipeCard';
import { useQuery } from 'react-query';
import { getRecipeDetailsById } from '../../services/recipeService';
import './RecipePage.css'; 

function RecipePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Utiliser useQuery pour obtenir les détails de la recette
  const { data: recipeDetails, isLoading, isError, error } = useQuery(
    ['recipe', recipeId],
    () => getRecipeDetailsById(recipeId) // Fonction getRecipeDetailsById
  );

  useEffect(() => {
    // Mettre à jour l'état de la recette lorsque les données de la requête sont disponibles
    if (recipeDetails) {
      setRecipe(recipeDetails);
    }
  }, [recipeDetails]);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!recipe) {
    return <div>Recette introuvable</div>;
  }

  const ingredients = [];
  const measures = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (recipe[ingredientKey] && recipe[measureKey]) {
      ingredients.push(recipe[ingredientKey]);
      measures.push(recipe[measureKey]);
    }
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="recipe-page">
        <Link to="/" className="button-link">Retour à la page d'accueil</Link>
        <Link to={`/categories/${recipe.strCategory}`} className="button-link">Retour à la catégorie</Link>

        <h2>{recipe.strMeal}</h2>
        <p>Catégorie : {recipe.strCategory}</p>

        {recipe.strMealThumb && <img src={recipe.strMealThumb} alt={recipe.strMeal} />}

        <button onClick={toggleDrawer}>
            {isDrawerOpen ? 'Fermer les détails' : 'Voir les détails'}
        </button>
      
        {isDrawerOpen && (
            <div className="recipe-details-container">
                <div className="recipe-details">
                    <h4>Ingrédients :</h4>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient} - {measures[index]}</li>
                        ))}
                    </ul>
                </div>

                <div className="recipe-instructions">
                    <h4>Instructions :</h4>
                    <p>{recipe.strInstructions}</p>
                </div>
            </div>
        )}
    </div>
  );
}

export default RecipePage;