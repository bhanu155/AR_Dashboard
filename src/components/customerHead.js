import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import backIcon from "../assets/left-arrow.svg";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import ProfessorHead from "../components/professorhead.js";
import { Button } from "@material-ui/core";

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

class CustomerHead extends Component {
  render() {
    return (
      <div>
        <Toolbar
          style={{
            marginTop: "1em",
            marginLeft: "1em",
            marginRight: "1em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "space-between",
          }}
        >
          <Typography
            color="white"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to={"/"} autoid="navigation-back-button">
              <img
                src={backIcon}
                alt="company logo"
                style={{
                  position: "absolute",
                  marginTop: "-2em",
                  height: "2em",
                  filter: "invert(1.0) ",
                }}
              />
            </Link>

            <Card style={{ background: "inherit", boxShadow: "0 0 0 0" }}>
              <CardContent>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <Typography>
                    <span
                      autoid="customer-name"
                      style={{
                        fontSize: "2em",
                        color: "white",
                        paddingTop: "1em",
                        marginLeft: "1em",
                        marginBottom: "3px",
                        textTransform: "capitalize",
                      }}
                    >
                      {this.props.name}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <Typography>
                    <span
                      autoid="customer-number"
                      style={{
                        fontSize: "1em",
                        color: "grey",
                        paddingTop: "1em",
                        marginLeft: "2em",
                      }}
                    >
                      {this.props.number}
                    </span>
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Typography>
          <div style={{ position: "absolute", paddingLeft: "65em" }}>
            <ProfessorHead />
          </div>
        </Toolbar>
      </div>
    );
  }
}

// export default CustomerHead;

CustomerHead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerHead);
