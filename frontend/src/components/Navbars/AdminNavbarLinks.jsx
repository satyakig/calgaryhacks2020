import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { getAuth } from '../../lib/Firebase';

const AdminNavbarLinks = () => {
  function logout() {
    getAuth()
      .signOut()
      .then();
  }

  return (
    <div>
      <Nav pullRight>
        <Button onClick={logout}>Logout</Button>
      </Nav>
    </div>
  );
};

export default AdminNavbarLinks;
