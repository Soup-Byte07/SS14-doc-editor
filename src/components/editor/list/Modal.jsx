function Modal({ title, component, isOpen, toggleModal }) {
  if (isOpen == false)  return null

  let modalStatusClass = `modal ${isOpen ? 'is-active' : ''}`
  return (
    <div className={modalStatusClass}>
      <div className="modal-background" onClick={() => toggleModal(false)}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={() => toggleModal(false)}></button>
        </header>
        <section className="modal-card-body">
          {component}
        </section>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => toggleModal(false)}></button>
    </div>
  )
}

export default Modal
