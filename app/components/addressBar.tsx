import React from "react";
import Image from "next/image";
import { Item } from "../containers/types";
import IconTextButton from "./IconTextButton";

interface AddressBarProps {
  path: string[];
  item: Item;
  goToEnclosingFolder: any;
  handleAddDirectory: any;
  handleAddNote: any;
  selectedItems: any;
  deleteSelectedItems: any;
  leftDots: any;
}

const AddressBar: React.FC<AddressBarProps> = ({
  path,
  item,
  goToEnclosingFolder,
  handleAddDirectory,
  handleAddNote,
  selectedItems,
  deleteSelectedItems,
  leftDots,
}) => {
  const buttonsConfig = [
    {
      id: "backButton",
      src: "/assets/img/back-button.png",
      alt: "Back Button",
      label: "Back",
      className: item.parent ? "text-black mr-2" : "text-gray-400 mr-2",
      onClick: goToEnclosingFolder,
      disabled: !item.parent,
    },
    {
      id: "forwardButton",
      src: "/assets/img/back-button.png",
      alt: "Forward Button",
      label: "Forward",
      className: "rotate-180",
      disabled: true,
    },
    {
      id: "homeButton",
      src: "/assets/img/home-directory.png",
      alt: "My Computer",
      label: "My Computer",
      className: "mr-2",
      BtnClass: "border-r-2 border-gray-400 rounded-none"
    },
    {
      id: "searchButton",
      src: "/assets/img/search.png",
      alt: "Search",
      label: "Search",
      className: "ml-2",
    },
    {
      id: "newFolderButton",
      src: "/assets/img/new-folder.png",
      alt: "Create New Folder",
      label: "New Directory",
      className: "ml-2",
      onClick: handleAddDirectory,
    },
    {
      id: "newFileButton",
      src: "/assets/img/notepad.png",
      alt: "Create New File",
      label: "New File",
      className: "ml-2",
      onClick: handleAddNote,
      BtnClass: "border-r-2 border-gray-400 rounded-none"
    },
  ];

  return (
    <>
      <div className="flex bg-[#EFECDE] border-y border-gray-300">
        <div>{leftDots(8)}</div>
        <div className="grid grid-cols-3 md:flex md:items-center gap-4 md:gap-0 py-1">
          {buttonsConfig.map((button, index) => (
            <IconTextButton
              key={button.id}
              src={button.src}
              alt={button.alt}
              label={button.label}
              className={button.className}
              BtnClass={button.BtnClass}
              onClick={button.onClick}
              disabled={button.disabled}
            />
          ))}
          {selectedItems.length > 0 && (
            <IconTextButton
              src={"/assets/img/Recycle.png"}
              alt={"Delete All"}
              label={"Delete All"}
              className={"flex items-center ml-4"}
              onClick={deleteSelectedItems}
            />
          )}
        </div>
      </div>
      <div className="flex items-center bg-[#EFECDE] border-y border-gray-300">
        <div>{leftDots(4)}</div>
        <label className="text-gray-400 mx-2 text-sm">Address</label>
        <input
          className="bg-white w-full px-2 py-1 text-sm"
          value={path.join("/")}
          readOnly
        />
        <Image
          src={"/assets/img/dropdown.png"}
          alt="Dropdown Button"
          width={25}
          height={25}
        />
        <Image
          src={"/assets/img/go-button.png"}
          alt="GO BUTTON"
          width={25}
          height={25}
          className="ml-2"
        />
        <label className="mr-3 ml-1">Go</label>
      </div>
    </>
  );
};

export default AddressBar;
