import { BiPin, BiPinFill } from "assets/icons/Icons";
import { useState } from "react";
import { ColorPalette } from "components/index";
import "./editNote.css";
import { useNotes } from "context";

function EditNote() {
  const { showEditModal, updateNoteHandler } = useNotes();
  const [editDetails, setEditDetails] = useState(showEditModal.note);

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
            <textarea
              rows="3"
              placeholder="Take notes ...."
              value={editDetails.description}
              onChange={(e) => {
                setEditDetails({
                  ...editDetails,
                  description: e.target.value,
                });
              }}
            ></textarea>
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
              className="btn btn-secondary fs-s"
              type="button"
              onClick={() => updateNoteHandler(editDetails)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { EditNote };
