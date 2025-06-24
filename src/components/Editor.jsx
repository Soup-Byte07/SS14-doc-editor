import { useState } from 'react'

import Input from './editor/Input.jsx'
import Output from './editor/Output.jsx'



function Editor() {
  const [input, setInput] = useState('I feel [bold]like[/bold] im 4 different people at once');

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  
  return (
    <div className="editor-container">
      <div className="columns is-gapless">
        <div className="column is-half">
          <Input handleChange={handleChange}/>
        </div>
        <div className="column is-half">
          <Output handleInput={input} />
        </div>
      </div>
    </div>
  );
}

export default Editor;
