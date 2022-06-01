import React from "react";
import Track from "../Track/Track";
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {term: []}
        this.search = this.search.bind(this);
    }
    search(term){
        this.props.onSearch(term);
    }
    handleTermChange(e){
        const changeTerm = e.target.value;
        this.setState({term: changeTerm})
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange}/>
                <button className="SearchButton" onClick = {this.search}>SEARCH</button>
            </div> 
        )
    }
}
export default SearchBar;