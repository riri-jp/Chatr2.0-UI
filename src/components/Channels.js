import React, { Component } from "react";
import { connect } from "react-redux";
import Message from "./Message";
import MessageForm from "./MessageForm";
import Loading from "./Loading";

// Actions
import * as actionCreators from "../store/actions";

class Channel extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.match.params.channelID !== undefined)
        this.props.fetchMessages(this.props.match.params.channelID);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.channelID !== undefined) {
      if (
        this.props.match.params.channelID !== prevProps.match.params.channelID
      ) {
        this.props.changeLoading();
        this.props.fetchMessages(this.props.match.params.channelID);
      } else {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.props.fetchMessages(this.props.match.params.channelID);
        }, 1000);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      let messageList = [];
      if (this.props.match.params.channelID)
        messageList = this.props.messages.map(msg => (
          <Message key={msg.id + msg.username} message={msg} />
        ));
      return (
        <div
          style={{ maxWidth: 680 }}
          className="container shadow-lg p-3 mb-5 bg-white rounded"
        >
          <div
            className="container p-3  "
            style={{ overflowY: "auto", width: "auto", height: "330px" }}
          >
            {messageList}
          </div>
          {this.props.match.params.channelID && (
            <MessageForm channelID={this.props.match.params.channelID} />
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID =>
      dispatch(actionCreators.fetchMessages(channelID)),
    changeLoading: () => dispatch(actionCreators.setLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
