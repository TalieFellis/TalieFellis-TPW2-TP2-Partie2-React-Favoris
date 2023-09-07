import { useQuery } from 'react-query';

export function useRecipeDetails(recipeId) {
    return useQuery(['recipe', recipeId], () =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`).then((response) =>
        response.json()
        )
    );
}

export function getRecipeDetailsById(recipeId) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((response) => response.json())
        .then((data) => data.meals[0]);
    }