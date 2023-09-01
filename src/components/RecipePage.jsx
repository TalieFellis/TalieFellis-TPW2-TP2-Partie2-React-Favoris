// Page de recette individuelle
// Lorsqu'un utilisateur clique sur une recette, il est dirigé vers cette page pour afficher les détails de la recette.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importe Link depuis react-router-dom

function RecipePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // État du tiroir

  useEffect(() => {
    // Utilise fetch pour obtenir les détails complets de la recette
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((response) => response.json())
      .then((recipeDetails) => {
        // recipeDetails contient les détails complets de la recette
        if (recipeDetails.meals && recipeDetails.meals.length > 0) {
          setRecipe(recipeDetails.meals[0]);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de la recette :', error);
      });
  }, [recipeId]);

  if (!recipe) {
    return <div>Chargement en cours...</div>;
  }

  // Filtrer les ingrédients vides ou nuls et créer une liste
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

  // Fonction pour basculer l'état du tiroir
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

return (
    <div className="recipe-page">
      {/* Ajout d'un lien pour retourner à la page d'accueil */}
      <Link to="/">Retour à la page d'accueil</Link>
      {/* Ajout d'un lien pour retourner à la page de catégorie */}
      <Link to={`/categories/${recipe.strCategory}`}>Retour à la catégorie</Link>

      <h2>{recipe.strMeal}</h2>
      <p>Catégorie : {recipe.strCategory}</p>
      {recipe.strMealThumb && <img src={recipe.strMealThumb} alt={recipe.strMeal} />}

      {/* Bouton pour ouvrir/fermer le tiroir */}
      <button onClick={toggleDrawer}>
        {isDrawerOpen ? 'Fermer les détails' : 'Voir les détails'}
      </button>

      {/* Afficher les ingrédients et les instructions en fonction de l'état du tiroir */}
      {isDrawerOpen && (
        <>
          <h4>Ingrédients :</h4>
          <ul>
            {/* Afficher ici les ingrédients et les mesures */}
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient} - {measures[index]}</li>
            ))}
          </ul>
          <h4>Instructions :</h4>
          <p>{recipe.strInstructions}</p>
        </>
      )}
    </div>
  );
}

export default RecipePage;
