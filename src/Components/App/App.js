//import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [
        
      ],
      playlistName: "New playlist",
      playlistTracks: [
        
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    let result = tracks.every((currentTrack) => currentTrack.id !== track.id);
    console.log(result);
    if (result) {
      tracks.push(track);

      this.setState({ playlistTracks: tracks });
    } else {
      alert("Song is already on your playlist");
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    console.log(tracks);
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
    console.log(tracks);
    //this.setState({ playlistTracks: result });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
    //this.setState({ playlistName: "new playlist", playlistTracks: [] });
  }

  search(term) {
    console.log(this.state.searchResults);
    Spotify.search(term).then((Results) => {
      this.setState({ SearchResults: Results });
    });
    console.log(this.state.searchResults);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.SearchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              isRemoval={false}
            />
            <Playlist
              playlistName={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              isRemoval={true}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
