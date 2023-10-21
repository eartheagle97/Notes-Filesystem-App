import { url } from "inspector";
import React from "react";

import Image from "next/image";
import sections from "../data/SideTaskData";

const SideTaskItem: React.FC = () => {
  return (
    <div className="grid grid-flow-row auto-rows-max gap-4 ">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-red border rounded bg-gradient-to-r from-white to-[#d7def8]">
          <div className="border pl-6">
            <label className="text-[#1955c6] text-base font-bold">{section.sectionTitle}</label>
          </div>
          {section.content.map((imageData, index) => (
            <div key={index} className="flex items-center px-6 bg-[#d7def8]">
              <div>
                <Image
                  src={imageData.src}
                  height={30}
                  width={30}
                  alt={imageData.alt}
                  title={imageData.title}
                />
              </div>
              <div>
                <label>{imageData.title}</label>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SideTaskItem;
