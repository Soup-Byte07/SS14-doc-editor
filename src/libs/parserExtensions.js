import { nestedParser } from './tokenizers';

const colorExtension = {
  name: 'color',
  level: 'inline',
  start: (src) => {
    return src.match(/\[color=/)?.index;

  },
  tokenizer(src) {
    const openTag = /^\[color=(#[0-9A-Fa-f]{3,6}|[a-zA-Z]+)\]/
    const closeTag = /^\[\/color\]/

    return nestedParser(src, openTag, closeTag, 'color', this, 'inline')
  },
  renderer(token) {
    const filteredTokens = token.tokens.filter(t => t.type !== 'space');
    const innerContent = this.parser.parseInline(filteredTokens);
    return `<span style="color: ${token.param}; white-space: pre-wrap;">${innerContent}</span>`
  }
}


const headExtension = {
  name: 'head',
  level: 'inline',
  start(src) { return src.match(/\[head=/) },
  tokenizer(src) {
    const openTag = /^\[head=(\d)\]/
    const closeTag = /^\[\/head\]/
    return nestedParser(src, openTag, closeTag, 'head', this, 'inline')
  },
  renderer(token) {
    const fontSizeMap = {
      1: '2em', 2: '1.5em', 3: '1.17em', 4: '1em', 5: '0.83em', 6: '0.67em',
    };
    console.log(token)
    const finalFontSize = fontSizeMap[token.param] || '1em'
    const contentHtml = this.parser.parseInline(token.tokens)
    return `<span style="font-size:${finalFontSize}; font-weight: bold;">${contentHtml}</span>`
  }
};

// [bold]text[/bold]
const boldExtension = {
  name: 'bold',
  level: 'inline',
  start(src) { return src.match(/\[bold\]/)?.index },
  tokenizer(src) {
    const openTag = /^\[bold\]/
    const closeTag = /^\[\/bold\]/
    return nestedParser(src, openTag, closeTag, 'bold', this, 'inline')
  },
  renderer(token) {
    const filteredTokens = token.tokens.filter(t => t.type !== 'space');
    const innerContent = this.parser.parseInline(filteredTokens);
    return `<span style="font-weight:bold">${innerContent}</span>`
  }
};
//[italic]test[/italic]
const italicExtension = {
  name: 'italic',
  level: 'inline',
  start(src) { return src.match(/\[italic\]/)?.index },
  tokenizer(src) {
    const openTag = /^\[italic\]/
    const closeTag = /^\[\/italic\]/
    return nestedParser(src, openTag, closeTag, 'italic', this, 'inline')
  },
  renderer(token) {
    const filteredTokens = token.tokens.filter(t => t.type !== 'space');
    const innerContent = this.parser.parseInline(filteredTokens);
    return `<span style="font-style: italic;">${innerContent}</span>`
  }
};


export {
  colorExtension,
  headExtension,
  boldExtension,
  italicExtension
};
