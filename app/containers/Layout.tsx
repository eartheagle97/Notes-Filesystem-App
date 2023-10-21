import React from "react";
import SideTaskItem from "../components/SideTaskItem";

function Layout() {
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
    <div className="grid-flow-row auto-rows-max">
      <div className="header border">
        <div
          className="title-bar"
          style={{ paddingTop: 18, paddingBottom: 18 }}
        >
          <div className="title-bar-text text-[16px]">
            Quilt Labs Notes Filesystem App
          </div>
          <div className="title-bar-controls">
            {windowButtons &&
              windowButtons.map((button, idx) => (
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
        <div>
          <div className="flex">
            <div>{leftDots(4)}</div>
            {menuOptions &&
              menuOptions.map((item, idx) => (
                <label key={idx} className="mx-2">
                  {item}
                </label>
              ))}
          </div>
        </div>
        {/* Actions Buttons */}
        <div></div>
        {/* Address Bar */}
        <div></div>
      </div>
      <div className="grid grid-cols-4 main-layout">
        <div className="col-span-1 border">
          <div className="p-10" style={{ backgroundColor: "#7da7f0" }}>
            <SideTaskItem />
          </div>
        </div>
        <div className="border">ML2</div>
      </div>
    </div>
  );
}

export default Layout;
