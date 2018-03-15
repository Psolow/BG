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

const AddItemContainer = styled.div`
  z-index: 10;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: #fafafa;
  padding: 8px 30px;
  text-align:left;
`;

const FormDiv = styled.div`
  display:inline-block;
  text-align:left;
  margin:0 10px;
`;

const FormLabel = styled.label`
  display:block;
`;

class App extends Component {
  state = {
    title: "",
    players: "",
    size: "",
    complex: "",
    searchTerm: "",
    items: []
  };

  reverse = event => {
    this.setState({
      items: this.state.items.reverse()
    });
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const itemsRef = firebase.database().ref("games");
    const item = {
      title: this.state.title,
      players: this.state.players,
      size: this.state.size,
      complex: this.state.complex
    };
    itemsRef.push(item);

    this.setState({
      title: "",
      players: "",
      size: "",
      complex: ""
    });
  };

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
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
          <button onClick={this.reverse}>Reverse</button>
        </header>
        <div>
          {this.state.items
            .filter(item => `${item.title} ${item.players} ${item.size} ${item.complex}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
            .map(item => <ShowCard key={item.key} {...item} />)}
        </div>
        <AddItemContainer>
          <form onSubmit={this.handleSubmit}>
            <FormDiv>
              <FormLabel htmlFor="title">Title</FormLabel>
              <input type="text" name="title" placeholder="Name of game?" onChange={this.handleChange} value={this.state.title} />
            </FormDiv>
            <FormDiv>
              <FormLabel htmlFor="players">Number of players</FormLabel>
              <input type="text" name="players" placeholder="Number of players?" onChange={this.handleChange} value={this.state.players} />
            </FormDiv>
            <FormDiv>
              <FormLabel htmlFor="size">Box / game size</FormLabel>
              <select name="size" onChange={this.handleChange} value={this.state.size}>
                <option value="small" defaultValue>Choose size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Xlarge</option>
              </select>
            </FormDiv>
            <FormDiv>
              <FormLabel htmlFor="complex">Box / game size</FormLabel>
              <select name="complex" onChange={this.handleChange} value={this.state.complex}>
                <option value=" " defaultValue>Choose complexity</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Xpert">Xpert</option>
              </select>
            </FormDiv>
            <FormDiv>
              <button>Add Item</button>
            </FormDiv>
          </form>
        </AddItemContainer>
      </div>
    );
  }
}

export default App;
