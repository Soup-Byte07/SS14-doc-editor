import { useState } from 'react'

import './App.css'

import Header from './components/Header.jsx'
import Editor from './components/Editor.jsx'
import Footer from './components/Footer.jsx'

import { useDispatch } from 'react-redux'
import { loadTemplates } from './store/features/templateListStore'

function App() {
  
  const dispatch = useDispatch()
  dispatch(loadTemplates())
  
  let [theme, changeTheme] = useState([window.localStorage.getItem("currentTheme") || 'light'])
  const backgroundThemeClasss = `container  ${theme == 'light' ? "has-background-white-ter" : ""} `
  return (
    <>
      <div>
        <div className={backgroundThemeClasss} >
          <Header currentTheme={theme} toggleTheme={changeTheme}/>
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
