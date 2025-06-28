import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToTemplate } from '../../../store/features/templateListStore'

function SaveForm({ callback, contents }) {
  
  const dispatch = useDispatch()
  const [templateName, saveTemplateName] = useState("example")
  const [saved, setSaved] = useState(false)

  return (
    <div className="template-list">
      <h2 className="title is-3">Save Templates</h2>

      <div className="field">
        <input className="input" type="text" maxLength="50"  onChange={(e) => saveTemplateName(e.target.value)}/>
      </div>
      <div className="buttons">
        <button className="button is-primary" onClick={() => {
          console.log("Saving Template:", templateName)
          const newTemplate = {
            title: templateName,
            contents: contents,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          setSaved(true)
          setTimeout(setSaved(false), 3000)

          dispatch(addToTemplate(newTemplate))
          callback()
        }}>Save</button>
      </div>
      <div className="p-3">
        { saved == true && <p className="is-size-7 has-text-success">Saved!</p>
        }
      </div>
    </div>
  )
}

export default SaveForm
