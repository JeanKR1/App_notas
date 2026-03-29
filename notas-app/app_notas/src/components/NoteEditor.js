import React, { useState } from "react";
import { aiService } from "../components/aiService"; // Asegúrate de que el servicio tenga 'generateTags'
import "../Styles/NoteEditor.css";

function NoteEditor({ activeNote, onUpdateNote }) {
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualización manual de campos
    onUpdateNote(activeNote.id, { [name]: value });
  };

  // Función principal para las acciones de Inteligencia Artificial
  const handleAiAction = async (actionType) => {
    if (!activeNote.content) return;
    
    setIsAiLoading(true);

    try {
      if (actionType === 'summarize') {
        const result = await aiService.summarizeNote(activeNote.content);
        if (result) onUpdateNote(activeNote.id, { content: result });
      } 
      
      else if (actionType === 'fix_grammar') {
        const result = await aiService.fixGrammar(activeNote.content);
        if (result) onUpdateNote(activeNote.id, { content: result });
      } 
      
      else if (actionType === 'generate_tags') {
        const tags = await aiService.generateTags(activeNote.content);
        // Las etiquetas se guardan como un array en la nota
        if (tags && tags.length > 0) {
          onUpdateNote(activeNote.id, { tags: tags });
        }
      }
    } catch (error) {
      console.error("Error en la acción de IA:", error);
      alert("Hubo un error al procesar con Gemini.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="editor">
      {/* BARRA DE HERRAMIENTAS DE IA */}
      <div className="ai-toolbar">
        <button 
          onClick={() => handleAiAction('summarize')}
          disabled={isAiLoading || !activeNote.content}
          className="ai-btn"
        >
          {isAiLoading ? "🪄 Pensando..." : "✨ Resumir"}
        </button>

        <button 
          onClick={() => handleAiAction('fix_grammar')}
          disabled={isAiLoading || !activeNote.content}
          className="ai-btn"
        >
          {isAiLoading ? "🪄 Corrigiendo..." : "✨ Corregir Ortografía"}
        </button>

        {/* PASO 3: Botón para generar etiquetas automáticamente */}
        <button 
          onClick={() => handleAiAction('generate_tags')}
          disabled={isAiLoading || !activeNote.content}
          className="ai-btn"
        >
          {isAiLoading ? "🪄 Analizando..." : "✨ Sugerir Etiquetas"}
        </button>
      </div>

      {/* TÍTULO */}
      <input
        type="text"
        name="title"
        value={activeNote.title}
        onChange={handleChange}
        placeholder="Título de la nota"
        className="editor-title"
      />

      {/* FECHA Y ETIQUETAS */}
      <div className="editor-info">
        <small className="editor-date">
          📅 {activeNote.date}
        </small>
        {activeNote.tags?.length > 0 && (
          <div className="editor-tags">
            {activeNote.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <textarea
        name="content"
        value={activeNote.content}
        onChange={handleChange}
        placeholder="Escribe tu nota aquí..."
        className="editor-content"
      />
    </div>
  );
}

export default NoteEditor;