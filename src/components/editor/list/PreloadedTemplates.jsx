import { useState, useEffect, useMemo } from 'react'
import txtList from "../../../assets/ss14TxtManifest.json" // an array of paths

function PreloadedTemplate({ callback }) {
  
  // Select Template from list
  const [errorOnSelection, changeErrorOnSelection] = useState(false)
  const selectTemplate = (path) => {
    console.log("/SS14-doc-editor/txt/ss14-forms-txt/" + path)
    fetch("/SS14-doc-editor/txt/ss14-forms-txt/" + path)
      .then(response => response.text())
      .then(data => {
        console.log(data)
        callback(data)
      })
      .catch(error => {
        console.error('Error fetching template:', error)
        changeErrorOnSelection(true)
      })
  }

  const templates = useMemo(() => {
    return txtList.map((item, index) => (
      <tr key={index}>
        <td>
          <a className="has-text-link is-size-7" href={`/SS14-doc-editor/txt/ss14-forms-txt/${item}`} target="_blank" rel="noopener noreferrer">
            {item}
          </a>
        </td>
        <td>
          <button className="button is-primary" onClick={() => selectTemplate(item)}>
            Select
          </button>
        </td>
      </tr>
    ))
  })

  return (
    <div className="preloaded-template p-5 is-flex is-flex-direction-column is-align-items-center" style={{ minHeight: '100vh' }}>
      <div className="content">
        <p className="is-size-5 has-text-weight-bold">What is this?</p>
        <p className="m-1 is-size-6">These are files from another repo called <span class="has-text-link is-italic">ss14-forms-txt</span>.</p>
      </div>
      {
        errorOnSelection && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => changeErrorOnSelection(false)}></button>
            <p>Error loading template. Please try again later.</p>
          </div>
        )
      }
      <div class="m-1">
        <table className="table is-striped is-hoverable is-fullwidth is-narrow">
          <tbody>
            {templates}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PreloadedTemplate
