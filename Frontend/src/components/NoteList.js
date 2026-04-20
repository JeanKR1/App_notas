import React from "react";
import "../Styles/NoteList.css"; // Asegúrate de que el nombre coincida con tu carpeta

function NoteList({ notes, onSelectNote, onDeleteNote, selectedNoteId }) {
  
  // Función para recortar el texto de la vista previa
  const truncateContent = (content) => {
    return content?.length > 35 ? content.substring(0, 35) + "..." : content;
  };

  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p className="no-notes">No hay notas todavía ✍️</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${note.id === selectedNoteId ? "active" : ""}`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="note-item-header">
              <strong className="note-item-title">
                {note.title || "Nota sin título"}
              </strong>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que al borrar se seleccione la nota
                  onDeleteNote(note.id);
                }}
              >
                🗑️
              </button>
            </div>
            
            <p className="note-item-preview">
              {truncateContent(note.content) || "Sin contenido..."}
            </p>
            
            <small className="note-item-date">{note.date}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default NoteList;