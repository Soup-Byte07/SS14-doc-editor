import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTemplate, selectTemplate } from '../../../store/features/templateListStore'

function TemplateList({ callback }) {
  
  const dispatch = useDispatch()
  const templateList = useSelector(state => state.templateList.templates)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function fetchTemplates() {
      setLoading(false)
    }
    fetchTemplates()
  }, [dispatch])
  const templates = useMemo(() => {
    return templateList.map((template,i) => (
      <tr key={template.id}>
        <td>{template.title}</td>
        <td>{new Date(template.createdAt).toLocaleDateString()}</td>
        <td>{new Date(template.updatedAt).toLocaleDateString()}</td>
        <td>
          <button className="button is-primary is-icon" onClick={(e) => {
            e.preventDefault()
            dispatch(selectTemplate(i))
            callback(template)
          }}>
            <span>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
          </button>
        </td>
        <td>
          <button className="button is-danger is-icon" onClick={(e) => {
            e.preventDefault()
            dispatch(removeTemplate(template.id))
          }}>
            <span>
              <i className="fa-solid fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
    ))
  }, [templateList])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="template-list">
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {templates}
        </tbody>
      </table>
    </div>
  )
}

export default TemplateList
