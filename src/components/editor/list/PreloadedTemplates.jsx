import { useState, useMemo } from 'react'
import txtList from "../../../assets/ss14TxtManifest.json" // an array of paths
import "./PreloadedTemplates.css"

function PreloadedTemplate({ callback }) {

  const [searchFilter, changeSearchFilter] = useState("")
  
  const [errorOnSelection, changeErrorOnSelection] = useState(false)
  const selectTemplate = (e, path) => {
    e.preventDefault()
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
    return txtList.filter(item => {
      if (!searchFilter) return true
      return item.toLowerCase().includes(searchFilter.toLowerCase())
    }).map((item, index) => (
      <tr key={index}>
        <td>
          <a className="has-text-link is-size-7" href={`#`} onClick={(e) => selectTemplate(e, item)}>
            {item}
          </a>
        </td>
        <td>
          <button className="button is-light is-small" onClick={(e) => selectTemplate(e, item)}>
            Select
          </button>
        </td>
      </tr>
    ))
  })

  return (
    <div className="preloaded-template p-5 ">
      <div className="content">
        <p className="is-size-5 has-text-weight-bold">What is this?</p>
        <p className="m-1 is-size-6">These are files from another repo called <span className="has-text-link is-italic">ss14-forms-txt</span>. This is a list of community posted templates that are on this github. Here is the link to the
          <a href="https://github.com/Moomoobeef/ss14-forms-txt" target="_blank"> github repo</a>.
        </p>
      </div>
      {
        errorOnSelection && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => changeErrorOnSelection(false)}></button>
            <p>Error loading template. Please try again later.</p>
          </div>
        )
      }
      <div className="m-1">
            <input
              className="input is-fullwidth"
              type="text"
              placeholder="Search templates..."
              value={searchFilter}
              onChange={(e) => changeSearchFilter(e.target.value)}
            />
      </div>
      <div className="m-1 scrollable-list">
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
