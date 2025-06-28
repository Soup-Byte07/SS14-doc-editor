import { useState } from 'react'
import Modal from './list/Modal.jsx'
import TemplateList from './list/TemplateList.jsx'
import SaveForm from './list/SaveForm.jsx'

import './Input.css'
import EditorHeader from './EditorHeader.jsx'

function Input({handleChange, handleText}) {
  let [isLoadTemplateOpen, openLoadTemplate] = useState(false)
  let loadTemplate = (template) => {
    console.log("Loading Template:", template)
    handleChange(template.contents)
    openLoadTemplate(false)
  }

  let [isSavingTeplateOpen, openSaveTemplate] = useState(false)
  let saveTemplate = () => {
    openSaveTemplate(false)

  }

  return (
    <div className="input-container">

      <Modal 
        title="Load Template"
        component={<TemplateList callback={loadTemplate} />}
        isOpen={isLoadTemplateOpen}
        toggleModal={openLoadTemplate}
      />

      <Modal 
        title="Save Template"
        component={<SaveForm callback={saveTemplate} contents={handleText} />}
        isOpen={isSavingTeplateOpen}
        toggleModal={openSaveTemplate}
      />

      <article className="panel">
        <EditorHeader
          title="Input Editor"
          onLoad={(e) => {
            e.preventDefault()
            openLoadTemplate(true)
          }}
          onSave={(e) => {
            e.preventDefault()
            openSaveTemplate(true)
          }}
          onClear={(e) => {
            e.preventDefault()
            handleChange("")
          }}
        />
        <div>
          <textarea
            type="text"
            value={handleText}
            onChange={handleChange}
            rows="23"
            className="textarea"
            placeholder="Type something..."
          ></textarea>         
        </div>

      </article>
    </div>
  );
}

export default Input;
