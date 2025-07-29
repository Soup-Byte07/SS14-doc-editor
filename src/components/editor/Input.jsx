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
  let [saveClass, setSaveClass] = useState("button is-light")
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


  const detectInputBold = () => {
    let txtarea = document.getElementById("textEditor");
    if(!txtarea) return
    let start = txtarea.selectionStart;
    let finish = txtarea.selectionEnd;

    let beforeSel = txtarea.value.substring(0, start)
    let afterSel = txtarea.value.substring(finish, txtarea.value.length)
    let sel
    if(txtarea.value.substring(start, finish).includes("[bold]")) {
      sel = txtarea.value.substring(start, finish).replace(/\[bold\]/g, "").replace(/\[\/bold\]/g, "")
      sel = sel.replace(/^\s*|\s*$/g, "")
      if(sel.length === 0) {
        sel = txtarea.value.substring(start, finish)
      }
    } else {
      sel = "[bold]" + txtarea.value.substring(start, finish) + "[/bold]"
    }
    handleChange(beforeSel + sel + afterSel)
  }

const detectInputItalic = () => {
    let txtarea = document.getElementById("textEditor");
    if(!txtarea) return
    let start = txtarea.selectionStart;
    let finish = txtarea.selectionEnd;

    let beforeSel = txtarea.value.substring(0, start)
    let afterSel = txtarea.value.substring(finish, txtarea.value.length)
    let sel
    if(txtarea.value.substring(start, finish).includes("[italic]")) {
      sel = txtarea.value.substring(start, finish).replace(/\[italic\]/g, "").replace(/\[\/italic\]/g, "")
      sel = sel.replace(/^\s*|\s*$/g, "")
      if(sel.length === 0) {
        sel = txtarea.value.substring(start, finish)
      }
    } else {
      sel = "[italic]" + txtarea.value.substring(start, finish) + "[/italic]"
    }

    handleChange(beforeSel + sel + afterSel)
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
              setSaveClass("has-text-success button")
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
          <div className="buttons my-0">
            <button className="button is-light" onClick={detectInputBold}>
              <span className="icon">
                <i className="fa-solid fa-bold"></i>
              </span>
            </button>
            <button className="button is-light" onClick={detectInputItalic}>
              <span className="icon">
                <i className="fa-solid fa-italic"></i>
              </span>
            </button>
            <div className="is-inline-flex">
              <button className="button is-light">
                <span className="icon">
                  <i className="fa-solid fa-paintbrush"></i>
                </span>
              </button>
              <input type="color" className="p-1"/>
            </div>
          </div>
          <textarea
            id="textEditor"
            type="text"
            value={handleText}
            onChange={handleChange}
            cols="80"
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
