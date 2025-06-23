import { useState } from 'react';
import EditorHeader from './EditorHeader.jsx'

function Input() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="input-container">
      <EditorHeader
        title="Input Editor"
        onSave={() => console.log('Save clicked')}
        onClose={() => console.log('Close clicked')}
      />
      <p className="is-size-5">Type your text below:</p>
      <textarea
        type="text"
        value={text}
        onChange={handleChange}
        className="textarea is-primary"
        placeholder="Type something..."
      ></textarea>
      <p className="is-size-5 mt-2">You typed: {text}</p>
    </div>
  );
}

export default Input;
