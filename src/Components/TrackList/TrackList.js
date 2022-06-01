import React from "react";
import './TrackList.css';
import Track from '../Track/Track';
class TrackList extends React.Component {
    render(){
        return (
            <div className="TrackList">
                {this.props.tracks.map((track) =>
                <Track  track={track} 
                        key={track.id} 
                        album={track.album} 
                        artist = {track.artist}
                        onAdd = {this.props.onAdd}
                        />
                )}
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
            </div>
        )
    }
}
export default TrackList;