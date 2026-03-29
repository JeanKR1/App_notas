import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const aiService = {
  // MEJORA: Resumen con Estructura
  summarizeNote: async (content) => {
    try {
      const prompt = `
        Actúa como un experto en productividad y síntesis de información.
        Tu tarea es resumir la siguiente nota de un usuario.
        
        REGLAS:
        1. Usa un tono profesional pero cercano.
        2. Divide el resumen en: "Idea Principal" (una frase) y "Puntos Clave" (lista corta).
        3. Si la nota es muy corta, simplemente mejora la redacción.
        4. No inventes información que no esté en el texto.

        NOTA DEL USUARIO:
        "${content}"
      `;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error en IA (Resumen):", error);
      return null;
    }
  },

  // MEJORA: Corrección con Explicación (opcional) o Limpieza
  fixGrammar: async (content) => {
    try {
      const prompt = `
        Actúa como un editor profesional de textos.
        Tu misión es corregir la ortografía, gramática y mejorar la fluidez de la siguiente nota.
        
        REGLAS:
        1. Mantén el significado y la intención original del autor.
        2. Organiza el texto en párrafos claros si es necesario.
        3. Elimina muletillas o repeticiones innecesarias.
        4. Devuelve únicamente el texto corregido, sin notas adicionales del sistema.

        TEXTO A CORREGIR:
        "${content}"
      `;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error en IA (Corrección):", error);
      return null;
    }
  },

  // NUEVA FUNCIÓN: Generar Etiquetas Automáticas
  generateTags: async (content) => {
    try {
      const prompt = `
        Analiza el contenido de esta nota y genera exactamente 3 etiquetas (tags) de una sola palabra que describan el tema.
        Devuelve las etiquetas separadas por comas, sin espacios innecesarios y sin el símbolo #.
        Ejemplo de salida: trabajo,proyectos,reunion

        CONTENIDO:
        "${content}"
      `;
      const result = await model.generateContent(prompt);
      return result.response.text().split(',').map(tag => tag.trim());
    } catch (error) {
      console.error("Error en IA (Tags):", error);
      return [];
    }
  }
};