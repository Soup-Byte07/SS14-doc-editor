import { useState } from 'react';

function Info() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="section pt-5 pb-5">
      <div className="container">
        <div className="notification is-info is-light">
          <button 
            className="delete"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          ></button>
          <div className="content">
            <h3 className="title is-5">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-info-circle"></i>
                </span>
                <span>SS14 Document Editor - How It Works</span>
              </span>
            </h3>
            
            {isExpanded ? (
              <>
                <p>
                  This is a web-based editor for creating and formatting documents for Space Station 14 (SS14). 
                  It provides a real-time preview of your formatted text using SS14's BBCode-style markup system.
                </p>

                <h4 className="subtitle is-6 mt-4">Features:</h4>
                <ul>
                  <li><strong>Live Preview:</strong> See your formatted text update in real-time as you type</li>
                  <li><strong>Template Management:</strong> Save, load, and manage multiple document templates</li>
                  <li><strong>Local Storage:</strong> All templates are saved locally in your browser</li>
                  <li><strong>Dark/Light Theme:</strong> Toggle between themes using the button in the header</li>
                  <li><strong>Export Options:</strong> Copy formatted output or download as files</li>
                </ul>

                <h4 className="subtitle is-6 mt-4">Supported Formatting Tags:</h4>
                <ul>
                  <li><code>[bold]text[/bold]</code> - <strong>Bold text</strong></li>
                  <li><code>[italic]text[/italic]</code> - <em>Italic text</em></li>
                  <li><code>[bolditalic]text[/bolditalic]</code> - <strong><em>Bold italic text</em></strong></li>
                  <li><code>[color=#FF0000]text[/color]</code> - Colored text (supports hex and named colors)</li>
                  <li><code>[head=1]text[/head]</code> - Headers (sizes 1-6)</li>
                  <li><code>[bullet/]</code> - Bullet point (•)</li>
                </ul>

                <h4 className="subtitle is-6 mt-4">How to Use:</h4>
                <ol>
                  <li>Type or paste your text with formatting tags in the input editor on the left</li>
                  <li>View the formatted result in the output preview on the right</li>
                  <li>Save your work as a template using the "Save" button</li>
                  <li>Load saved templates from the dropdown menu</li>
                  <li>Clear the editor with the "Clear" button to start fresh</li>
                </ol>

                <h4 className="subtitle is-6 mt-4">Tips:</h4>
                <ul>
                  <li>Tags can be nested for combined effects</li>
                  <li>Line breaks are preserved in the output</li>
                  <li>All content is sanitized for security</li>
                  <li>Templates are stored locally - clearing browser data will remove them</li>
                </ul>


                <a onClick={(e) => { e.preventDefault(); setIsExpanded(!isExpanded) }} aria-label={isExpanded ? "Collapse" : "Expand"} href="#">Close Info</a>
              </>
            ) : (
              <p>
                Welcome to the SS14 Document Editor! This tool helps you create formatted documents for Space Station 14 using BBCode-style markup. 
                 <a onClick={(e) => { e.preventDefault(); setIsExpanded(!isExpanded) }} aria-label={isExpanded ? "Collapse" : "Expand"} href="#"> Click here</a> learn more about how it works.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info
