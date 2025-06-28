import "./Header.css"
function HandleTheme({nextTheme, changeTheme}) {
  


  let change = () => {
    let cycleTheme = window.localStorage.getItem("currentTheme") == 'dark' ? 'light' : 'dark'
    window.localStorage.setItem("currentTheme", cycleTheme)
    document.documentElement.setAttribute('data-theme', cycleTheme)
    changeTheme(cycleTheme)
  }

  return (
    <>
      <button className="button" onClick={change}>
        <span class="icon">
          <i className={`fa-solid fa-${nextTheme == 'dark' ? 'sun' : 'moon'}`}></i>
        </span>
        <span>{nextTheme}</span>
      </button>
    </>
  )
}

function Header({ currentTheme, toggleTheme}) {

  return (
    <>
      <div className="my-3 p-3">
        <div className="buttons is-right">
          <HandleTheme nextTheme={currentTheme} changeTheme={toggleTheme} />
        </div>
        <header className="logo">
          <div className="is-inline-flex">
            <div>
              <img src="/SS14-doc-editor/logo/ss14-doc-editor-logo.png" alt="SS14 Doc Editor Logo" className="is-inline-block"  />
            </div>
            <div className="is-flex-grow-1 is-size-1 is-flex is-align-items-center">
              <p className="is-italic">
                SS14<br/> 
                <span className="has-text-weight-bold">Doc Editor</span><br/>

                <span className="is-size-7">*not affiliated with the Wizden team.</span>
              </p>
            </div>
          </div>
        </header>
      </div>
      <p className="my-3 has-text-centered">A document editor using BBCode-Style for Space Station 14 chuds</p>
    </>
  )
}

export default Header
