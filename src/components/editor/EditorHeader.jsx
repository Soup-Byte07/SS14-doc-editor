import { useSelector, useDispatch } from 'react-redux'
import { unselectTemplate } from '../../store/features/templateListStore';


function EditorHeader({ onLoad, classSave, onSave, onSaveAs, onClear, onImport, onExport }) {
  const dispatch = useDispatch()
  const selectedTemplate = useSelector(state => state.templateList.selectedTemplate)
  const clearSelectedTemplate = () => {
    dispatch(unselectTemplate())
  }
  return (
    <>
      <div className="editor-title panel-heading">
        <div className=" is-inline-flex">
          <p> Current Template: 
            { selectedTemplate ? (
              <a href="#" className="ml-2 has-text-success" onClick={
                clearSelectedTemplate
              }>
                 { selectedTemplate.title}
              </a>
              ) : (
                <span className="ml-2">
                  None
                </span>
              )
            } 
          </p>
        </div>
      </div>
      <div className="editor-actions panel-tabs">
        <a href="#" onClick={onLoad}>
          <span className="icon mr-1">
            <i className="fas fa-folder-open"></i>
          </span>
          <span>Load</span>
        </a>
        <a href="#" onClick={onSave} className={classSave}>
          <span className="icon mr-1">
            <i className="fas fa-save"></i>
          </span>
          <span>Save</span>
        </a>
        <a href="#" onClick={onSaveAs}>
          <span className="icon mr-1">
            <i className="fa-solid fa-file-circle-plus"></i>
          </span>
          <span>Save As</span>
        </a>
        <a href="#" onClick={onClear}>
          <span className="icon mr-1">
            <i className="fas fa-trash-alt"></i>
          </span>
          <span>Clear</span>
        </a>
        <a href="#" onClick={onExport}>
          <span className="icon mr-1">
            <i className="fas fa-file-export"></i>
          </span>
          <span>
          Export
          </span>
        </a>
        <div className="file p-3 is-ghost has-text-link">
          <label className="file-label">
            <input name="import" className="file-input" type="file" accept=".txt" onChange={onImport} />
            <span className="is-inline-flex">
              <span className="file-icon has-text-link">
                <i className="fas fa-upload mt-1"></i>
              </span>
              <span className="file-label has-text-link"> Import </span>
            </span>
          </label>
        </div>
      </div>
    </>
  );
}

export default EditorHeader;
