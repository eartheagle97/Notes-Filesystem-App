import React, { useState, useContext, useCallback } from "react";
import { Item } from "./types";
import NoteView from "./noteView";
import DirectoryView from "./directoryView";
import { format } from "date-fns";

import AddressBar from "../components/addressBar";

import _ from "lodash";

import "../styles/workspace.css";
import Playground from "./playground";

function ItemView(item: Item) {
  const { setCurrentItem, path, setPath } = useContext(WorkspaceContext);

  const goToEnclosingFolder = useCallback(() => {
    if (item.parent == null) {
      alert("Cannot go to enclosing folder.");
      return;
    }

    setCurrentItem(item.parent);
    setPath((prevPath) => {
      const newPath = [...prevPath];
      newPath.pop();
      return newPath;
    });
  }, [item, setCurrentItem]);

  return (
    <div className="bg-white p-4 border border-gray-300 w-full h-full">
      <h2>Current Item: {item.name}</h2>
      <h3>Type: {item.type}</h3>
      <div className="item">
        {/* {item.type == "directory" && <DirectoryView directory={item} />} */}
        {item.type == "directory" && <Playground directory={item} item={item} path={path} goToEnclosingFolder={goToEnclosingFolder} />}
        {item.type == "note" && <NoteView note={item} />}
      </div>
    </div>
  );
}

interface WorkspaceContextProps {
  currentItem: Item | null;
  setCurrentItem: (item: Item) => void;
  addNote: (fileName: string, noteText: string) => void;
  renameItem: (currentName: string, newName: string) => void;
  deleteItem: (fileName: string) => void;
  addDirectory: (newDirName: string) => void;
  updateNote: (newText: string) => void;
  path: string[];
  setPath: React.Dispatch<React.SetStateAction<string[]>>;
}

export const WorkspaceContext = React.createContext<WorkspaceContextProps>({
  currentItem: null,
  setCurrentItem: (item: Item) => {},
  addNote: (fileName: string, noteText: string) => {},
  renameItem: (currentName: string, newName: string) => {},
  deleteItem: (fileName: string) => {},
  addDirectory: (newDirName: string) => {},
  updateNote: (newText: string) => {},
  path: ["root"], // default value for path
  setPath: (value: string[] | ((prevValue: string[]) => string[])) => {},
});

export function Workspace() {
  const [currentItem, setCurrentItem] = useState<Item>({
    name: "root",
    type: "directory",
    items: [],
  });
  const [path, setPath] = useState<string[]>(["root"]); // Start with the root directory

  const addNote = useCallback((fileName: string, noteText: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      const formattedDate = format(new Date(), "MM/dd/yyyy h:mm a");
      if (newItem.type === "directory") {
        const newNote: Item = {
          type: "note",
          name: fileName,
          note: noteText,
          parent: newItem,
          dateModified: formattedDate,
        };
        newItem.items = newItem.items ? [...newItem.items, newNote] : [newNote];
      }
      return newItem;
    });
  }, []);

  const renameItem = useCallback((currentName: string, newName: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);

      if (newItem.type === "directory") {
        const itemToRename = newItem.items?.find(
          (item) => item.name === currentName
        );
        if (itemToRename) {
          itemToRename.name = newName;
        }
      }

      return newItem;
    });
  }, []);

  const deleteItem = useCallback((fileName: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === "directory") {
        const itemToDelete = newItem.items?.find(
          (item) => item.name === fileName
        );

        // If the item is a directory, recursively delete its contents
        if (itemToDelete?.type === "directory") {
          itemToDelete.items?.forEach((childItem) => {
            deleteItem(childItem.name);
          });
        }

        const itemIndex = newItem.items?.findIndex(
          (item) => item.name === fileName
        );
        if (itemIndex !== undefined && itemIndex !== -1) {
          newItem.items?.splice(itemIndex, 1);
        }
      }
      return newItem;
    });
  }, []);

  const addDirectory = useCallback((newDirName: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      const formattedDate = format(new Date(), "MM/dd/yyyy h:mm a");
      if (newItem.type === "directory") {
        const newDir: Item = {
          type: "directory",
          name: newDirName,
          items: [],
          parent: newItem,
          dateModified: formattedDate,
        };
        newItem.items = newItem.items ? [...newItem.items, newDir] : [newDir];
      }
      return newItem;
    });
  }, []);

  const updateNote = useCallback((newText: string) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (prevItem.type === "note") {
        newItem.note = newText;
      }
      return newItem;
    });
  }, []);

  return (
    <div className="workspace">
      <WorkspaceContext.Provider
        value={{
          currentItem,
          setCurrentItem,
          addNote,
          addDirectory,
          updateNote,
          deleteItem,
          renameItem,
          path,
          setPath,
        }}
      >
        <ItemView {...currentItem} />
      </WorkspaceContext.Provider>
    </div>
  );
}
