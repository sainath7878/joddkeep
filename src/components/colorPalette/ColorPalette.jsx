import { BiPalette } from "assets/icons/Icons";
import { useState } from "react";
import "./colorPalette.css";

function ColorPalette({ formDetails, setFormDetails }) {
  const colors = [
    "#FAF9F6",
    "#f28983",
    "#fbbc04",
    "#FFF475",
    "#CCFF90",
    "#A7FFEB",
    "#CBF0F8",
    "#AECBFA",
    "#D7AEFB",
    "#FDCFE8",
    "#E6C9A8",
    "#E8EAED",
  ];
  const [displayPalette, setDisplayPalette] = useState(false);
  return (
    <div
      className="display-Palette"
      onMouseOver={() => setDisplayPalette(!displayPalette)}
      onMouseOut={() => setDisplayPalette(!displayPalette)}
    >
      <BiPalette className="fs-s"/>
      <div className={`${displayPalette ? "palette-container" : "d-none"}`}>
        {colors.map((item, index) => {
          return (
            <div
              key={index}
              className="color-div"
              style={{ backgroundColor: item }}
              onClick={() => setFormDetails({ ...formDetails, color: item })}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export { ColorPalette };
