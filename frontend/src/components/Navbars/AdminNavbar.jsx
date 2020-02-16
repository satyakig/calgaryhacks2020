import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import AdminNavbarLinks from './AdminNavbarLinks.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false,
    };
  }

  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true,
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    const node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  }

  render() {
    return (
      <Navbar fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <span>{this.props.brandText}</span>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <AdminNavbarLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
