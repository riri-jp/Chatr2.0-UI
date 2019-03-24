import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import * as actionCreators from "../../store/actions";
import SearchBar from "../SearchBar";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  state = { collapsed: false };

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchChannels();
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.user !== this.props.user) {
      if (this.props.user) {
        this.props.fetchChannels();
      }
    }
  }

  render() {
    // Instead of the array below put this.props.channels that comes form the channels reducer
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));

    // const { open } = this.state;

    const { collapsed } = this.state;

    if (!this.props.user) {
      return null;
    } else {
      return (
        <div>
          <ul
            className="navbar-nav navbar-sidenav"
            id="exampleAccordion"
            style={{ overflowY: "scroll" }}
          >
            <li
              className="nav-item "
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link className="nav-link heading" to="/createChannel">
                <span className="nav-link-text mr-2">Create Channel</span>
                <FontAwesomeIcon icon={faPlusCircle} />
              </Link>
              {/* <SearchBar /> */}
            </li>

            {channelLinks}
          </ul>
          {/* <ul className="navbar-nav sidenav-toggler">
            <li className="nav-item">
              <span
                className="nav-link text-center"
                id="sidenavToggler"
                onClick={() =>
                  this.setState({
                    collapsed: !collapsed
                  })
                }
              >
                <FontAwesomeIcon
                  icon={collapsed ? faAngleRight : faAngleLeft}
                />
              </span>
            </li>
          </ul> */}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(actionCreators.fetchChannels())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
