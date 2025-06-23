import './App.css'

import Header from './components/Header.jsx'
import Editor from './components/Editor.jsx'

function App() {
  return (
    <>
      <div>
        <div className="container has-text-black has-background-white-ter">
          <Header/>
          <div className="section">
            <Editor/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
