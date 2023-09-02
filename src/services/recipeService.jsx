import { useQuery } from 'react-query';

export function useCategories() {
  return useQuery('categories', () =>
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((response) =>
      response.json()
    )
  );
}

export function useRecipeDetails(recipeId) {
  return useQuery(['recipe', recipeId], () =>
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`).then((response) =>
      response.json()
    )
  );
}

export function getRecipesByCategory(categoryName) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((response) => response.json())
    .then((data) => data.meals);
}

export function getRecipeDetailsById(recipeId) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((response) => response.json())
    .then((data) => data.meals[0]);
}