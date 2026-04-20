const API_URL = "http://localhost:5000/api/ai/process";

// Función genérica para hablar con tu servidor
const callBackend = async (prompt) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error al conectar con el Backend:", error);
    return null;
  }
};

export const generateSummary = async (content) => {
  const prompt = `Resume esta nota de forma profesional, con idea principal y puntos clave: "${content}"`;
  return await callBackend(prompt);
};

export const fixGrammar = async (content) => {
  const prompt = `Actúa como editor y corrige la ortografía y fluidez de este texto, devuelve solo el resultado: "${content}"`;
  return await callBackend(prompt);
};

export const suggestTags = async (content) => {
  const prompt = `Analiza el texto y devuelve exactamente 3 etiquetas separadas por comas (sin espacios ni #): "${content}"`;
  const result = await callBackend(prompt);
  return result ? result.split(',').map(tag => tag.trim()) : [];
};