function EditorHeader({ title, onSave, onClose }) {
  return (
    <>
      <div className="editor-title panel-heading">{title}</div>
      <div className="editor-actions panel-tabs">
      </div>
    </>
  );
}

export default EditorHeader;
