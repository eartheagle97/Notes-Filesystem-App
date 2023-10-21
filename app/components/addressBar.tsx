import React, { useContext } from "react";
import { WorkspaceContext } from "../containers/workspace";
import Image from "next/image";
import { Item } from "../containers/types";
import GoButton from "../static/icons/go-button.png";
import DropDown from "../static/icons/dropdown.png";
import BackButton from "../static/icons/back-button.png";
import HomeDirectory from "../static/icons/home-directory.png";
import Search from "../static/icons/search.png";
import NewFolder from "../static/icons/new-folder.png";
import NewFile from "../static/icons/new-file.png";
import DeleteAll from "../static/icons/Recycle.png";
import IconTextButton from "./IconTextButton";

interface AddressBarProps {
  path: string[];
  item: Item;
  goToEnclosingFolder: any;
  handleAddDirectory: any;
  handleAddNote: any;
  selectedItems: any;
  deleteSelectedItems: any;
}

const AddressBar: React.FC<AddressBarProps> = ({
  path,
  item,
  goToEnclosingFolder,
  handleAddDirectory,
  handleAddNote,
  selectedItems,
  deleteSelectedItems,
}) => {
  const buttonsConfig = [
    {
      id:'backButton',
      src: BackButton,
      alt: "Back Button",
      label: "Back",
      className: item.parent ? "text-black" : "text-gray-400",
      onClick: goToEnclosingFolder,
      disabled: !item.parent,
    },
    {
      id:'forwardButton',
      src: BackButton,
      alt: "Forward Button",
      className: "rotate-180 grayscale ml-2",
      disabled: true,
    },
    {
      id:'homeButton',
      src: HomeDirectory,
      alt: "Root Directory",
      label: "Root Directory",
      className: "text-sm ml-2",
      disabled: true,
    },
    {
      id:'searchButton',
      src: Search,
      alt: "Search",
      label: "Search",
      className: "text-sm ml-2",
      disabled: true,
    },
    {
      id:'newFolderButton',
      src: NewFolder,
      alt: "Create New Folder",
      label: "New Directory",
      className: "text-sm ml-2",
      onClick: handleAddDirectory,
    },
    {
      id:'newFileButton',
      src: NewFile,
      alt: "Create New File",
      label: "New File",
      className: "text-sm ml-2",
      onClick: handleAddNote,
    },
  ];

  return (
    <div className="bg-[#EFECDE]">
      <div className="flex items-center py-1 border-y border-gray-300">
        <div className="flex items-center py-2 pr-4 border-r-2 border-gray-300">
          {buttonsConfig.slice(0, 3).map((button, index) => (
            <IconTextButton
              key={button.id}
              src={button.src}
              alt={button.alt}
              label={button.label}
              className={button.className}
              onClick={button.onClick}
              disabled={button.disabled}
            />
          ))}
        </div>
        <div className="flex items-center pr-4 border-r-2 border-gray-300">
          {buttonsConfig.slice(3).map((button, index) => (
            <IconTextButton
              key={button.id} // to ensure unique keys
              src={button.src}
              alt={button.alt}
              label={button.label}
              className={button.className}
              onClick={button.onClick}
              disabled={button.disabled}
            />
          ))}
        </div>
        {selectedItems.length > 0 && (
          <IconTextButton
            src={DeleteAll}
            alt={"Delete All"}
            label={"Delete All"}
            className={"flex items-center"}
            onClick={deleteSelectedItems}
          />
        )}
      </div>

      <div className="flex items-center border-y border-gray-300">
        <p className="text-gray-400 mx-2 text-sm">Address</p>
        <input
          className="bg-white w-full px-2 py-1 text-sm"
          value={path.join("/")}
          readOnly
        />
        <Image src={DropDown} alt="Dropdown Button" width={25} />
        <Image src={GoButton} alt="GO BUTTON" width={25} className="ml-2" />
        <p className="mr-3 ml-1">Go</p>
      </div>
    </div>
  );
};

export default AddressBar;
