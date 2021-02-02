import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
import { callDummyAPI } from "../services/services";

import ARCards from "../components/arcards.js";
import HeadBar from "../components/headbar.js";
import EnhancedTable from "../components/table.js";
import SearchArea from "../components/searcharea.js";
import Chart from "../components/chart.js";
import axios from "axios";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
  },
  textStyle1: {
    color: "#FFFFFFA6",
    fontSize: "2.5vw",
    marginTop: "2vh",
  },
  textStyle2: {
    color: "#FFFFFFA6",
    fontSize: "1.5vw",
  },
  textfield: {
    color: "#FFFFFFA6",
    fontSize: "1.5vw",
  },
  nameInput: {
    fontSize: "1vw",
    color: "#FFFFFF",
  },
  notchedOutline: { borderWidth: "1px", borderColor: "#5DAAE0 !important" },
  searchBtn: {
    marginTop: "8vh",
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
  searchBtnDisabled: {
    minWidth: "5vw",
    minHeight: "2.188vw",
    fontSize: "0.95vw",
    border: "solid 0.75px #3B617C",
    // marginRight: '0.5rem',
    alignSelf: "center",
    color: "white !important",
    background: "#FFFFFa5",
    "&:hover": {
      cursor: "default",
      backgroundColor: "#FFFFFFa5",
    },
  },
});

class CollectorDashboard extends Component {
  state = {
    name: "",
    response: 0,
    redirect: false,
    loading: false,
    v1: 0,
    v2: 0,
    v3: 0,
    v4: 0,
    filteredPoints: [],
    data: [],
    // };
    // this.handleNameChange = this.handleNameChange.bind(this);
  };
  handleChartFilter = (filteredPoints) => {
    var filter = filteredPoints.filteredPoints;
    // console.log(temp);
    // this.setState({ filteredPoints: temp });
    this.componentDidMount(filter);
  };

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleGetStarted = (e) => {
    callDummyAPI(this.state.name).then((response) => {
      // });
      this.setState({
        response: response.data.name,
        redirect: true,
        loading: false,
      });
    });
  };
  convertToString = (num) => {
    var res = "$ ";

    if (parseInt(num / 1000000000) > 0) {
      let n = parseInt(num / 1000000000);
      let q = " B";
      res = res + n + q;
    } else if (parseInt(num / 1000000) > 0) {
      let n = parseInt(num / 1000000);
      let q = " M";
      res = res + n + q;
    } else if (parseInt(num / 1000) > 0) {
      let n = parseInt(num / 1000);
      let q = " K";
      res = res + n + q;
    } else {
      res = res + parseInt(num);
    }

    return res;
  };
  componentDidMount(filter) {
    axios.get("http://localhost:8080/1729025/invoices").then((res) => {
      const invoices = res.data;

      var cust = new Set();
      var custCount = 0;
      var totalOpen = 0;
      var delaySum = 0;
      var totalOpenCount = 0;

      invoices.forEach((invoice) => {
        if (
          filter == null ||
          filter === undefined ||
          filter.includes(invoice.business_code)
        ) {
          totalOpen += parseFloat(invoice.total_open_amount);
          delaySum += parseInt(invoice.dayspast_due);
          if (invoice.isOpen === 1) {
            totalOpenCount++;
          }
          if (!cust.has(invoice.customer_number)) {
            custCount++;
            cust.add(invoice.customer_number);
          }
        }
      });

      var avgDelay = delaySum / invoices.length;

      this.setState({
        v1: custCount,
        v2: this.convertToString(parseInt(totalOpen)),
        v3: parseInt(avgDelay),
        v4: parseInt(totalOpenCount),
        data: invoices,
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={2} direction="row">
          <HeadBar />
          <ARCards
            filter={this.state.filteredPoints}
            v1={this.state.v1}
            v2={this.state.v2}
            v3={this.state.v3}
            v4={this.state.v4}
          />
          <Grid
            item
            xs={4}
            spacing={2}
            direction="column"
            display="flex"
            flexdirection="column"
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                // spacing={8}
                style={{
                  marginTop: "1em",
                  marginLeft: "1em",
                  marginBottom: "1em",
                  paddingRight: "1em",
                  width: "27.5em",
                }}
              >
                <Chart
                  onFilter={(filteredPoints) =>
                    this.handleChartFilter({ filteredPoints })
                  }
                  data={this.state.data}
                />
              </Grid>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <SearchArea />
            </Grid>
          </Grid>

          <Grid
            item
            xs={8}
            container
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={11} style={{ margin: "1em", paddingRight: "1em" }}>
              <EnhancedTable
                data={this.state.data}
                autoid="invoice-table-collector"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Footer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CollectorDashboard);
