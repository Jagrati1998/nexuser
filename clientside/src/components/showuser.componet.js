import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserList from './userlist.componet';

export default class ShowUser extends Component {
  state = 
   {
     users: []
   }

   componentDidMount()
    {
    axios.get('http://localhost:4000/users/')
    .then(res => { this.setState({users: res.data });
     })
     .catch((error) => {
      console.log(error);
    })
    }
    DataTable()
    {
      return this.state.users.map((res, i) => {
      return <UserList obj={res} key={i} />;
    });
  }
 render() {
      return (
      <div className="table-wrapper-showuser">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
          {this.DataTable()}
          </tbody>
      </Table>
      </div>
    );
  }
}
  