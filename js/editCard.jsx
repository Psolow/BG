import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase.js";
import { string } from "prop-types";
import styled from "styled-components";
import snapshotToArray from "./snapshotToArray";
import ShowCard from "./card";

const CardContainer = styled.ul`
  margin:0 0 0;
  padding:0;
  list-style:none;
`;

const CardStyle = styled.li`
  display:inline;
  margin-right:10px; 
`;

class App extends Component {
  state = {
    items: [],
    searchTerm: ""
  };

  componentDidMount() {
    let newState = [];
    let itemRef = firebase.database().ref("games");
    itemRef.on("value", snapshot => {
      newState = snapshotToArray(snapshot);

      this.setState({
        items: newState
      });
    });
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div className="search">
        <header>
          <h1>Sons of Solow Boardgame</h1>
          <CardContainer>
            <CardStyle><Link to="/add">Tilføj spil</Link></CardStyle>
            <CardStyle>Rediger spil</CardStyle>
            <CardStyle>Se ønske liste</CardStyle>
          </CardContainer>
          <input onChange={this.handleSearchTermChange} value={this.state.searchTerm} type="text" placeholder="search" />
        </header>
        <div>
          {this.state.items
            .filter(item => `${item.title} ${item.players} ${item.size} ${item.complex}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
            .map(item => <ShowCard key={item.key} {...item} />)}
        </div>
      </div>
    );
  }
}

export default App;
