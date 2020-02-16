import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../layouts/Admin';
import { getAuth } from '../../lib/Firebase';
import { updateUser } from '../../redux/actions/UserActions';
import { UserModel } from '../../redux/models/UserModel';
import './App.scss';

const App = () => {
  useEffect(() => {}, []);

  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => {
    return state.userReducer.loggedIn;
  });

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        return false;
      },
    },
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          updateUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            loggedIn: true,
            phoneNumber: user.phoneNumber,
          }),
        );
      } else {
        dispatch(updateUser(new UserModel()));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Modal show={!loggedIn} size="lg">
        <Modal.Title>Login</Modal.Title>
        <Modal.Body>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
        </Modal.Body>
      </Modal>
      <Switch>
        <Route
          path="*"
          render={(props) => {
            return <AdminLayout {...props} />;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
