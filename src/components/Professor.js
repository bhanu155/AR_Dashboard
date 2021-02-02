import React, { Component } from "react";
import Pusher from "pusher-js";
import "../App.css";
import { InputBase, Button, Typography } from "@material-ui/core";
import sendIcon from "../assets/icons8-sent-96.png";
class Professor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: "",
      conversation: [],
    };
  }

  componentDidMount() {
    const pusher = new Pusher("4aabdc951a96b5466a30", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", (data) => {
      const msg = {
        text: data.message,
        user: "ai",
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });
  }

  handleChange = (event) => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: "human",
    };

    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: this.state.userMessage,
      }),
    });

    this.setState({ userMessage: "" });
  };

  render() {
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span
            autoid="human"
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              width: "100%",
              display: "flex",
            }}
          >
            {text}
          </span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div style={{ height: "100%", overflowY: "auto" }}>
        <div
          style={{
            margin: "auto",
            border: "2px solid orange",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgb(37, 44, 72)",
              paddingLeft: "1em",
            }}
          >
            <Typography style={{ color: "skyblue" }}>PROFESSOR</Typography>
            {/*  - X buttons here */}
            <div style={{ float: "right", marginLeft: "8em" }}>
              <Button onClick={this.props.onClose} style={{ color: "skyblue" }}>
                -
              </Button>
              <Button
                autoid="professor-close-button"
                onClick={this.props.onClose}
                style={{ color: "skyblue" }}
              >
                x
              </Button>
            </div>
          </div>

          <div
            autoid="ai"
            style={{
              color: "floralwhite",
              height: "25em",
              overflowY: "auto",
              padding: "20px 40px",
              backgroundColor: "rgb(37, 44, 72)",
            }}
          >
            {chat}
          </div>

          <div
            style={{
              width: "100%",
            }}
          >
            <form onSubmit={this.handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  backgroundColor: "rgb(37, 44, 72)",
                }}
              >
                <div
                  style={{
                    border: "1px solid skyblue",
                    borderRadius: "2em",
                    height: "2em",
                    width: "80%",
                    marginBottom: "1em",
                  }}
                >
                  <InputBase
                    autoid="professor-input-box"
                    style={{ color: "skyblue", paddingLeft: "1em" }}
                    value={this.state.userMessage}
                    onInput={this.handleChange}
                    className="text-input"
                    type="text"
                    autoFocus
                    placeholder="Type here ..."
                  />
                  <Button
                    autoid="professor-send-button"
                    onClick={this.handleSubmit}
                    style={{ padding: "0" }}
                  >
                    <img
                      src={sendIcon}
                      alt="search icon"
                      style={{
                        height: "2em",
                        width: "2em",
                        // float: "right",
                        marginLeft: "4em",
                      }}
                    />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Professor;
