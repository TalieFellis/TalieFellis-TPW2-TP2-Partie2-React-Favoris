//Affiche toutes les recettes en favoris

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../../favoritesSlice';
import { getRecipeDetailsById } from '../../services/recipeDetailsService'; // Importationdu service depuis le dossier services
import './FavoritesPage.css';

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [favoriteRecipesDetails, setFavoriteRecipesDetails] = useState([]);

  useEffect(() => {
    // Fonction pour obtenir les détails de la recette par son ID
    const fetchFavoriteRecipesDetails = async () => {
      try {
        const details = await Promise.all(favorites.map((recipeId) => getRecipeDetailsById(recipeId))); // Utilisez le service pour obtenir les détails
        setFavoriteRecipesDetails(details);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
      }
    };

    fetchFavoriteRecipesDetails();
  }, [favorites]);

  const removeRecipeFromFavorites = (recipeIdToRemove) => {
    // Méthode `filter` : créer un nouveau tableau de favoris
    const updatedFavorites = favorites.filter((recipeId) => recipeId !== recipeIdToRemove);
    // Mettre à jour les favoris dans le store Redux en dispatchant l'action
    dispatch(removeFromFavorites(recipeIdToRemove));
  };

  return (
    <div className="recipe-page">
      <Link to="/" className="button-link">
        Retour à la page d'accueil
      </Link>
      
      <h2>Mes recettes favorites</h2>
      <ul>
        {favoriteRecipesDetails.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link to={`/recipes/${recipe.idMeal}`}>Voir la recette : {recipe.strMeal}</Link>
            <button onClick={() => removeRecipeFromFavorites(recipe.idMeal)}>
              Enlever des favoris
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;