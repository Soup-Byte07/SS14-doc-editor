import { marked } from 'marked'
import DOMPurify from 'dompurify'

const colorExtension = {
  name: 'color',
  level: 'inline',
  start: (src) => {
    return src.indexOf('[color=')
  },
  tokenizer: (src) => {
    const openTagRegex = /^\[color=(#[0-9A-Fa-f]{6}|[a-zA-Z]+)\]/
    const closeTagString = '[/color]';

    const openMatch = openTagRegex.exec(src)
    if (!openMatch) return false
    

    const openingTagLength = openMatch[0].length
    const colorValue = openMatch[1]

    let balance = 1
    let content = ''
    let currentPos = openingTagLength
    let closingTagFound = false
    let rawMatchedString = openMatch[0]

    while (currentPos < src.length) {
      const remainingSrc = src.substring(currentPos)
      const nextOpenMatch = remainingSrc.match(openTagRegex)
      const nextCloseIndex = remainingSrc.indexOf(closeTagString)

      let nextTagStart = -1
      if (nextOpenMatch && nextCloseIndex !== -1) {
        nextTagStart = Math.min(nextOpenMatch.index, nextCloseIndex)
      } else if (nextOpenMatch) {
        nextTagStart = nextOpenMatch.index
      } else if (nextCloseIndex !== -1) {
        nextTagStart = nextCloseIndex
      }

    if (nextTagStart === -1) {
        content += remainingSrc
        rawMatchedString += remainingSrc
        currentPos = src.length
        break
      }

      content += remainingSrc.substring(0, nextTagStart)
      rawMatchedString += remainingSrc.substring(0, nextTagStart)
      currentPos += nextTagStart

      if (src.substring(currentPos, currentPos + closeTagString.length) === closeTagString) {
        balance--
        rawMatchedString += closeTagString
        currentPos += closeTagString.length
        if (balance === 0) {
          closingTagFound = true
          break
        }
      } else if (nextOpenMatch && currentPos === nextOpenMatch.index + (src.length - remainingSrc.length)) {
        balance++
        rawMatchedString += nextOpenMatch[0]
        currentPos += nextOpenMatch[0].length
      } else {
        content += src.substring(currentPos, currentPos + 1)
        rawMatchedString += src.substring(currentPos, currentPos + 1)
        currentPos++
      }
    }

    if (!closingTagFound) return false

    return {
      type: 'color',
      raw: rawMatchedString,
      colorValue: colorValue,
      tokens: marked.lexer(content, { gfm: true })
    }

  },
  renderer(token) {
    const safeColor = DOMPurify.sanitize(token.colorValue, { USE_PROFILES: { html: false, svg: false, mathMl: false } });
    let renderedContent = this.parser.parse(token.tokens)
    renderedContent = renderedContent.replace(/^<p>(.*?)<\/p>\n?$/s, '$1');
    return `<span style="color:${safeColor}">${renderedContent}</span>`;
  }
}


const headExtension = {
  name: 'head',
  level: 'inline',
  start(src) { return src.match(/\[head=/) },
  tokenizer(src) {
    const rule = /^\[head=(\d)\]((?:.|\n)*?)\[\/head\]/s;
    const match = rule.exec(src)
    if (match) {
      const level = parseInt(match[1], 10)
      const content = match[2]
      return {
        type: 'head',
        raw: match[0],
        level: Math.min(6, Math.max(1, level)),
        tokens: marked.lexer(content, { gfm: true }) 
      };
    }
    return false;
  },
  renderer(token) {
    const fontSizeMap = {
      1: '2em', 2: '1.5em', 3: '1.17em', 4: '1em', 5: '0.83em', 6: '0.67em',
    };
    const finalFontSize = fontSizeMap[token.level] || '1em';
    const contentHtml = this.parser.parse(token.tokens);
    return `<span style="font-size:${finalFontSize}; font-weight: bold;">${contentHtml}</span>`;
  }
};
export {
  colorExtension,
  headExtension
};
