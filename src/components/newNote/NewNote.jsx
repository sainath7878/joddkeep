import "./notes.css";
import { BiPin, BiPinFill } from "assets/icons/Icons";
import { useEffect, useState } from "react";
import { ColorPalette } from "components/index";
import { useNotes } from "context";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";

function NewNote() {
  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    label: "",
    priority: "",
    color: "#fff",
    isPinned: false,
  });
  const { addNewNoteHandler } = useNotes();
  const [description, setDescription] = useState("");

  useEffect(() => {
    setFormDetails((prev) => ({ ...prev, description }));
  }, [description]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div
      className="input-notes-container"
      style={{ backgroundColor: formDetails.color }}
    >
      <button
        className="btn-pin"
        onClick={() => {
          setFormDetails({ ...formDetails, isPinned: !formDetails.isPinned });
        }}
      >
        {formDetails.isPinned ? (
          <BiPinFill className="fs-m" />
        ) : (
          <BiPin className="fs-m" />
        )}
      </button>
      <div className="input-notes">
        <textarea
          rows="1"
          placeholder="Title"
          maxLength="30"
          value={formDetails.title}
          onChange={(e) => {
            setFormDetails({ ...formDetails, title: e.target.value });
          }}
        ></textarea>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder={"Take notes ..."}
          modules={modules}
          formats={formats}
        />
      </div>
      <div className="input-cta">
        <div className="input-cta-section d-flex">
          <select
            defaultValue=""
            className="fs-s"
            onChange={(e) => {
              setFormDetails({ ...formDetails, label: e.target.value });
            }}
          >
            <option value="" disabled hidden>
              Label
            </option>
            <option value="Home">Home</option>
            <option vlaue="Work">Work</option>
            <option vlaue="Personal">Personal</option>
          </select>
          <select
            defaultValue=""
            className="fs-s"
            onChange={(e) => {
              setFormDetails({ ...formDetails, priority: e.target.value });
            }}
          >
            <option value="" disabled hidden>
              Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button>
            <ColorPalette
              className="mr-sm"
              formDetails={formDetails}
              setFormDetails={setFormDetails}
            />
          </button>
        </div>
        <button
          className="btn btn-secondary fs-s"
          type="button"
          onClick={() => {
            addNewNoteHandler(formDetails, setFormDetails);
            setDescription(() => "");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export { NewNote };
