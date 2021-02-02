import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import professorLogo from "../assets/voiceIcon.svg";
import Modal from "@material-ui/core/Modal";
import Professor from "../components/Professor.js";
import Typography from "@material-ui/core/Typography";

class ProfessorHead extends Component {
  state = { open: false };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          float: "right",
        }}
      >
        <Button
          autoid="professor-button"
          color="inherit"
          style={{
            backgroundColor: "darkorange",
            borderRadius: "2em",
            paddingRight: "0",
            height: "2.5em",
          }}
          onClick={this.handleOpen}
        >
          <Typography>PROFESSOR</Typography>
          <img
            src={professorLogo}
            style={{
              float: "right",
              background: "orange",
              borderRadius: "2em",
              height: "2.5em",
            }}
            alt="chatbot"
          />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={{
              background: "white",
              width: "30%",
              marginTop: "5%",
              marginLeft: "70%",
            }}
          >
            {/* <Typography variant="h6" id="modal-title">
                Text in a modal
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula.
              </Typography> */}
            <Professor onClose={() => this.handleClose()} />
          </div>
        </Modal>{" "}
      </div>
    );
  }
}

export default ProfessorHead;
