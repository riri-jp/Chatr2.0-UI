import React, { Component } from "react";
import { connect } from "react-redux";

class Message extends Component {
  render() {
    let userFormatter = "#3E4E59";

    var float = "";
    var row = "row";
    var margUser = "ml-3";
    console.log("this user : ", this.props.user.username);
    console.log("this message : ", this.props.message.username);

=======
    let float = "";
    let row = "row";
    let margUser = "ml-3";

    if (this.props.message.username === this.props.user.username) {
      userFormatter = "#3c7a89";
      float = "float-right";
      row = "";
      margUser = "mr-3";
    }
    const message = this.props.message;
    let dateFormat = require("dateformat");

    return (
      <div>
        <div className="container-fluid ">
          <div className={` mb-4 ${row}`} style={{ color: "#3E4E59" }}>
            <h4 className={float}>
              <span
                className="badge badge-pill badge-light  text-uppercase p-2 mr-2 "
                style={{
                  background: `${userFormatter}`,
                  color: "white"
                }}
              >
                <h7 class="slideInUp bounce delay-2s">{message.username}</h7>
              </span>
            </h4>
            <div className={` mt-1 ${margUser} ${float}`}>
              <div
                className="card p-3 bg-light border-0"
                style={{ color: "#3E4E59" }}
              >
                <span>{message.message}</span>
              </div>
              <div
                className={`badge font-weight-light ${float}`}
                style={{ color: "#3E4E59" }}
              >
                {dateFormat(message.timestamp, "mmm dd HH:MM")}
              </div>
            </div>
          </div>
          {this.props.message.username === this.props.user.username && (
            <div className="clearfix">
              <br />{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Message);
