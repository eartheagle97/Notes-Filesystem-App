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
  const directories =
    directory.items?.filter((item) => item.type === "directory") || [];
  const notes = directory.items?.filter((item) => item.type === "note") || [];
  const sortedDirectories = directories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedNotes = notes.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <br />
      <div className="flex items-center">
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 mx-1 rounded transition-colors duration-300 hover:bg-blue-500 active:bg-blue-700"
          onClick={handleAddNote}
        >
          <FiPlus className="mr-2" />
          New Note
        </button>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 mx-1 rounded transition-colors duration-300 hover:bg-blue-500 active:bg-blue-700"
          onClick={handleAddDirectory}
        >
          {" "}
          <FiPlus className="mr-2" /> New Directory
        </button>
      </div>

      {selectedItems.length > 0 && (
        <button onClick={deleteSelectedItems}>Delete Selected</button>
      )}
      <table className="dirSection table-auto min-w-full bg-white border border-gray-300 divide-y divide-gray-300">
        <thead>
          <tr>
            <th></th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Names</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {sortedDirectories.concat(sortedNotes).map((childItem, index) => (
            <tr className="dirItem" key={index}>
              <td className="w-8 px-6 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedItems.includes(childItem.name)}
                  onChange={() => toggleSelection(childItem.name)}
                />
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap"
                onClick={() => handleItemClick(childItem)}
              >
                <div className="flex items-center">
                  {childItem.type === "directory" ? (
                    <FiFolder className="text-xl mr-4" />
                  ) : (
                    <FiFileText className="text-xl mr-4" />
                  )}
                  {childItem.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="mx-1"
                  onClick={() =>
                    handleRenameItem(childItem.name, childItem.type)
                  }
                >
                  <FiEdit className="text-xl text-blue-600" />
                </button>
                <button
                  className="mx-1"
                  onClick={() => handleDeleteItems(childItem.name)}
                >
                  <FiTrash2 className="text-xl text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryView;
