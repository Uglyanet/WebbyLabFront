import React, { useState } from 'react';
import './scss/style.scss'
import ControlForm from './components/ControlForm/ControlForm';
import ListOfFilms from './components/ListOfFilms/ListOfFilms';

function App() {

  const [films, setFilms] = useState([]);
  const [searchLine, setSearchLine] = useState('')
  const [radio, setRadio] = useState("title")
  const [forceRerender, setForceRerender] = useState(true);

  const sorting = (dir) => {
    setFilms(films.sort(function (a, b) {
      if (a.title.substr(0, 1).toLowerCase() > b.title.substr(0, 1).toLowerCase()) {
        return dir === 1 ? 1 : -1;
      }
      if (a.title.substr(0, 1).toLowerCase() < b.title.substr(0, 1).toLowerCase()) {
        return dir === 1 ? -1 : 1;
      }
      return 0;
    }
    ));
    setForceRerender(!forceRerender);
    console.log(films);
  }

  return (
    <div className="App">
      <ControlForm films = {films} sorting={sorting} searchLine={searchLine} setSearchLine={setSearchLine} radio={radio} setRadio={setRadio} forceRerender={forceRerender} setForceRerender={setForceRerender}/>
      <ListOfFilms films={films} setFilms={setFilms} forceRerender={forceRerender} setForceRerender={setForceRerender} searchLine={searchLine} radio={radio}/>
    </div>
  );
}

export default App;
