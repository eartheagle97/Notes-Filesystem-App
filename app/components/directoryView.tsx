import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Item } from "../containers/types";
import { FiTrash2, FiEdit } from "react-icons/fi";

interface DirectoryViewProps {
  directory: Item;
  handleItemClick: any;
  handleRenameItem: any;
  handleDeleteItems: any;
  selectedItems: any;
  toggleSelection: any;
  deleteSelectedItems: any;
}

interface RightClickItem {
  name: string;
  icon: string;
  onclick?: () => void;
  underline: string | boolean;
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

  const rightclick = [
    {
      name: "Open",
      icon: "",
      underline: "",
    },
    {
      name: "Explore",
      icon: "",
      underline: "",
    },
    {
      name: "Extract files...",
      icon: "/assets/img/winrar.png",
      underline: "",
    },
    {
      name: "Extract Here",
      icon: "/assets/img/winrar.png",
      underline: "",
    },
    {
      name: "Extract to...",
      icon: "/assets/img/winrar.png",
      underline: true,
    },
    {
      name: "Send to",
      icon: "",
      underline: true,
    },
    {
      name: "Cut",
      icon: "",
      underline: "",
    },
    {
      name: "Copy",
      icon: "",
      underline: true,
    },
    {
      name: "Create Shortcut",
      icon: "",
      underline: "",
    },
    {
      name: "Delete",
      icon: "",
      onclick: () => {
        handleDeleteItems(contextMenu.selectedItem);
      },
      underline: "",
    },
    {
      name: "Rename",
      icon: "",
      onclick: () => {
        handleRenameItem(contextMenu.selectedItem);
      },
      underline: true,
    },
    {
      name: "Properties",
      icon: "",
      underline: "",
    },
  ];

  return (
    <>
      <table className="w-full">
        <thead className="bg-[#EFECDE] text-sm text-left drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
          <tr className="">
            <th className="w-8 px-3 border-r border-[#D4D0C3]"></th>
            <th className="w-1/2 py-1 font-normal border-r border-[#D4D0C3] pl-2">
            <label>Name</label>
            </th>
            <th className="font-normal border-r border-[#D4D0C3] pl-2"><label>Type</label></th>
            <th className="font-normal border-r border-[#D4D0C3] pl-2">
              <label>Date Modified</label>
            </th>
            <th className="font-normal pl-2 md:hidden">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedDirectories.concat(sortedNotes).map((childItem, index) => (
            <tr className="dirItem hover:bg-transparent" key={index}>
              <td className="w-8 px-3 py-2 whitespace-nowrap">
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
                    <Image
                      src={"/assets/img/explorer_folder.png"}
                      alt="File Folder"
                      width={15}
                      height={15}
                    />
                  ) : (
                    <Image
                      src={"/assets/img/notepad.png"}
                      alt="Text Document"
                      width={15}
                      height={15}
                    />
                  )}
                  <label className="text-sm ml-1">{childItem.name}</label>
                </div>
              </td>
              <td>
                <label className="text-sm mx-2">
                  {childItem.type === "note" ? "Text Document" : "File Folder"}
                </label>
              </td>
              <td>
                <label className="text-sm mx-2">{childItem.dateModified}</label>
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
            background: "#ffffff",
            border: "1px solid rgba(0, 0, 0, 0.6)",
            boxShadow: "4px 4px 3px rgba(0, 0, 0, 0.3)",
            width: "200px",
          }}
          ref={contextMenuRef}
          onClick={closeContextMenu}
        >
          {rightclick.map((item, index) => {
            return (
              <>
                <div className={`flex items-center hover:bg-[#f1f1f1]`}>
                  {item.icon ? (
                    <Image
                      className="absolute ml-1.5"
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                    />
                  ) : (
                    ""
                  )}
                  <label className={`ml-8 my-1 text-sm`} onClick={item.onclick}>
                    {item.name}
                  </label>
                </div>
                {item.underline ? (
                  <div className="border-b my-1 border-gray-300"></div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DirectoryView;
