import React, { Component } from 'react';
import UsersTable from './UsersTable';
import UserTableFilter from './UserTableFilter';
import PaginationList from '../PaginationList';
import BreadcrumbAdmin from '../BreadcrumbAdmin';

class UserList extends Component {
  render() {
    return (
      <React.Fragment>
        <BreadcrumbAdmin breadcrumbs={['admin', 'users' ]}/>
        <div className="contentInner">
          <h4 className="title is-5">Users</h4>
          <UserTableFilter />
          <UsersTable />
          <PaginationList total={50} current={1}/>
        </div>
      </React.Fragment>
    );
  }
}

export default UserList;