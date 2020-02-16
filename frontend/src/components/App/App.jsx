import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../layouts/Admin';
import { getAuth, getDb } from '../../lib/Firebase';
import { updateUser } from '../../redux/actions/UserActions';
import { updateCourses } from '../../redux/actions/CourseAction';
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
        getDb()
          .collection('users')
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            dispatch(
              updateUser({
                ...snapshot.data(),
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                loggedIn: true,
                phoneNumber: user.phoneNumber,
              }),
            );
          });
      } else {
        dispatch(updateUser(new UserModel()));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    getDb()
      .collection('courses')
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const courses = [];
          snapshot.forEach((doc) => {
            courses.push(doc.data());
          });

          dispatch(updateCourses(courses));
        }
      });
  }, [dispatch]);

  return (
    <div>
      <Modal show={!loggedIn} size="lg">
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
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
