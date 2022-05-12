import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import "@sweetalert2/theme-dark/dark.css";

export default class AccountMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(evt) {
    this.setState({
      menuAnchor: evt.currentTarget,
    });
  }

  handleClose(evt) {
    this.setState({
      menuAnchor: false,
    });
  }

  render() {
    let { accounts, ui_config } = this.props;

    let pic = <AccountCircle />;
    if (
      accounts &&
      accounts.pic &&
      (accounts.pic.includes("http") || accounts.pic.includes("www"))
    ) {
      pic = <img src={accounts.pic} width="32px" alt="profile-pic"></img>;
    }

    return (
      <div className="AccountMenu">
        <IconButton
          aria-label="more"
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {pic}
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={this.state.menuAnchor}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          keepMounted
          open={Boolean(this.state.menuAnchor)}
          onClose={this.handleClose}
        >
          {(ui_config.custom_button || {}).text ? (
            <div>
              <a
                href={ui_config.custom_button.url}
                target="__blank"
                className="no_decoration_link"
              >
                <MenuItem onClick={this.handleClose}>
                  {ui_config.custom_button.text}
                </MenuItem>
              </a>
            </div>
          ) : null}
          <Divider />
          <a href="{ui_config.request_url}">
            <MenuItem onClick={this.handleClose}>Request</MenuItem>
          </a>
          <a href="{ui_config.report_url}">
            <MenuItem onClick={this.handleClose}>Report</MenuItem>
          </a>
          <Divider />
          <Link to={"/settings"} className="no_decoration_link">
            <MenuItem onClick={this.handleClose}>Administrator</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}
/*
          <Link to={"/logout"} className="no_decoration_link">
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Link>*/
