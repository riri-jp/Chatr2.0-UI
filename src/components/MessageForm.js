import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler(e) {
    e.preventDefault();

    this.props.postMessage(this.props.channelID, this.state);

    this.setState({ message: "" });
  }
  render() {
    return (
      <div className="container my-5 mb-5 " style={{ width: "auto" }}>
        <form className="form-inline" onSubmit={this.submitHandler} noValidate>
          <div className="form-row col  my-2">
            <input
              className="form-control col"
              type="text"
              placeholder="Message..."
              name="message"
              required
              value={this.state.message}
              onChange={this.changeHandler}
            />
          </div>
          <input className="btn " type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  postMessage: (channelID, message) =>
    dispatch(actionCreators.postMessage(channelID, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
