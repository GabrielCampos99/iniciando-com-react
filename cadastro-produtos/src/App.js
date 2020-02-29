import React from 'react';

import Navbar from './components/navbar'
import Rotas from './routes'
import {HashRouter} from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Navbar/>
        <Rotas></Rotas>
      </div>
    </HashRouter>
  );
}

export default App;
