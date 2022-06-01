import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
//import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [
                          {name: 'name1', artist: 'artist1', album: 'album1', id: 1}, 
                          {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
                          {name: 'name3', artist: 'artist3', album: 'album3', id: 3}
                          ],
                  playlistName: 'New Playlist',
                  playlistTracks:
                          [{name: 'playlistname4', artist: 'playlistartist4', album: 'playlistalbum4', id: 4},
                          {name: 'playlistname5', artist: 'playlistartist5', album: 'playlistalbum5', id: 5},
                          {name: 'playlistname6', artist: 'playlistartist6', album: 'playlistalbum6', id: 6}
                          ]
                  }
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack(track){
    let checkID = this.state.playlistTracks;
    if(checkID.find(checkedID => checkedID.id === track.id)){
      return;
    } else {
      checkID.push(track);
      this.setState({playlistTracks: checkID})
    }
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
