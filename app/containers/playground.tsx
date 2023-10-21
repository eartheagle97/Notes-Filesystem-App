import React, { useState, useContext, useCallback, useEffect } from "react";
import { Item } from "./types";
import { WorkspaceContext } from "./workspace";
import DirectoryView from "../components/directoryView";
import AddressBar from "../components/addressBar";
import SideTaskItem from "../components/SideTaskItem";
import { format } from "date-fns";
import Modal from "react-modal";
import NoteView from "./noteView";
import Image from "next/image";

interface PlaygroundProps {
  directory: Item;
  item?: Item;
  path: string[];
  goToEnclosingFolder: any;
}

const Playground: React.FC<PlaygroundProps> = ({
  directory,
  path,
  goToEnclosingFolder,
  item,
}) => {
  const {
    addNote,
    addDirectory,
    setCurrentItem,
    renameItem,
    deleteItem,
    setPath,
  } = useContext(WorkspaceContext);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (directory?.type === "note") {
      setIsModalOpen(true);
    }
  }, [directory]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const formattedDate = format(currentDate, "MM/dd/yyyy h:mm a");

  const doesNameExistInCurrentDirectory = (
    name: string,
    type: "note" | "directory",
    currentItems: Item[]
  ): boolean => {
    return currentItems.some(
      (item) => item.name === name && item.type === type
    );
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
    console.log("first");
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

  const menuOptions = ["File", "Edit", "View", "Favorites", "Tools", "Help"];
  const windowButtons = ["Minimize", "Restore", "Close"];

  const leftDots = (numberOfDots: number) => {
    return Array(numberOfDots)
      .fill(null)
      .map((dot, idx) => (
        <div
          key={idx}
          style={{
            width: 3,
            height: 3,
            borderRadius: 50,
            margin: 3,
            backgroundColor: "#b1adab",
          }}
        ></div>
      ));
  };
  return (
    <>
      <div className="grid-flow-row auto-rows-max">
        <div className="header border">
          <div
            className="title-bar"
            style={{ paddingTop: 18, paddingBottom: 18 }}
          >
            <div className="title-bar-text text-[16px] ml-2">
              <label className="text-sm">Quilt Labs Notes Filesystem App &gt;&gt; ({item?.name} :{" "}
              {item?.type})</label>
            </div>
            <div className="title-bar-controls">
              {windowButtons?.map((button, idx) => (
                <button
                  key={idx}
                  className="min-h-[24px]"
                  aria-label={button}
                  style={{ height: 26, width: 26 }}
                ></button>
              ))}
            </div>
          </div>
        </div>
        <div className="navbar border">
          {/* File Menu */}
          <div className="bg-[#EEECDD]">
            <div className="flex">
              <div>{leftDots(4)}</div>
              {menuOptions?.map((item, idx) => (
                <label key={idx} className="text-xs mx-2">
                  {item}
                </label>
              ))}
            </div>
          </div>
          {/* Actions Buttons & Address Bar */}
          <div>
            <AddressBar
              leftDots={leftDots}
              selectedItems={selectedItems}
              deleteSelectedItems={deleteSelectedItems}
              handleAddDirectory={handleAddDirectory}
              handleAddNote={handleAddNote}
              item={directory}
              path={path}
              goToEnclosingFolder={goToEnclosingFolder}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 main-layout h-[75vh]">
          <div className="col-span-1 border ">
            <div
              className="p-5 h-[75vh]"
              style={{ backgroundColor: "#7da7f0" }}
            >
              <SideTaskItem
                handleAddDirectory={handleAddDirectory}
                handleAddNote={handleAddNote}
              />
            </div>
          </div>
          <div className="col-span-3 border">
            <DirectoryView
              selectedItems={selectedItems}
              directory={directory}
              toggleSelection={toggleSelection}
              handleDeleteItems={handleDeleteItems}
              handleItemClick={handleItemClick}
              handleRenameItem={handleRenameItem}
              deleteSelectedItems={deleteSelectedItems}
            />
          </div>
        </div>
        {/* Start Bar */}
        <div className="title-bar !h-[5.75vh]">
          <div className="flex items-center h-[100%] w-[100px] rounded !bg-green-600 text-white text-xl">
            <div className="flex items-center ml-2">
              <Image
                src={"/assets/img/start-menu.png"}
                alt={"Start Menu Icon"}
                width={25}
                height={25}
              />
              <label className="text-lg ml-2">Start</label>
            </div>
          </div>
          <div className="flex items-center justify-center h-[100%] w-[200px] bg-[#0F89E2] ">
            <label className="text-white text-sm">{formattedDate}</label>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Note"
        ariaHideApp={false}
      >
        <NoteView
          note={directory}
          closeModal={closeModal}
          setCurrentItem={setCurrentItem}
          item={item}
        />
      </Modal>      
    </>
  );
};

export default Playground;
