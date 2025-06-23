import DOMPurify from 'dompurify';
import { useMemo } from 'react';

import './Output.css'


function Output({ handleInput }) {


  // This so messy and unreadable. Might have to change it later
  let translateInput = (text => {
    return text
      .replace(/\[bold\](.*?)\[\/bold\]/g, '<strong>$1</strong>')
      .replace(/\[italic\](.*?)\[\/italic\]/g, '<em>$1</em>')
      .replace(/\[underline\](.*?)\[\/underline\]/g, '<u>$1</u>')
      .replace(/\[color=(#[0-9A-Fa-f]{6}|[a-zA-Z]+)\](.*?)\[\/color\]/g, (match, colorValue, content) => {
        const safeColor = DOMPurify.sanitize(colorValue, { USE_PROFILES: { html: false, svg: false, mathMl: false } });
        return `<span style="color:${safeColor}">${content}</span>`;
      }).replace(/\[head=(\d)\](.*?)\[\/head\]/g, (match, level, content) => {
        const headingLevel = parseInt(level, 10);
        const tag = `h${Math.min(6, Math.max(1, headingLevel))}`;
        console.log(tag)
        return `<${tag}>${content}</${tag}>`;
      });
  })

  const sanitizedHtml = useMemo(() => {
    const rawHtml = translateInput(handleInput);
    return DOMPurify.sanitize(rawHtml);
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
