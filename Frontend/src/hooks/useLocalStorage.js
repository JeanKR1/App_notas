import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Utilizamos una función de inicialización para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Intentamos obtener el valor de LocalStorage por su llave
      const item = window.localStorage.getItem(key);
      
      // Si existe, lo convertimos de JSON a objeto JS; si no, retornamos el valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error al leer LocalStorage:", error);
      return initialValue;
    }
  });

  // Función para actualizar tanto el estado de React como el LocalStorage
  const setValue = (value) => {
    try {
      // Permitimos que 'value' sea una función (igual que en useState normal)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Guardamos en el estado de React
      setStoredValue(valueToStore);
      
      // Guardamos en LocalStorage convertido a String JSON
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error al guardar en LocalStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;