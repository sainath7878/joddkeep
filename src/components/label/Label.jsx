import "./label.css";

function Label({ note }) {
  const { title, color, description, label, priority, createdTime } = note;

  return (
    <div className="display-notes" style={{ backgroundColor: color }}>
      <div className="display-notes-text">
        <h2 className="fs-m">{title}</h2>
        <p className="fs-s">{description}</p>
      </div>
      <p className="display-date">CREATED ON: {createdTime}</p>
      <div className="display-cta">
        <div className="d-flex">
          <h3 className="fs-s labels">{label}</h3>
          <h3 className="fs-s priority">{priority}</h3>
        </div>
      </div>
    </div>
  );
}

export { Label };
