import React, { useState, useContext } from "react";
import { Item } from "./types";
import { WorkspaceContext } from "./workspace";
import { FiFolder, FiFileText, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";

import "../styles/directory.css";
import "../globals.css";

interface DirectoryViewProps {
  directory: Item;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  const {
    addNote,
    addDirectory,
    setCurrentItem,
    renameItem,
    deleteItem,
    setPath,
  } = useContext(WorkspaceContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const doesNameExistInCurrentDirectory = (
    name: string,
    type: "note" | "directory",
    currentItems: Item[]
  ): boolean => {
    return currentItems.some(
      (item) => item.name === name && item.type === type
    );
  };

  const handleAddNote = () => {
    const fileName = window.prompt("Enter the name of the new note:");
    if (fileName === null) return;
    if (
      doesNameExistInCurrentDirectory(fileName, "note", directory?.items || [])
    ) {
      alert("A note with this name already exists in the current directory.");
    } else {
      const noteText = window.prompt("Enter the text of the new note:");
      if (noteText === null) return;

      addNote(fileName, noteText);
    }
  };

  const handleAddDirectory = () => {
    const dirName = window.prompt("Enter the name of the new directory:");
    if (dirName === null) return;
    if (
      doesNameExistInCurrentDirectory(
        dirName,
        "directory",
        directory?.items || []
      )
    ) {
      // Handle duplicate name for directories
      alert(
        "A directory with this name already exists in the current directory."
      );
    } else {
      // Proceed with adding the directory
      addDirectory(dirName);
    }
  };

  const handleItemClick = (item: Item) => {
    if (item.type === "directory") {
      setPath((prevPath: string[]) => [...prevPath, item.name]);
    }
    setCurrentItem(item);
  };

  const handleRenameItem = (
    currentName: string,
    type: "note" | "directory"
  ) => {
    const newName = window.prompt("Enter the new name:");

    // If the user cancels the prompt or provides an empty name, return
    if (!newName || newName.trim() === "") return;

    // Check if the new name is unique in the current directory
    if (
      doesNameExistInCurrentDirectory(newName, type, directory?.items || [])
    ) {
      // Handle duplicate name based on the type
      alert(
        `Another ${type} with this name already exists in the current directory.`
      );
    } else {
      // Proceed with renaming
      renameItem(currentName, newName);
    }
  };

  const handleDeleteItems = (fileName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the file or directory "${fileName}"?`
      )
    ) {
      // Delete the file or directory
      deleteItem(fileName);
    }
  };

  const toggleSelection = (itemName: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemName)) {
        return prevSelected.filter((name) => name !== itemName);
      } else {
        return [...prevSelected, itemName];
      }
    });
  };

  const deleteSelectedItems = () => {
    if (window.confirm(`Are you sure you want to delete the selected items?`)) {
      selectedItems.forEach((itemName) => {
        deleteItem(itemName);
      });
      setSelectedItems([]); // Clear the selection after deletion
    }
  };

  // Separate and sort items

  return (
    <div>
      <br />
      <div className="flex items-center">
        {selectedItems.length > 0 && (
          <button onClick={deleteSelectedItems}>Delete Selected</button>
        )}
      </div>
    </div>
  );
};

export default DirectoryView;
