import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { InputBase, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAmount: 0,
      currentDocType: "",
      selected: props.selected,
    };
  }

  componentDidMount() {
    //call API to fetch current values
    const k = this.state.selected[0];
    axios
      .get("http://localhost:8080/1729025/modifyget?key=" + k)
      .then((res) => {
        const data = res.data;
        this.setState({
          currentAmount: data[0].total_open_amount,
          currentDocType: data[0].doctype,
        });
      });
  }

  handleAmountChange = (event) => {
    const newAmount = document.getElementById("openAmount").value;
    if (newAmount) {
      this.setState({ currentAmount: parseFloat(newAmount) });
    }
    //call the api to change data in database
  };
  handleTypeChange = (event) => {
    const newType = document.getElementById("documentType").value;

    if (newType) {
      this.setState({ currentDocType: newType });
    }
    //call the api to change data in database
  };

  render() {
    return (
      <Card style={{ background: "rgb(37, 44, 72)" }}>
        <CardContent />
        <Grid xs={10} style={{ margin: "auto" }}>
          <Typography style={{ color: "floralwhite", fontSize: "1em" }}>
            Modify
          </Typography>
        </Grid>
        <Grid container>
          <div
            style={{
              display: "flex",
              margin: "1em",
              width: "100%",
              borderBottom: "2px solid skyblue",
              padding: "1em",
            }}
          >
            <div style={{ color: "grey", width: "15em" }}>Open Amount ($)</div>
            <div
              style={{
                borderLeft: "1px solid grey",
                paddingLeft: "3em",
                color: "floralwhite",
              }}
            >
              <InputBase
                autoid="open-amount-input"
                id="openAmount"
                type="text"
                onChange={this.handleAmountChange}
                placeholder={this.state.currentAmount.toString()}
                style={{ color: "floralwhite" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "1em",
              width: "100%",
              borderBottom: "2px solid skyblue",
              padding: "1em",
            }}
          >
            <div style={{ color: "grey", width: "15em" }}>Document Type</div>
            <div
              style={{
                borderLeft: "1px solid grey",
                paddingLeft: "3em",
                color: "floralwhite",
              }}
            >
              <InputBase
                autoid="doctype-input"
                id="documentType"
                type="text"
                onChange={this.handleTypeChange}
                placeholder={this.state.currentDocType.toString()}
                style={{ color: "floralwhite" }}
              />
            </div>
          </div>
        </Grid>
        <CardActions
          style={{
            marginTop: "1em",
          }}
        >
          <Button
            autoid="modify-cancel-button"
            size="small"
            onClick={this.props.onClose}
            style={{
              color: "skyblue",
              // backgroundColor: "rgb(27, 31, 56)",
              border: "1px solid skyblue",
              marginRight: "2em",
            }}
          >
            Cancel
          </Button>
          <Button
            autoid="modify-save-button"
            onClick={() => this.props.onSave()}
            size="small"
            style={{
              color: "white",
              backgroundColor: "skyblue",
              border: "1px solid skyblue",
              marginRight: "2em",
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SimpleCard);
