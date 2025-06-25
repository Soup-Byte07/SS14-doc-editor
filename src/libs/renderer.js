let escapeHtml = (html) => {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let returnSpan = (content) => {
    return `<span>${escapeHtml(content)}</span>`
}

const customRenderer = {
    image() {
        return ''
    },
    heading: data => returnSpan(data.text),
    link: data => returnSpan(data.text),
    strong: data => returnSpan(data.text),
    em: data =>  returnSpan(data.text),
    listitem: data => returnSpan(data.text),
    list: data => returnSpan(data.text),
    table: data => returnSpan(data.text),
    tablecell: data => returnSpan(data.text),
    html: data => returnSpan(data.text),
    blockquote: data => returnSpan(data.text),
    text: data => returnSpan(data.text),
    br: () => `<br />`,
    hr: () => `<hr />`,

    code: (data) => returnSpan(data),
};


export default customRenderer
