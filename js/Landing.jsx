import React, { Component } from "react";
import firebase from "./firebase";
import snapshotToArray from "./snapshotToArray";

class App extends Component {
  state = {
    title: "",
    players: "",
    size: "",
    deck: "",
    items: []
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
      deck: this.state.deck
    };
    itemsRef.push(item);

    this.setState({
      title: "",
      players: "",
      size: "",
      deck: ""
    });
  };

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Sons of Solow Boardgame</h1>

          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" placeholder="Name of game?" onChange={this.handleChange} value={this.state.title} />
              <label htmlFor="players">Number of players</label>
              <input type="text" name="players" placeholder="Number of players?" onChange={this.handleChange} value={this.state.players} />
              <label htmlFor="size">Box / game size</label>
              <select name="size" onChange={this.handleChange} value={this.state.size}>
                <option value="small" defaultValue>Choose size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Xlarge</option>
              </select>
              <h3>Mechanics</h3>
              <label htmlFor="deck">
                Devkbuilding
                <input name="deck" type="checkbox" checked={this.state.deck} onChange={this.handleChange} />
              </label>
              <button>Add Item</button>
            </form>
          </section>

          <section className="display-item">
            <div className="wrapper">
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li key={item.key}>
                      <h3>{item.title}</h3>
                      <p>Players: {item.players}</p>
                      <p>Size: {item.size}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
