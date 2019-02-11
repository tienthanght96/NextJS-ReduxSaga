import React, { Component } from 'react';
import LayoutAdmin from '../../../src/admin/components/LayoutAdmin';
import UserList from '../../../src/admin/components/users/UserList';

class IndexAdminUsers extends Component {
  render() {
    return (
      <LayoutAdmin>
        {props => <UserList {...props}/>}
      </LayoutAdmin>
    );
  }
}

export default IndexAdminUsers;