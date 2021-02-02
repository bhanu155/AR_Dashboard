import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import companyLogo from "../assets/companyLogo.svg";
import ProfessorHead from "../components/professorhead.js";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Toolbar
          style={{
            // marginTop: "1em",
            // marginLeft: "1em",
            // marginRight: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "inherit",
            height: "80%",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Typography
              color="white"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={companyLogo}
                alt="company logo"
                style={{ height: "2.5em" }}
              />
              <span
                style={{
                  height: "2em",
                  color: "white",
                  paddingTop: "1em",
                  marginLeft: "1em",
                }}
              >
                ABC Products
              </span>
            </Typography>
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#e77f00",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "2rem",
                width: "15rem",
              }}
            >
              Receivables Dashboard
            </Button>
            <ProfessorHead />
          </div>
        </Toolbar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
