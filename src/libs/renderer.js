const customRenderer = {
    paragraph(text) { console.log('customRenderer: paragraph returning:', text + '\n'); return text + '\n'; },
  heading(text, level) { console.log(`customRenderer: heading (level ${level}) returning:`, text + '\n'); return text + '\n'; },
  hr() { console.log('customRenderer: hr returning:'); return ''; },
  blockquote(quote) { console.log('customRenderer: blockquote returning:', quote); return quote; },
  list(body, ordered, start) { console.log('customRenderer: list returning:', body); return body; },
  listitem(text) { console.log('customRenderer: listitem returning:', text + '\n'); return text + '\n'; },
  strong(text) { console.log('customRenderer: strong returning:', text); return text; },
  em(text) { console.log('customRenderer: em returning:', text); return text; },
  codespan(code) { console.log('customRenderer: codespan returning:', code); return code; },
  code(code, infoString) { console.log('customRenderer: code returning:', code); return code; },
  link(href, title, text) { console.log('customRenderer: link returning:', text); return text; },
  image(href, title, text) { console.log('customRenderer: image returning:', text); return text; },
  del(text) { console.log('customRenderer: del returning:', text); return text; },
  html(html) { console.log('customRenderer: html returning:', html); return html; },
  br() { console.log('customRenderer: br returning:'); return '\n'; },
};


export default customRenderer
