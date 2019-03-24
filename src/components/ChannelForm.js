import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import * as actionCreators from "../store/actions";

class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: ""
    };
    this.submitChannel = this.submitChannel.bind(this);
    this.onTextchange = this.onTextchange.bind(this);
  }

  submitChannel(event) {
    event.preventDefault();
    this.props.CreateChannel(this.state, this.props.history);
  }

  onTextchange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <form onSubmit={this.submitChannel}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Name</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onTextchange}
              />
            </div>


        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Image URL</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            onChange={this.onTextchange}
          />
          <input type="submit" />
        </div>
      </form>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Image URL</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                onChange={this.onTextchange}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    CreateChannel: (newChannel, history) =>
      dispatch(actionCreators.CreateChannel(newChannel, history))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ChannelForm)
);
