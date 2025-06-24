let nestedParser = (src, openTag, closeTag, type, inherit, parseType) => {
  const openMatch = openTag.exec(src);
  if (!openMatch) {
    return undefined;
  }

  const param = openMatch[1];
  let balance = 1;
  let i = openMatch[0].length;
  let content = ''

  while (i < src.length && balance > 0) {
    const remaining = src.substring(i);

    const nestedOpenMatch = openTag.exec(remaining);
    const nestedCloseMatch = closeTag.exec(remaining);

    if (nestedOpenMatch && (!nestedCloseMatch || nestedOpenMatch.index < nestedCloseMatch.index)) {
      balance++;
      content += nestedOpenMatch[0];
      i += nestedOpenMatch[0].length;
    } else if (nestedCloseMatch && (!nestedOpenMatch || nestedCloseMatch.index < nestedOpenMatch.index)) {
      balance--;
      if (balance === 0) {
        i += nestedCloseMatch[0].length;
        break;
      } else {
        content += nestedCloseMatch[0];
        i += nestedCloseMatch[0].length;
      }
    } else {
      content += src[i];
      i++;
    }
  }
  if (balance === 0) {
    let parse = null
        console.log('nestedParser DEBUG: innerContentRaw for lexer:', JSON.stringify(content));

    if(parseType == 'inline') {
      parse = inherit.lexer.inlineTokens(content);
    } else if (parseType == 'block') {

      parse = inherit.lexer.blockTokens(content);
      console.log(parse)
    } else {
      parse = inherit.lexer.tokens(content);
    }

    return {
      type: type,
      raw: src.substring(0, i), 
      param: param,
      tokens: parse,
    };
  }
  return undefined
}

export {
  nestedParser
}
