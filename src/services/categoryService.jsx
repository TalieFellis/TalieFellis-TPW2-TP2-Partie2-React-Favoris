import { useQuery } from 'react-query';

export function useCategories() {
    return useQuery('categories', () =>
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((response) =>
        response.json()
        )
    );
}