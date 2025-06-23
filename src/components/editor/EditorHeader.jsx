function EditorHeader({ title, onSave, onClose }) {
  return (
    <header className="editor-header">
      <h1 className="editor-title">{title}</h1>
      <div className="editor-actions">
        <button className="button is-primary" onClick={onSave}>
          Save
        </button>
        <button className="button is-light" onClick={onClose}>
          Close
        </button>
      </div>
    </header>
  );
}

export default EditorHeader;
