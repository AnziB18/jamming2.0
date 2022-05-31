import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
//import { render } from '@testing-library/react';

class App extends React.Component {
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            {/* <!-- Add a Playlist component --> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
