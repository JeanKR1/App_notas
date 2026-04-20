import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import "./App.css";

function App() {
  // 1. Estado de las notas (Persistente)
  const [notes, setNotes] = useLocalStorage("notes", []);
  
  // 2. Estado de la nota seleccionada (ID)
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // 3. Variable derivada: Encuentra la nota completa para pasarla al Editor
  const activeNote = notes.find((note) => note.id === selectedNoteId);

  // Función para crear una nueva nota
  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Nueva nota",
      content: "",
      date: new Date().toLocaleString(),
      tags: [] // Preparado para las etiquetas de la IA
    };

    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id); // Selecciona automáticamente la nueva nota
  };

  // Función para eliminar una nota
  const deleteNote = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta nota?");
    if (confirmDelete) {
      const filteredNotes = notes.filter(note => note.id !== id);
      setNotes(filteredNotes);
      
      // Si la nota que borramos era la seleccionada, limpiamos el editor
      if (selectedNoteId === id) {
        setSelectedNoteId(null);
      }
    }
  };

  // Función central para actualizar notas (Manual o por IA)
  const updateNote = (id, updatedFields) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === id) {
        return { 
          ...note, 
          ...updatedFields, 
          date: new Date().toLocaleString() // Actualiza la fecha de edición
        };
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  return (
    <div className="app-container">
      {/* Pasamos todas las funciones y estados necesarios al Sidebar */}
      <Sidebar 
        notes={notes} 
        onAddNote={addNote} 
        onDeleteNote={deleteNote}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
      />
      
      {/* Si hay una nota activa, mostramos el editor; si no, la pantalla de bienvenida */}
      {activeNote ? (
        <NoteEditor 
          activeNote={activeNote} 
          onUpdateNote={updateNote} 
        />
      ) : (
        <div className="no-active-note">
          <div className="welcome-message">
            <h1>Bienvenido a tu Notas IA 📝✨</h1>
            <p>Selecciona una nota de la izquierda o crea una nueva para empezar a escribir con el poder de Gemini.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;