import React from 'react';
import Main from './containers/Main';

const App = () => (
  <div className="flex flex-column height-100">
    <div className="flex-none bg-black white px2 py1">
      <span className="uppercase bold h3">Lex</span>
      <span className="opacity-50 pl1">– Test-drive your phonotactics</span>
    </div>
    <Main />
  </div>
);

export default App;
