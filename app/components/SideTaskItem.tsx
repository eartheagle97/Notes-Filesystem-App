import { url } from "inspector";
import React from "react";

import Image from "next/image";
import sections from "../data/SideTaskData";

interface SideTaskItemProps {
  handleAddDirectory: any;
  handleAddNote: any;
}

const SideTaskItem: React.FC<SideTaskItemProps> = ({
  handleAddDirectory,
  handleAddNote,
}) => {
  return (
    <div className="grid grid-flow-row auto-rows-max gap-4 ">
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="bg-red border rounded bg-gradient-to-r from-white to-[#d7def8]"
        >
          <div className="flex items-center justify-between border pl-6 pr-3">
            <label className="text-[#1955c6] text-base font-bold">
              {section.sectionTitle}
            </label>
            <Image
              src={"/assets/img/up-arrow.png"}
              className="drop-shadow-md"
              alt={"Up Arrow"}
              width={25}
              height={25}
            />
          </div>
          <div className="py-2 bg-[#d7def8]">
            {section.content.map((imageData, index) => (
              <div
                key={index}
                className="flex items-center px-6"
                onClick={() => {
                  if (imageData.alt === "Make a new folder") {
                    handleAddDirectory();
                  } else if (imageData.alt === "Make a new file") {
                    handleAddNote();
                  }
                }}
              >
                <div className="mr-2 py-0.5">
                  {imageData.src ? (
                    <Image
                      src={imageData.src}
                      height={20}
                      width={20}
                      alt={imageData.alt}
                      title={imageData.title}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label className={`text-xs ${imageData.src ? 'text-blue-600' : ''}`}>{imageData.title}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideTaskItem;
