import React, { useState } from "react";
// Importación correcta de las funciones sueltas
import { generateSummary, fixGrammar, suggestTags } from '../services/aiService'; 
import '../Styles/NoteEditor.css';

function NoteEditor({ activeNote, onUpdateNote }) {
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNote(activeNote.id, { [name]: value });
  };

  // Función principal para las acciones de Inteligencia Artificial
  const handleAiAction = async (actionType) => {
    if (!activeNote.content) return;
    
    setIsAiLoading(true);

    try {
      if (actionType === 'summarize') {
        // CORRECCIÓN: Llamamos a generateSummary directamente
        const result = await generateSummary(activeNote.content);
        if (result) onUpdateNote(activeNote.id, { content: result });
      } 
      
      else if (actionType === 'fix_grammar') {
        // CORRECCIÓN: Llamamos a fixGrammar directamente
        const result = await fixGrammar(activeNote.content);
        if (result) onUpdateNote(activeNote.id, { content: result });
      } 
      
      else if (actionType === 'generate_tags') {
        // CORRECCIÓN: Llamamos a suggestTags directamente
        const tags = await suggestTags(activeNote.content);
        if (tags && tags.length > 0) {
          onUpdateNote(activeNote.id, { tags: tags });
        }
      }
    } catch (error) {
      console.error("Error detallado en el frontend:", error);
      alert("Hubo un error al procesar con la IA. Revisa la consola.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="editor">
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

        <button 
          onClick={() => handleAiAction('generate_tags')}
          disabled={isAiLoading || !activeNote.content}
          className="ai-btn"
        >
          {isAiLoading ? "🪄 Analizando..." : "✨ Sugerir Etiquetas"}
        </button>
      </div>

      <input
        type="text"
        name="title"
        value={activeNote.title}
        onChange={handleChange}
        placeholder="Título de la nota"
        className="editor-title"
      />

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