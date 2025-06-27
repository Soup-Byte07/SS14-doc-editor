import DOMPurify from 'dompurify'
import { useState, useEffect } from 'react'
import { simpleParser } from '../../libs/simpleParser'
import './Output.css'

function Output({ handleInput }) {
  let [outputHTML, changeOutputHTML] = useState('')

  useEffect(() => {
    const parsedHtml = simpleParser(handleInput);
    const safeHtml = DOMPurify.sanitize(parsedHtml, {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script', 'iframe', 'style', 'link', 'form', 'input'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
      ADD_TAGS: ['span', 'br']
    });
    changeOutputHTML(safeHtml);
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