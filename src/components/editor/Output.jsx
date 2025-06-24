import DOMPurify from 'dompurify'
import { useState, useEffect } from 'react'
import { marked } from 'marked'
import { colorExtension, headExtension, boldExtension, italicExtension } from '../../libs/parserExtensions'
import customRenderer from '../../libs/renderer'
import './Output.css'



marked.use({
  extensions: [colorExtension, headExtension, boldExtension, italicExtension],
  breaks: true,
  gfm: true
});

function Output({ handleInput }) {
  let [outputHTML, changeOutputHTML] = useState('')

  useEffect(() => {
    async function parseMarkdown() {
      const safeHtml = DOMPurify.sanitize(handleInput, {
        USE_PROFILES: { html: true },
        FORBID_TAGS: ['script', 'iframe', 'style', 'link', 'form', 'input'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
        ADD_TAGS: ['span', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'a']
      })
      const parsedHtml = await marked.parse(safeHtml);
      changeOutputHTML(parsedHtml)
    }
    parseMarkdown()
  }, [handleInput]);

  return (
    <div className="output-container m-4">
      <h2 className="title is-4">Output</h2>
      <div>
        <div className="paper content is-family-noto-sans">
          <div dangerouslySetInnerHTML={{ __html: outputHTML }} />
        </div>
      </div>
    </div>
  )
}

export default Output;
