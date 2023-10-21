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
  return (
    <div className="bg-[#EFECDE]">
      <div className="flex items-center py-1 border-y border-gray-300">
        <div className="flex items-center py-2 pr-4 border-r-2 border-gray-300">
          <IconTextButton
            onClick={goToEnclosingFolder}
            src={BackButton}
            alt="Back Button"
            label="Back"
            className={item.parent ? "text-black" : "text-gray-400"}
            disabled={!item.parent}
          />
          <IconTextButton
            src={BackButton}
            alt="Back Button"
            label=""
            className={"rotate-180 grayscale ml-2"}
            disabled={true}
          />
          <IconTextButton
            src={HomeDirectory}
            alt="Root Directory"
            label="Root Directory"
            className={"text-sm ml-2"}
            disabled={true}
          />
        </div>
        <div className="flex items-center pr-4 border-r-2 border-gray-300">
          <IconTextButton
            src={Search}
            alt="Search"
            label="Search"
            className={"text-sm ml-2"}
            disabled={true}
          />
          <IconTextButton
            onClick={handleAddDirectory}
            src={NewFolder}
            alt="Create New Folder"
            label="New Directory"
            className={"text-sm ml-2"}
            disabled={true}
          />
          <IconTextButton
            onClick={handleAddNote}
            src={NewFile}
            alt="Create New File"
            label="New File"
            className={"text-sm ml-2"}
            disabled={true}
          />
        </div>
        {selectedItems.length > 0 && (
          <div className="flex items-center" onClick={deleteSelectedItems}>
            <Image
              className="ml-4 mr-2"
              src={DeleteAll}
              alt="Create New Folder"
              width={30}
            />
            <p className="text-sm">Delete All</p>
          </div>
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
