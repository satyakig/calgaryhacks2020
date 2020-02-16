import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Card } from '../components/Card/Card.jsx';
import { FormInputs } from '../components/FormInputs/FormInputs.jsx';
import { UserCard } from '../components/UserCard/UserCard.jsx';
import Button from '../components/CustomButton/CustomButton.jsx';
import { getDb } from '../lib/Firebase';

const UserProfile = () => {
  const user = useSelector((state) => {
    return state.userReducer;
  });

  const [about, setAbout] = useState('');

  function onClick() {
    if (about && user.loggedIn) {
      getDb()
        .collection('users')
        .doc(user.uid)
        .update({
          about,
        });
    }
  }

  useEffect(() => {
    window.setInterval(() => {
      const el = document.getElementById('formControlsTextarea');
      if (el) {
        setAbout(el.value);
      }
    }, 200);
  }, []);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={8}>
            <Card
              content={
                <form>
                  <FormInputs
                    ncols={['col-md-8']}
                    properties={[
                      {
                        label: 'Email address',
                        type: 'email',
                        bsClass: 'form-control',
                        placeholder: 'Email',
                        defaultValue: user.email !== null ? user.email : '',
                        disabled: user.email !== null,
                      },
                    ]}
                  />
                  <FormInputs
                    ncols={['col-md-8']}
                    properties={[
                      {
                        label: 'Name',
                        type: 'text',
                        bsClass: 'form-control',
                        placeholder: 'Name',
                        defaultValue: user.name !== null ? user.name : '',
                        disabled: user.name !== null,
                      },
                    ]}
                  />

                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <ControlLabel>About Me</ControlLabel>
                        <FormControl
                          rows="5"
                          componentClass="textarea"
                          bsClass="form-control"
                          placeholder="Here can be your description"
                          defaultValue=""
                          id="formControlsTextarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button bsStyle="info" pullRight fill type="button" onClick={onClick}>
                    Update Profile
                  </Button>
                  <div className="clearfix" />
                </form>
              }
            />
          </Col>
          <Col md={4}>
            <UserCard
              bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
              avatar={user.avatarUrl}
              name={user.name}
              userName={user.email.toLowerCase().split('@')[0]}
              description={
                <span style={{ fontStyle: 'italic' }}>{user.about ? `"${user.about}"` : ''}</span>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default UserProfile;
