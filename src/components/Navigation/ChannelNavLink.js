import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink className="nav-link" to={`/channels/${channel.id}`}>
          <img
            src={
              channel.image_url
                ? channel.image_url
                : "https://cdn.worldvectorlogo.com/logos/hipchat.svg"
            }
            alt={channel.name}
            width="42"
            height="42"
            border="5"
          />
          <span className="nav-link-text"> {channel.name}</span>
        </NavLink>
      </li>
    );
  }
}

export default ChannelNavLink;
