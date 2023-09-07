export function getRecipesByCategory(categoryName) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then((response) => response.json())
        .then((data) => data.meals);
    }