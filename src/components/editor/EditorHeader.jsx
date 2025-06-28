function EditorHeader({ title, onLoad, onSave, onClear, onImport, onExport }) {
  return (
    <>
      <div className="editor-title panel-heading">{title}</div>
      <div className="editor-actions panel-tabs">
        <a href="#" onClick={onLoad}>
          Load
        </a>
        <a href="#" onClick={onSave}>
          Save
        </a>

        <a href="#" onClick={onClear}>
          Clear
        </a>
        <a href="#" onClick={onExport}>
          Export
        </a>
        <a href="#" onClick={onImport}>
          Import
        </a>
      </div>
    </>
  );
}

export default EditorHeader;
