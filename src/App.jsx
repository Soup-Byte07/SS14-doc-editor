import './App.css'

import Header from './components/Header.jsx'
import Editor from './components/Editor.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <div>
        <div className="container ">
          <Header/>
          <div className="section">
            <Editor/>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App
