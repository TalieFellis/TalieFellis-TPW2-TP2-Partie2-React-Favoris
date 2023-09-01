// Page des catégories 
// Lorsqu'un utilisateur clique sur une catégorie, il est dirigé vers cette page où sont affichées les recettes de cette catégorie.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importer Link depuis react-router-dom
import RecipeCard from './RecipeCard';

function CategoryPage() {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch pour obtenir les recettes de la catégorie spécifiée
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => response.json())
      .then((data) => {
        // data contient la liste des recettes de la catégorie
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des recettes :', error);
      });
  }, [categoryName]);

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


