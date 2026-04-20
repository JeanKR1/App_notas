import React, { useState } from "react";
import NoteList from "./NoteList";
import SearchBar from "./SearchBar";
import "../Styles/SideBar.css"; // Asegúrate de que coincida con el nombre de tu archivo

function Sidebar({ 
  notes, 
  onAddNote, 
  onDeleteNote, 
  selectedNoteId, 
  setSelectedNoteId 
}) {
  // Estado local para la búsqueda (filtramos aquí antes de pasar a NoteList)
  const [searchQuery, setSearchQuery] = useState("");

  // Lógica de filtrado: solo mostramos notas que coincidan con el título o contenido
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Mis Notas </h1>
        <button className="btn-new-note" onClick={onAddNote} title="Nueva nota">
          + Nueva Nota
        </button>
      </div>

      <div className="sidebar-search">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="sidebar-content">
        <NoteList
          notes={filteredNotes} // Pasamos las notas filtradas, no todas
          onSelectNote={setSelectedNoteId}
          onDeleteNote={onDeleteNote}
          selectedNoteId={selectedNoteId}
        />
      </div>

      <div className="sidebar-footer">
        <small>{notes.length} notas en total</small>
      </div>
    </aside>
  );
}

export default Sidebar;