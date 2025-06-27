import { useState } from "react"

function HandleTheme() {
  

  let [theme, changeTheme] = useState([window.localStorage.getItem("currentTheme") || 'light'])

  let change = () => {

    let nextTheme = window.localStorage.getItem("currentTheme") == 'dark' ? 'light' : 'dark'
    window.localStorage.setItem("currentTheme", nextTheme)
    // change the theme via the HTML tag
    document.documentElement.setAttribute('data-theme', nextTheme)
    changeTheme(nextTheme)
  }

  return (
    <>
      <button className="button" onClick={change}>
        {theme}
      </button>
    </>
  )
}

function Header() {

  return (
    <>
      <div className="my-3 p-3">
        <div className="buttons is-right">
          <HandleTheme/>
        </div>
        <header>
          <h1 className="has-text-centered is-size-1">SS14 Doc Editor</h1>
        </header>
      </div>
      <p className="my-3 has-text-centered">A document editor using BBCode-Style for Space Station 14 chuds</p>
    </>
  )
}

export default Header
