import { BiPin, BiPinFill } from "assets/icons/Icons";
import { useEffect, useState } from "react";
import { ColorPalette } from "components/index";
import "./editNote.css";
import { useNotes } from "context";
import ReactQuill from "react-quill";

function EditNote() {
  const { showEditModal, updateNoteHandler, setShowEditModal } = useNotes();
  const [editDetails, setEditDetails] = useState(showEditModal.note);
  const [description, setDescription] = useState(showEditModal.note.description);

  useEffect(() => {
    setEditDetails((prev) => ({ ...prev, description }));
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
    <>
      <div className="edit-modal">
        <div
          className="edit-notes"
          style={{ backgroundColor: editDetails.color }}
        >
          <button
            className="btn-pin"
            onClick={() => {
              setEditDetails({
                ...editDetails,
                isPinned: !editDetails.isPinned,
              });
            }}
          >
            {editDetails.isPinned ? (
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
              value={editDetails.title}
              onChange={(e) => {
                setEditDetails({ ...editDetails, title: e.target.value });
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
                defaultValue={editDetails.label}
                className="fs-s"
                onChange={(e) => {
                  setEditDetails({ ...editDetails, label: e.target.value });
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
                className="fs-s"
                defaultValue={editDetails.priority}
                onChange={(e) => {
                  setEditDetails({
                    ...editDetails,
                    priority: e.target.value,
                  });
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
                  formDetails={editDetails}
                  setFormDetails={setEditDetails}
                />
              </button>
            </div>
            <button
              className="btn btn-secondary fs-s mr-sm"
              type="button"
              onClick={() => updateNoteHandler(editDetails)}
            >
              Save
            </button>
            <button
              className="btn btn-primary fs-s "
              type="button"
              onClick={() => setShowEditModal({ state: false, note: {} })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { EditNote };
