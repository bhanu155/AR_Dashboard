import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

import EnhancedTable from "../components/customertable.js";
import CustomerHead from "../components/customerHead.js";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
  },
  hellotext: {
    fontSize: "4vw",
    color: "#FFFFFFA6",
    height: "10vh",
  },
  hellotext1: {
    fontSize: "2.5vw",
    marginTop: "5vh",
    padding: "1vh",
    color: "#FFFFFF",
    backgroundColor: "#5DAAE0",
  },
  hellotext3: {
    fontSize: "1vw",
    marginTop: "5vh",
    padding: "0.5vh",
    color: "#FFFFFF",
    backgroundColor: "#5DAAE0",
  },
  hellotext2: {
    fontSize: "1.2vw",
    marginTop: "5vh",
    padding: "1vh",
    color: "#FFFFFF",
    backgroundColor: "#5DAAE0",
  },
  hellotext4: {
    fontSize: "1.5vw",
    marginTop: "2vh",
    padding: "1vh",
    color: "#FFFFFF",
  },
  searchBtn: {
    marginTop: "2vh",
    minWidth: "5vw",
    minHeight: "2.188vw",
    fontSize: "0.95vw",
    border: "solid 0.75px #3B617C",
    // marginRight: '0.5rem',
    alignSelf: "center",
    color: "#5DAAE0",
    "&:hover": {
      backgroundColor: "#5daae0",
      color: "white",
    },
  },
});

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: 0,
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        'http://localhost:8080/1729025/customerDetails?key="' +
          this.props.match.params.id +
          '"'
      )
      .then((res) => {
        const number = this.props.match.params.id;
        const data = res.data;
        const name = res.data[0].customer_name;
        this.setState({ number, name, data });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2} xs={12}>
        <Grid container style={{ height: "95vh" }} justify="center">
          <Grid
            item
            //style={{height:'40vh',width:'60vh',backgroundColor:'#252C48'}}
            // alignItems="center"
            // direction="column"
            container
          >
            <CustomerHead number={this.state.number} name={this.state.name} />
          </Grid>

          <Grid
            item
            //style={{height:'40vh',width:'60vh',backgroundColor:'#252C48'}}
            alignItems="center"
            direction="column"
            container
            style={{ padding: "1em", textAlign: "center" }}
          >
            {/* {console.log("id in url : ", this.props.match.params.id)}
            {console.log("id in state : ", this.state.number)} */}

            <EnhancedTable />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomerDetails);
