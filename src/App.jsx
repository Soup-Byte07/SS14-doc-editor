import './App.css'


import Header from './components/Header.jsx'
import Editor from './components/Editor.jsx'


function App() {

  return (
    <>
      <div className="container has-background-primary-10">
        <Header/>
        
        <div className="section">

        <Editor/>
        </div>
        
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

      </div>
    </>
  )
}

export default App
