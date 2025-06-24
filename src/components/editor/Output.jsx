import DOMPurify from 'dompurify'
import { useMemo } from 'react'
import { marked } from 'marked'
import { colorExtension, headExtension } from '../../libs/parserExtensions'

import './Output.css'


marked.use({
  mangle: false,
  headerIds: false,
  extensions: [colorExtension, headExtension]
});

function Output({ handleInput }) {
  const sanitizedHtml = useMemo(() => {
    const rawHtml = marked.parse(handleInput)
    const safeHtml = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script', 'iframe', 'style', 'link', 'form', 'input'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
      ADD_TAGS: ['span', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'a']
    })
    return safeHtml
  }, [handleInput]);

  return (
    <div className="output-container m-4">
      <h2 className="title is-4">Output</h2>
      <div>
        <div className="paper content is-family-noto-sans">
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
      </div>
    </div>
  )
}

export default Output;
