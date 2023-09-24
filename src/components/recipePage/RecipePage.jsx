import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import './RecipePage.css';
import { getRecipeDetailsById } from '../../services/recipeDetailsService';
import { addToFavorites, removeFromFavorites } from '../../../favoritesSlice';

function RecipePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  // Vérifier si l'ID de la recette est dans les favoris
  const isFavorite = favorites.some((favId) => favId === recipeId); 

  const toggleFavorite = () => {
    if (isFavorite) {
      // Supprimer l'ID de la recette des favoris
      dispatch(removeFromFavorites(recipeId));
    } else {
      // Ajouter l'ID de la recette aux favoris
      dispatch(addToFavorites(recipeId));
    }
  };

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
      <Link to="/" className="button-link">
        Retour à la page d'accueil
      </Link>
      <Link to={`/categories/${recipe.strCategory}`} className="button-link">
        Retour à la catégorie
      </Link>

      <h2>{recipe.strMeal}</h2>
      <p>Catégorie : {recipe.strCategory}</p>

      {recipe.strMealThumb && (
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      )}

      <button onClick={toggleDrawer}>
        {isDrawerOpen ? 'Fermer les détails' : 'Voir les détails'}
      </button>

      {isDrawerOpen && (
        <div className="recipe-details-container">
          <div className="recipe-details">
            <h4>Ingrédients :</h4>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient} - {measures[index]}
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-instructions">
            <h4>Instructions :</h4>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      )}
            {/* Bouton pour ajouter ou retirer des favoris */}
            <button onClick={toggleFavorite}>
        {isFavorite ? 'Enlever des favoris' : 'Ajouter aux favoris'}
      </button>
    </div>
  );
}

export default RecipePage;
