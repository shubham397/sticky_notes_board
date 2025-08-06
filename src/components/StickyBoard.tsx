import React, { useEffect, useState } from "react";
import StickyNote from "./StickyNote";
import "./stickyNotes.css";

interface Note {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

const getRandomColor = () => {
  const colors = ["#FFF176", "#AED581", "#81D4FA", "#FFAB91", "#E1BEE7"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const StickyBoard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("stickyNotes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      text: "",
      x: 100,
      y: 100,
      color: getRandomColor(),
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const updateText = (id: number, newText: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const updatePosition = (id: number, x: number, y: number) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, x, y } : note))
    );
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="sticky-board">
      <button className="add-btn" onClick={addNote}>
        ➕ Add Note
      </button>
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          {...note}
          onChange={updateText}
          onDrag={updatePosition}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
};

export default StickyBoard;
