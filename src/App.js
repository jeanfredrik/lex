import React from 'react'
import Main from './containers/Main'

const App = () => (
  <div className="flex flex-column height-100">
    <div className="flex-none bg-black white px1 py1 flex items-baseline">
      <div className="flex-auto px1">
        <span className="uppercase bold h3">Lex</span>
        <span className="opacity-50 pl1">
          – Test-drive your phonotactics
        </span>
      </div>
      <div className="flex-none px1">
        <a
          href={process.env.REACT_APP_RELEASE_LIST}
          className="color-inherit opacity-50 no-underline hover-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {process.env.REACT_APP_VERSION}
        </a>
      </div>
    </div>
    <Main />
  </div>
)

export default App
