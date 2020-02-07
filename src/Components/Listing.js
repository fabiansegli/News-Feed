import React, { Component } from "react";
import ListItem from "./ListItem";

class Listing extends Component {
  state = {
    values: [],
    searchText: ""
  };
  // a method that, when called, changes the value of this.state.value
  handleChange = e => {
    this.setState({ searchText: e.target.value });
  };

  fetchListings = e => {
    e.preventDefault();
    fetch("http://hn.algolia.com/api/v1/search?query=" + this.state.searchText)
      .then(res => res.json())
      .then(data => {
        this.setState({ values: data.hits });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.fetchListings}>
          <label>
            Search:
            {/* they value of the input is tied to this.state.value so when a user types the handleChange method changes this.state.value to match*/}
            <input
              type="text"
              value={this.state.searchText}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Listings</button>
        </form>
        {this.state.values.map(listing => {
          return <ListItem item={listing} />;
        })}
      </div>
    );
  }
}
export default Listing;
