import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.props.match.url.substring(1) === "signup") {
      this.props.signup(this.state, this.props.history);
    } else {
      this.props.login(this.state, this.props.history);
    }
  };

  render() {
    const type = this.props.match.url.substring(1);
    return (
      <h1 class="animated zoomIn	 bounce delay-2s fast-800ms">
        <div className="card col-6 mx-auto p-0 mt-5">
          <div className="card-body">
            <h5 className="card-title mb-4">
              {type === "login"
                ? "Login to send messages"
                : "Register an account"}
            </h5>
            <h1 class="animated zoomInUp	 bounce delay-2s fast-800ms">
              <form onSubmit={this.submitHandler}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.changeHandler}
                  />
                </div>

                <input
                  className="btn btn-primary"
                  type="submit"
                  value={type.replace(/^\w/, c => c.toUpperCase())}
                />
              </form>
            </h1>
          </div>
          <div className="card-footer">
            {" "}
            <Link
              to={type === "login" ? "/signup" : "/login"}
              className="btn btn-small btn-link"
            >
              {type === "login"
                ? "register an account"
                : "login with an existing account"}
            </Link>
          </div>
        </div>{" "}
      </h1>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (userData, history) =>
      dispatch(actionCreators.signup(userData, history)),
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegistationForm);
