import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLayout from '../../layouts/Admin';
import { initializeApp } from '../../lib/Firebase';
import './App.scss';

const App = () => {
  initializeApp();

  return (
    <Switch>
      <Route
        path="*"
        render={(props) => {
          return <AdminLayout {...props} />;
        }}
      />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

export default App;
