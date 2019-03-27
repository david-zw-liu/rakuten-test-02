import React, { Component } from 'react';
import DataTable from './components/DataTable';
import './App.sass';
import UserForm from './components/UserForm';

const defualtUsers = [
  {
    "name": "蒼怡君",
    "email": "walter@shields.name",
    "phone": "02-1234567"
  },
  {
    "name": "饒靜宜",
    "email": "alysha.moore@goodwinnicolas.io",
    "phone": "02-1234567"
  },
  {
    "name": "晁淑婷",
    "email": "verna@reichert.biz",
    "phone": "02-1234567"
  },
  {
    "name": "邴佩蓉",
    "email": "dario_grady@gutkowski.net",
    "phone": "02-1234567"
  },
  {
    "name": "司空淑萍",
    "email": "zella_harris@mosciski.co",
    "phone": "02-1234567"
  },
  {
    "name": "習慧玲",
    "email": "bell@cole.name",
    "phone": "02-1234567"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [...defualtUsers],
      editingUser: null,
      isFormOpen: false,
    };

    this.createUser = this.createUser.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  editUser(targetName) {
    this.setState(({ users }) => {
      const editingUser = users.find(({ name }) => name === targetName);
      return { editingUser, isFormOpen: true }
    })
  }

  createUser() {
    this.setState({ editingUser: null, isFormOpen: true })
  }

  destoryUser(targetName) {
    if (!window.confirm(`Are you sure destory User, ${targetName} ?`)) return;
    this.setState(({ users }) => {
      const newUsers = users.filter(({ name }) => name !== targetName);
      return { users: newUsers }
    })
  }

  saveUser(newUser) {
    this.setState(({ users, editingUser }) => {
      if (editingUser) {
        const userIdx = users.findIndex(({ name }) => name === editingUser.name);
        users[userIdx] = newUser;

        return { users, editingUser: null, isFormOpen: false }
      }

      return { users: [...users, newUser], editingUser: null, isFormOpen: false }
    })
  }

  closeForm() {
    this.setState({ editingUser: null, isFormOpen: false });
  }

  render() {
    const { isFormOpen, editingUser, users } = this.state;
    const columns = [
      { name: 'Name', key: 'name' },
      { name: 'Phone', key: 'phone' },
      { name: 'Email', key: 'email', transform: ({ email }) => <a href={`mailto:${email}`}>{ email }</a> },
      {
        name: 'Actions',
        key: "actions",
        transform: ({ name }) => {
          return (
            <>
              <button className="btn btn-info btn-sm mr-1" onClick={() => this.editUser(name)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => this.destoryUser(name)}>Destroy</button>
            </>
          );
        }
      }
    ];

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="my-3">Users List</h1>
              <button className="btn btn-success btn-sm my-3" onClick={this.createUser}>Add user</button>
              <DataTable data={users} columns={columns} />
            </div>
          </div>
        </div>
        { isFormOpen && <UserForm onSubmit={this.saveUser} onCancel={this.closeForm} users={users} editingUser={editingUser} /> }
      </>
    );
  }
}

export default App;
