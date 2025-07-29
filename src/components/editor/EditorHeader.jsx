import { useSelector, useDispatch } from 'react-redux'
import { unselectTemplate } from '../../store/features/templateListStore';


function EditorHeader({ onLoad, classSave, onSave, onSaveAs, onClear, onImport, onExport, onShowPreloaded }) {
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
      <div className="buttons">
        <a title="Load" className="button is-light" href="#" onClick={onLoad}>
          <span className="icon">
            <i className="fas fa-folder-open"></i>
          </span>
        </a>
        <a title="Save" href="#" onClick={onSave} className={classSave}>
          <span className="icon">
            <i className="fas fa-save"></i>
          </span>
        </a>
        <a title="SaveAs" className="button is-light" href="#" onClick={onSaveAs}>
          <span className="icon">
            <i className="fa-solid fa-file-circle-plus"></i>
          </span>
        </a>
        <a title="Clear" className="button is-light" href="#" onClick={onClear}>
          <span className="icon">
            <i className="fas fa-trash-alt"></i>
          </span>
        </a>
        <a title="Export" className="button is-light" href="#" onClick={onExport}>
          <span className="icon">
            <i className="fas fa-file-export"></i>
          </span>
        </a>
        <div className="button p-0 mb-0 file is-light">
          <label title="Import" className="file-label p-3">
            <input title="Import" name="import" className="file-input" type="file" accept=".txt" onChange={onImport} />
              <span className="file-icon has-text-dark mr-0">
                <i className="fas fa-upload "></i>
              </span>
          </label>
        </div>
        <a title="Show Preload" className="button is-light is-right" href="#" onClick={onShowPreloaded}>
          <span className="icon">
            <i class="fa-solid fa-book"></i>
          </span>
        </a>
      </div>
    </>
  );
}

export default EditorHeader;
