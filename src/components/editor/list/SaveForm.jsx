import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToTemplate } from '../../../store/features/templateListStore'

function SaveForm({ callback, contents }) {
  
  const dispatch = useDispatch()

  const templateListLength = useSelector(state => state.templateList.templates.length)

  const [templateName, saveTemplateName] = useState("example")
  const [saved, setSaved] = useState(false)

  return (
    <div className="template-list">
      <div className="field">
        <input className="input" placeholder="Your template name..." type="text" maxLength="50"  onChange={(e) => saveTemplateName(e.target.value)}/>
      </div>
      { saved != true ? (
      <div className="buttons">
        <button className="button is-primary" onClick={() => {
            const newTemplate = {
              title: templateName,
              contents: contents,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              id: templateListLength + 1
            }
            setSaved(true)
            setTimeout(() => {
              setSaved(false)
              dispatch(addToTemplate(newTemplate))
              callback()
            }, 3000)
        }}>Save</button>
      </div>
      ) : (
        <div className="p-3">
          { saved == true && <p className="is-size-5 has-text-success">Saved!</p> }
        </div>
      )
    }
    </div>
  )
}

export default SaveForm
