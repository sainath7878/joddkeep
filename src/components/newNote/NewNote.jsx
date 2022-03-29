import "./notes.css";
import { BiPin, BiPalette } from "assets/icons/Icons";

function NewNote() {
  return (
    <div className="input-notes-container">
      <button className="btn-pin" type="button">
        <BiPin className="fs-m" />
      </button>
      <div className="input-notes">
        <textarea rows="1" placeholder="Title" maxLength="30"></textarea>
        <textarea rows="1" placeholder="Take notes ...."></textarea>
      </div>
      <div className="input-cta">
        <div className="input-cta-section flex-1">
          <select name="" id="" className="fs-s">
            <option defaultValue disabled hidden>
              Label
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Personal</option>
          </select>
          <select name="" id="" className="fs-s">
            <option selected disabled hidden>
              Priority
            </option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button>
            <BiPalette className="fs-s" />
          </button>
        </div>
        <button className="btn btn-secondary fs-s" type="button">
          Add
        </button>
      </div>
    </div>
  );
}
export { NewNote };
