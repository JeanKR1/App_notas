import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Nueva nota",
      content: "",
      date: new Date().toLocaleString()
    };

    setNotes([newNote, ...notes]);
    setSelectedNote(newNote.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    const updated = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updated);
  };

  return (
    <div className="app">
      {/* Sidebar + Editor */}
    </div>
  );
}

export default App;