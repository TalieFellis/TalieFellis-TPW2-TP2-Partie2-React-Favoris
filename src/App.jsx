import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importe Routes depuis react-router-dom
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import RecipePage from './components/RecipePage';

function App() {
  return (
    <Routes> {/* Utilise Routes au lieu de Switch */}
      <Route path="/" element={<Home />} /> {/* Utilise element au lieu de component */}
      <Route path="/categories/:categoryName" element={<CategoryPage />} /> {/* Utilise element au lieu de component */}
      <Route path="/recipes/:recipeId" element={<RecipePage />} /> {/* Utilise element au lieu de component */}
    </Routes>
  );
}

export default App;

