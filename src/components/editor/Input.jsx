import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTemplate } from '../../store/features/templateListStore'


import Modal from './list/Modal.jsx'
import TemplateList from './list/TemplateList.jsx'
import SaveForm from './list/SaveForm.jsx'
import PreloadedTemplate from './list/PreloadedTemplates.jsx'

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

  let [isPreloadedTemplatesOpen, openPreloadedTemplates] = useState(false)
  let loadPreloadedTemplate = (template) => {
    handleChange(template)
    openPreloadedTemplates(false)
  }

  let [selectedTextColor, changeSelectedTextColor] = useState("#000000")

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
      if(sel.length === 0) sel = txtarea.value.substring(start, finish)
    } sel = "[bold]" + txtarea.value.substring(start, finish) + "[/bold]"
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
      if(sel.length === 0) sel = txtarea.value.substring(start, finish)
    } else sel = "[italic]" + txtarea.value.substring(start, finish) + "[/italic]"
    handleChange(beforeSel + sel + afterSel)
  }

  const changeColorText = (e) => {
    console.log("Selected color:", e.target.value)
    changeSelectedTextColor(e.target.value)
  }
  const detectInputColor = () => {
    let txtarea = document.getElementById("textEditor");
    if(!txtarea) return
    let start = txtarea.selectionStart;
    let finish = txtarea.selectionEnd;
    let beforeSel = txtarea.value.substring(0, start)
    let afterSel = txtarea.value.substring(finish, txtarea.value.length)
    let sel
    if(txtarea.value.substring(start, finish).includes("[color]")) {
      sel = txtarea.value.substring(start, finish).replace(/\[color\]/g, "").replace(/\[\/color\]/g, "")
      sel = sel.replace(/^\s*|\s*$/g, "")
      if(sel.length === 0) sel = txtarea.value.substring(start, finish)
    } else sel = `[color=${selectedTextColor}]` + txtarea.value.substring(start, finish) + "[/color]"
    handleChange(beforeSel + sel + afterSel)
  }

  const detectBulletPoint = () => {
    let txtarea = document.getElementById("textEditor");
    if(!txtarea) return
    let start = txtarea.selectionStart;
    let finish = txtarea.selectionEnd;
    let beforeSel = txtarea.value.substring(0, start)
    let afterSel = txtarea.value.substring(finish, txtarea.value.length)
    let sel
    if(txtarea.value.substring(start, finish).includes("[bullet/]")) {
      sel = txtarea.value.substring(start, finish).replace(/\[bullet\/\]/g, "")
      sel = sel.replace(/^\s*|\s*$/g, "")
      if(sel.length === 0) sel = txtarea.value.substring(start, finish)
    } else sel = "[bullet/]" + txtarea.value.substring(start, finish)
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

      <Modal
        title="Preloaded Templates"
        component={<PreloadedTemplate callback={loadPreloadedTemplate} />}
        isOpen={isPreloadedTemplatesOpen}
        toggleModal={openPreloadedTemplates}
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
          onShowPreloaded={(e) => {
            e.preventDefault()
            openPreloadedTemplates(true)
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
            <button className="button is-light" onClick={detectBulletPoint}>
              <span className="icon">
                <i class="fa-solid fa-list-ul"></i>
              </span>
            </button>
            <div className="is-inline-flex">
              <button className="button is-light" onClick={detectInputColor}>
                <span className="icon">
                  <i className="fa-solid fa-paintbrush"></i>
                </span>
              </button>
              <input type="color" className="mt-1" onChange={changeColorText}/>
            </div>
          </div>
          <textarea
            id="textEditor"
            type="text"
            value={handleText}
            onChange={handleChange}
            cols="80"
            rows="24"
            className="textarea"
            placeholder="Type something..."
          ></textarea>         
        </div>

      </article>
    </div>
  );
}

export default Input;
