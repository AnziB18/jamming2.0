import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
//import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [
                            // {name: 'name1', artist: 'artist1', album: 'album1', id: 1}, 
                            // {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
                            // {name: 'name3', artist: 'artist3', album: 'album3', id: 3}
                          ],
                  playlistName: 'New Playlist',
                  playlistTracks:[
                          // [{name: 'playlistname4', artist: 'playlistartist4', album: 'playlistalbum4', id: 4},
                          // {name: 'playlistname5', artist: 'playlistartist5', album: 'playlistalbum5', id: 5},
                          // {name: 'playlistname6', artist: 'playlistartist6', album: 'playlistalbum6', id: 6}
                          ]
                  }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    const checkID = this.state.playlistTracks;
    if(this.state.playlistTracks.find(checkedID => checkedID.id === track.id)){
      return;
    } else {
      checkID.push(track);
      this.setState({playlistTracks: checkID})
    }
  }
  removeTrack(track){
    const newPLaylist = this.state.playlistTracks.filter(checkedID =>  { return track.id !== checkedID.id})
    this.setState({playlistTracks: newPLaylist});
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  savePlaylist(){
    const trackUris= this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []})
    })
    }
  search(term){
    Spotify.search(term).then(searchResults => { // have to chain the promise from Spotify module
      return this.setState({searchResults: searchResults})
      })
  }
  render(){
    Spotify.getAccessToken(); // this pretends the app to re-render, because it initialize the accesToken for first render too
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
          <SearchResults  searchResults={this.state.searchResults} 
                          onAdd={this.addTrack}
                            />
            <Playlist playlistName = {this.state.playlistName} 
                      playlistTracks = {this.state.playlistTracks}
                      onRemove = {this.removeTrack}
                      onNameChange = {this.updatePlaylistName}
                      onSave = {this.savePlaylist}
                      />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
