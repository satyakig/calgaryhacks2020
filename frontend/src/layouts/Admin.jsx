import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import routes from '../routes.js';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'black',
      hasImage: true,
    };
  }

  getRoutes = (r) => {
    return r.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          render={(props) => {
            return <prop.component {...props} />;
          }}
          key={key}
        />
      );
    });
  };

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }

    return 'Brand';
  };

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
        />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
