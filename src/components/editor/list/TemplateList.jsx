import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTemplates, selectTemplate } from '../../../store/features/templateListStore'

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
    console.log(templateList)
    return templateList.map((template,i) => (
      <tr className="is-clickable" key={template.title} onClick={() => {
        console.log(i)
        dispatch(selectTemplate(i))
        callback(template)
      }}>
        <td>{template.title}</td>
        <td>{new Date(template.createdAt).toLocaleDateString()}</td>
        <td>{new Date(template.updatedAt).toLocaleDateString()}</td>
      </tr>
    ))
  }, [templateList])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="template-list">
      <h2 className="title is-3">Templates</h2>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
            <th>Updated At</th>
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
