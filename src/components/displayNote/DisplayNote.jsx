import { BiPinFill, BiPalette, BiTrash, BiPencil } from "assets/icons/Icons";
import "./displayNote.css";

function DisplayNote() {
  return (
    <div className="display-notes-container">
      <button className="btn-pin" type="button">
        <BiPinFill className="fs-m" />
      </button>
      <div className="display-notes">
        <h2 className="fs-m">Title 1</h2>
        <p className="fs-s">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
          soluta, architecto officiis veritatis voluptatibus quis cupiditate ut
          eum minima, aut quaerat magni error laboriosam commodi.
        </p>
      </div>
      <div className="display-cta">
        <div className="d-flex">
          <h3 className="fs-s tag">Home</h3>
          <h3 className="fs-s tag">Medium</h3>
        </div>
        <div className="display-cta-section">
          <button>
            <BiPalette className="fs-s mr-sm" />
          </button>
          <button>
            <BiPencil className="fs-s mr-sm" />
          </button>
          <button>
            <BiTrash className="fs-s" />
          </button>
        </div>
      </div>
    </div>
  );
}
export { DisplayNote };
