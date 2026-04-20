import React from "react";
import "../Styles/SearchBar.css"; // Asegúrate de que el nombre coincida

function SearchBar({ searchQuery, setSearchQuery }) {
  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery(""); // Función útil para limpiar la búsqueda rápidamente
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar notas..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="clear-search-btn" 
            onClick={handleClear}
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;