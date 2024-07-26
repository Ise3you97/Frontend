import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import React from 'react';
import Navigation from './components/Navigation';
import CreateUser from './components/CreateUser';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';

function App() {
  return (
    <Router>
      <Navigation />
      <div className='container'>
      <Routes>
        <Route path='/' Component={NotesList}></Route>
        <Route path='/edit/:id' Component={CreateNote}/>
        <Route path='/create' Component={CreateNote}></Route>
        <Route path='/user' Component={CreateUser}></Route>
      </Routes>
      </div>
    </Router>
    

);
}

export default App;
