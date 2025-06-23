import Input from './editor/Input.jsx'
import Output from './editor/Output.jsx'

function Editor() {
  return (
    <div className="editor-container">
      <div className="columns is-gapless">
        <div className="column is-half">
          <Input />
        </div>
        <div className="column is-half">
          <Output />
        </div>
      </div>
    </div>
  );
}

export default Editor;
