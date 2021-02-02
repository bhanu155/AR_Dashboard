import React, { Component } from "react";

import SearchBar from "./searchbar.js";
import Grid from "@material-ui/core/Grid";

class SearchArea extends Component {
  state = {};
  render() {
    return (
      <Grid
        container
        spacing={8}
        style={{
          margin: "1em",
          height: "5em",
        }}
      >
        <SearchBar />
      </Grid>
    );
  }
}

export default SearchArea;
