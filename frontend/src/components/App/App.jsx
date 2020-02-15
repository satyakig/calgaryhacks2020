import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLayout from 'layouts/Admin';
import { initializeApp } from 'lib/Firebase';
import './App.scss';

const App = () => {
  useEffect(() => {
    // Initialize the firebase app
    initializeApp();
  }, []);

  return (
    <Switch>
      <Route
        path="/admin"
        render={(props) => {
          return <AdminLayout {...props} />;
        }}
      />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  );
};

export default App;
