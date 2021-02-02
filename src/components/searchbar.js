import React, { Component } from "react";

// import { fade } from "@material-ui/core/styles/colorManipulator";
// import { withStyles } from "@material-ui/core/styles";
// import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
import searchIcon from "../assets/mag-glass.svg";
import dollar from "../assets/attach_money.svg";
import Grid from "@material-ui/core/Grid";
import { InputBase, Button, Typography } from "@material-ui/core";
import SearchResult from "./searchresult.js";
import Card from "@material-ui/core/Card";
import axios from "axios";
import downArrow from "../assets/arrow-down-sign-to-navigate.svg";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

class SearchBar extends Component {
  state = { name: "", data: [] };
  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  handleSearch = () => {
    this.componentDidMount();
  };
  handleNameChange = () => {
    var name = document.getElementById("searchItem").value;
    this.setState({ name });
  };
  componentDidMount() {
    if (this.state.name === "") {
      // console.log("all");
      axios
        .get("http://localhost:8080/1729025/customerWise?key=", {
          key: this.state.key,
        })
        .then((res) => {
          const customerWiseData = res.data;
          // build required object
          // console.log(customerWiseData);
          this.setState({ data: customerWiseData });
        });
    } else {
      var url =
        'http://localhost:8080/1729025/customerWise?key="' +
        this.state.name +
        '"';
      axios.get(url).then((res) => {
        const customerWiseData = res.data;
        // build required object
        // console.log(customerWiseData);
        this.setState({ data: customerWiseData });
      });
    }
  }
  render() {
    const { open } = this.state;
    return (
      <Card style={{ backgroundColor: "rgb(37, 44, 72)", padding: "1em" }}>
        <Grid>
          <div>
            <div
              style={{
                border: "1px solid skyblue",
                borderRadius: "2em",
                height: "2em",
              }}
            >
              <div>
                <Button
                  autoid="search-icon"
                  size="large"
                  disabled={this.state.name === ""}
                  onClick={this.handleSearch}
                >
                  <img
                    src={searchIcon}
                    alt="search icon"
                    style={{
                      height: "2em",
                      width: "2em",
                      marginLeft: "-2em",
                      marginTop: "-0.5em",
                    }}
                  />
                </Button>
                <InputBase
                  autoid="search-text-field"
                  id="searchItem"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder="Search Customers By Customer Name or Number"
                  style={{
                    color: "grey",
                    position: "absolute",
                    width: "25em",
                    fontSize: "0.8em",
                    marginRight: "1em",
                    marginLeft: "-2em",
                  }}
                />

                <Button
                  autoid="advance-search-drop-down"
                  size="small"
                  // disabled={this.state.name === ""}
                  style={{
                    position: "absolute",
                    marginLeft: "19em",
                    paddingTop: "2px",
                    // paddingLeft: "10em",
                  }}
                  buttonRef={(node) => {
                    this.anchorEl = node;
                  }}
                  aria-owns={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  <img
                    src={dollar}
                    alt="advance search icon"
                    style={{ height: "2em", float: "right" }}
                  />
                  <img
                    src={downArrow}
                    alt="advance search icon"
                    style={{
                      height: "1em",
                      float: "right",
                      fill: "skyblue",
                    }}
                  />
                </Button>
                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          {/* <MenuList>
                            <MenuItem onClick={this.handleClose}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                              Logout
                            </MenuItem>
                          </MenuList> */}
                          <Typography>
                            Render The advance search card here
                          </Typography>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
          </div>
          <SearchResult data={this.state.data} />
        </Grid>
      </Card>
    );
  }
}

export default SearchBar;
