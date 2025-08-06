import React from "react";

interface StickyNoteProps {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  onChange: (id: number, newText: string) => void;
  onDrag: (id: number, x: number, y: number) => void;
  onDelete: (id: number) => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({
  id,
  text,
  x,
  y,
  color,
  onChange,
  onDrag,
  onDelete,
}) => {
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const newX = e.clientX;
    const newY = e.clientY;
    onDrag(id, newX, newY);
  };

  return (
    <div
      className="sticky-note"
      draggable
      onDragEnd={handleDragEnd}
      style={{ top: y, left: x, backgroundColor: color }}
    >
      <textarea
        value={text}
        onChange={(e) => onChange(id, e.target.value)}
        className="note-text"
      />
      <button className="delete-btn" onClick={() => onDelete(id)}>
        ✕
      </button>
    </div>
  );
};

export default StickyNote;
