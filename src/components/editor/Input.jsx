import EditorHeader from './EditorHeader.jsx'

function Input({handleChange}) {
  return (
    <div className="input-container">
      <article className="panel">
        <EditorHeader
          title="Input Editor"
          onSave={() => console.log('Save clicked')}
          onClose={() => console.log('Close clicked')}
        />
        <div className="panel-block">
          <textarea
            type="text"
            onChange={handleChange}
            rows="23"
            className="textarea is-primary"
            placeholder="Type something..."
          ></textarea>         
        </div>

      </article>
    </div>
  );
}

export default Input;
