import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../../favoritesSlice';

function RecipeCard({ recipe }) {
  const {
    strMeal,
    strMealThumb,
    idMeal,
  } = recipe;

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isRecipeInFavorites = favorites.includes(idMeal);

  const toggleFavoritesHandler = () => {
    if (isRecipeInFavorites) {
      dispatch(removeFromFavorites(idMeal));
    } else {
      dispatch(addToFavorites(idMeal));
    }
  };

  return (
    <div className="recipe-card">
      <h3>{strMeal}</h3>
      {strMealThumb && <img src={strMealThumb} alt={strMeal} />}
      <Link to={`/recipes/${idMeal}`} className="button-link">
        Voir la recette complète
      </Link>
      <button onClick={toggleFavoritesHandler}>
        {isRecipeInFavorites ? 'Enlever des favoris' : 'Ajouter aux favoris'}
      </button>
    </div>
  );
}

export default RecipeCard;
