import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard.js";

class ARCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t1: "Total Customers",
      t2: "Total Open AR",
      t3: "Average Days Delay",
      t4: "Total Open Invoices",
    };
  }

  groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }

  componentDidMount() {}
  render() {
    return (
      <Grid item xs={12} container style={{ paddingTop: "0" }}>
        <Grid item xs={3} style={{ paddingLeft: "1em", paddingRight: "1em" }}>
          <SimpleCard
            autoid="total-customers-text-collector"
            title={this.state.t1}
            value={this.props.v1}
            alignItems="center"
            direction="row"
          />
        </Grid>
        <Grid item xs={3} style={{ paddingLeft: "1em", paddingRight: "1em" }}>
          <SimpleCard
            autoid="total-open-ar-text-collector"
            title={this.state.t2}
            value={this.props.v2}
            alignItems="center"
            direction="row"
          />
        </Grid>
        <Grid item xs={3} style={{ paddingLeft: "1em", paddingRight: "1em" }}>
          <SimpleCard
            autoid="average-days-delay-text-collector"
            title={this.state.t3}
            value={this.props.v3}
            alignItems="center"
            direction="row"
          />
        </Grid>
        <Grid item xs={3} style={{ paddingLeft: "1em", paddingRight: "1em" }}>
          <SimpleCard
            autoid="total-open-invoice-text-collector"
            title={this.state.t4}
            value={this.props.v4}
            alignItems="center"
            direction="row"
          />
        </Grid>
      </Grid>
    );
  }
}

export default ARCards;
