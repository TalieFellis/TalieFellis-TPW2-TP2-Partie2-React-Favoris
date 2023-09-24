import { createSelector } from 'reselect';

// Sélecteur pour accéder à l'ensemble des favoris
export const selectFavorites = (state) => state.favorites;

// Sélecteur pour obtenir le nombre total de favoris
export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);