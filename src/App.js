import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

import Pets from './components/Pets/Pets';
import Owners from './components/Owners/Owners';


function App() {
  return (
    <div className="App">
      <Router>
      <h3> <Link to='/owners'>Owners</Link></h3>
      
      
        <Route exact path = '/' component = {Pets}/>
        <Route path = '/owners' component = {Owners}/>
      </Router>
    </div>
  );
}

export default App;

