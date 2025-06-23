function EditorHeader({ title, onSave, onClose }) {
  return (
    <>
      <div className="editor-title panel-heading">{title}</div>
      <div className="editor-actions panel-tabs">
        <a href="#" onClick={onSave}>
          Save
        </a>
        <a href="#" onClick={onClose}>
          Close
        </a>
      </div>
    </>
  );
}

export default EditorHeader;
