import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTemplate } from '../../store/features/templateListStore'


import Modal from './list/Modal.jsx'
import TemplateList from './list/TemplateList.jsx'
import SaveForm from './list/SaveForm.jsx'

import './Input.css'
import EditorHeader from './EditorHeader.jsx'

function Input({handleChange, handleText}) {

  const dispatch = useDispatch()
  const selectedTemplate = useSelector(state => state.templateList.selectedTemplate)

  let [isLoadTemplateOpen, openLoadTemplate] = useState(false)
  let loadTemplate = (template) => {
    handleChange(template.contents)
    openLoadTemplate(false)
  }

  let [isSavingAsTeplateOpen, openSaveAsTemplate] = useState(false)
  let [saveClass, setSaveClass] = useState("")
  let saveAsTemplate = () => {
    openSaveAsTemplate(false)
  }


  // copy and paste go brrr
  let exportTemplate = () => {
    const data = new Blob([handleText], { type: 'text/plain' })
    const url = window.URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = selectedTemplate ? `${selectedTemplate.title}.txt` : 'template.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const importTemplate = (e) => {
    const file = e.target.files[0];
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => handleChange(e.target.result)
    reader.readAsText(file)
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
        component={<SaveForm callback={saveAsTemplate} contents={handleText} />}
        isOpen={isSavingAsTeplateOpen}
        toggleModal={openSaveAsTemplate}
      />

      <article className="panel is-dark">
        <EditorHeader
          onLoad={(e) => {
            e.preventDefault()
            openLoadTemplate(true)
          }}
          classSave={saveClass}
          onSave={(e) => {
            e.preventDefault()
            if(selectedTemplate) {
              const payload = {
                title: selectedTemplate.title,
                contents: handleText,
                createdAt: selectedTemplate.createdAt,
                id: selectedTemplate.id
              }
              dispatch(updateTemplate(payload))
              setSaveClass("has-text-success")
              setTimeout(() => {
                setSaveClass("")
              }, 1000)
            } else {
              openSaveAsTemplate(true)
            }
          }}
          onSaveAs={(e) => {
            e.preventDefault()
            openSaveAsTemplate(true)
          }}
          onClear={(e) => {
            e.preventDefault()
            handleChange("")
          }}a
          onExport={(e) => {
            e.preventDefault()
            exportTemplate()
          }}
          onImport={(e) => {
            importTemplate(e)
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
