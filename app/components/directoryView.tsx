import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Item } from "../containers/types";
import { FiFolder, FiFileText, FiTrash2, FiEdit } from "react-icons/fi";
import FileFolder from "../static/icons/explorer_folder.png";
import Notepad from "../static/icons/notepad-1.png";

interface DirectoryViewProps {
  directory: Item;
  handleItemClick: any;
  handleRenameItem: any;
  handleDeleteItems: any;
  selectedItems: any;
  toggleSelection: any;
  deleteSelectedItems: any;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({
  directory,
  handleItemClick,
  handleRenameItem,
  handleDeleteItems,
  toggleSelection,
  selectedItems,
  deleteSelectedItems,
}) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    selectedItem: "",
  });

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup - remove the listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleContextMenu = (event: any, itemName: string) => {
    event.preventDefault();

    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      selectedItem: itemName,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const directories =
    directory.items?.filter((item) => item.type === "directory") || [];
  const notes = directory.items?.filter((item) => item.type === "note") || [];
  const sortedDirectories = directories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedNotes = notes.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <table className="w-full">
        <thead className="bg-[#EFECDE] text-sm text-left">
          <tr className="">
            <th className="w-8 px-3 border-r border-[#D4D0C3]"></th>
            <th className="w-1/2 py-2 font-normal border-r border-[#D4D0C3] pl-2">
              Name
            </th>
            <th className="font-normal border-r border-[#D4D0C3] pl-2">Type</th>
            <th className="font-normal border-r border-[#D4D0C3] pl-2">
              Date Modified
            </th>
            <th className="font-normal pl-2 md:hidden">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedDirectories.concat(sortedNotes).map((childItem, index) => (
            <tr className="dirItem hover:bg-transparent" key={index}>
              <td className="w-8 px-3 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="form-checkbox h-3 w-3"
                  checked={selectedItems.includes(childItem.name)}
                  onChange={() => toggleSelection(childItem.name)}
                />
              </td>
              <td
                onContextMenu={(e) => handleContextMenu(e, childItem.name)}
                className="w-1/2 py-1 pl-2 whitespace-nowrap bg-[#F7F7F7]"
                onClick={() => handleItemClick(childItem)}
              >
                <div className="flex items-center">
                  {childItem.type === "directory" ? (
                    <Image src={FileFolder} alt="File Folder" />
                  ) : (
                    <Image src={Notepad} alt="Text Document" />
                  )}
                  <p className="text-sm ml-1">{childItem.name}</p>
                </div>
              </td>
              <td>
                <p className="text-sm mx-2">
                  {childItem.type === "note" ? "Text Document" : "File Folder"}
                </p>
              </td>
              <td>
                <p className="text-sm mx-2">{childItem.dateModified}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap md:hidden">
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
      {contextMenu.visible && (
        <div
          style={{
            position: "absolute",
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            zIndex: 1000,
            background: "#F1F1F1",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            width: "150px",
          }}
          ref={contextMenuRef}
          onClick={closeContextMenu}
        >
          <div
            className="ml-3 my-1 text-sm"
            onClick={() => handleRenameItem(contextMenu.selectedItem)}
          >
            Rename
          </div>
          <div
            className="ml-3 my-1 text-sm"
            onClick={() => handleDeleteItems(contextMenu.selectedItem)}
          >
            Delete
          </div>
        </div>
      )}
    </>
  );
};

export default DirectoryView;
