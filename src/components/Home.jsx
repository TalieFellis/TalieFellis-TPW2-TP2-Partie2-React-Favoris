import React from 'react';
import CategoryCard from './CategoryCard';
import { useQuery } from 'react-query';
import './styles.css'; 

function Home() {
  // Créez une requête pour obtenir la liste des catégories
  const { data: categories, isLoading, isError, error } = useQuery('categories', () =>
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((response) =>
      response.json()
    )
  );

  // console.log('Données de catégories :', categories);

  // Gérez l'état de chargement et les erreurs
  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }

  // Vérifiez la structure exacte du tableau categories
  if (!Array.isArray(categories?.categories)) {
    // console.log('Structure des données de catégories non valide :', categories);
    return <div>Données de catégories non valides</div>;
  }

  return (
    <div className="home">
      <h1>TP2 - Livre de recttes en React</h1>
      <h2>Liste des catégories de recettes</h2>
      <div className="category-list">
        {categories.categories.map((category) => (
          <CategoryCard key={category.idCategory} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;