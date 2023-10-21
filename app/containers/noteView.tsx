import React, { useState, useContext } from "react";
import { Item } from "./types";
import { WorkspaceContext } from "./workspace";

import "../styles/note.css";

interface NoteViewProps {
  note: Item;
  item?: Item;
  closeModal: any;
  setCurrentItem: (item: Item) => void;
}

const NoteView: React.FC<NoteViewProps> = ({
  note,
  closeModal,
  item,
  setCurrentItem,
}) => {
  const { updateNote } = useContext(WorkspaceContext);
  const [text, setText] = useState(note.note);

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleNoteSubmit = () => {
    if (text == null) {
      alert("Cannot save empty note.");
      return;
    }
    updateNote(text);
    closeModal();
  };
  const windowButtons = ["Minimize", "Restore", "Close"];
  return (
    <>
      <div className="window">
        <div className="header border">
          <div
            className="title-bar"
            style={{ paddingTop: 18, paddingBottom: 18 }}
          >
            <div className="title-bar-text text-[16px] ml-2">
              {note?.name}
            </div>
            <div className="title-bar-controls">
              {windowButtons?.map((button, idx) => (
                <button
                  onClick={() => {
                    if (button === "Close") {
                      if (item?.parent) {
                        setCurrentItem(item?.parent); // Change to the parent directory after saving
                      }
                      closeModal();
                    }
                  }}
                  key={idx}
                  className="min-h-[24px]"
                  aria-label={button}
                  style={{ height: 26, width: 26 }}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <div className="window-body">
          <textarea
            value={text}
            onChange={handleNoteChange}
            placeholder="Edit your note..."
            className="h-[300px] w-[100%] text-lg"
          />
          <br></br>
          <button className="mt-2" onClick={handleNoteSubmit}>
            Save
          </button>
        </div>
        <div className="status-bar">
          <p className="status-bar-field">Press F1 for help</p>
          <p className="status-bar-field">Slide 1</p>
          <p className="status-bar-field">CPU Usage: 14%</p>
        </div>
      </div>
    </>
  );
};

export default NoteView;
