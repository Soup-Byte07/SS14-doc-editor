const parseNestedTags = (text) => {
  if (!text) return '';

  const tagDefinitions = {
    color: {
      pattern: /\[color=(#[0-9A-Fa-f]{3,6}|[a-zA-Z]+)\]/,
      closePattern: /\[\/color\]/,
      render: (param, content) => `<span style="color: ${param}; white-space: pre-wrap;">${content}</span>`
    },
    head: {
      pattern: /\[head=(\d)\]/,
      closePattern: /\[\/head\]/,
      render: (param, content) => {
        const fontSizeMap = {
          1: '2em', 2: '1.5em', 3: '1.17em', 4: '1em', 5: '0.83em', 6: '0.67em',
        };
        const fontSize = fontSizeMap[param] || '1em';
        return `<span style="font-size:${fontSize}; font-weight: bold;">${content}</span>`;
      }
    },
    bold: {
      pattern: /\[bold\]/,
      closePattern: /\[\/bold\]/,
      render: (param, content) => `<span style="font-weight:bold">${content}</span>`
    },
    italic: {
      pattern: /\[italic\]/,
      closePattern: /\[\/italic\]/,
      render: (param, content) => `<span style="font-style: italic;">${content}</span>`
    },
    bolditalic: {
      pattern: /\[bolditalic\]/,
      closePattern: /\[\/bolditalic\]/,
      render: (param, content) => `<span style="font-weight: bold; font-style: italic;">${content}</span>`
    }
  };

  const parseRecursive = (input) => {
    let result = input;
    let changed = true;

    while (changed) {
      changed = false;
      
      for (const [tagName, tagDef] of Object.entries(tagDefinitions)) {
        const openMatch = tagDef.pattern.exec(result);
        if (!openMatch) continue;

        const openTag = openMatch[0];
        const param = openMatch[1] || null;
        const openIndex = openMatch.index;
        
        let searchStart = openIndex + openTag.length;
        let balance = 1;
        let closeIndex = -1;
        
        while (balance > 0 && searchStart < result.length) {
          const remainingText = result.substring(searchStart);
          const nextOpen = tagDef.pattern.exec(remainingText);
          const nextClose = tagDef.closePattern.exec(remainingText);
          if (nextClose && (!nextOpen || nextClose.index < nextOpen.index)) {
            balance--;
            if (balance === 0) {
              closeIndex = searchStart + nextClose.index;
              break;
            }
            searchStart += nextClose.index + nextClose[0].length;
          } else if (nextOpen) {
            balance++;
            searchStart += nextOpen.index + nextOpen[0].length;
          } else {
            break;
          }
        }
        
        if (closeIndex !== -1) {
          const innerContent = result.substring(openIndex + openTag.length, closeIndex);
          const parsedInner = parseRecursive(innerContent);
          
          const closeTag = tagDef.closePattern.exec(result.substring(closeIndex))[0];
          const replacement = tagDef.render(param, parsedInner);
          
          result = result.substring(0, openIndex) + replacement + 
                  result.substring(closeIndex + closeTag.length);
          changed = true;
          break; 
        }
      }
    }
    
    return result;
  };

  const handleSelfClosingTags = (input) => {
    let result = input;
    
    const selfClosingTags = {
      bullet: {
        pattern: /\[bullet\/\]/g,
        render: () => '<span style="font-weight: bold;">• </span>'
      }
    };
    
    for (const [tagName, tagDef] of Object.entries(selfClosingTags)) {
      result = result.replace(tagDef.pattern, tagDef.render);
    }
    
    return result;
  };

  let parsed = handleSelfClosingTags(text);
  parsed = parseRecursive(parsed);
  parsed = parsed.replace(/\n/g, '<br>');
  
  return parsed;
};

export { parseNestedTags as simpleParser };
