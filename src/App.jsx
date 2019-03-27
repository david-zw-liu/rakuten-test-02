import React, { Component } from 'react';
import DataTable from './components/DataTable';
import './App.sass';

const defualtUsers = [
  {
    "name": "蒼怡君",
    "email": "walter@shields.name",
    "phone": "(661) 746-7368"
  },
  {
    "name": "饒靜宜",
    "email": "alysha.moore@goodwinnicolas.io",
    "phone": "1-508-503-2347"
  },
  {
    "name": "晁淑婷",
    "email": "verna@reichert.biz",
    "phone": "153-320-0953"
  },
  {
    "name": "邴佩蓉",
    "email": "dario_grady@gutkowski.net",
    "phone": "1-958-467-3775"
  },
  {
    "name": "司空淑萍",
    "email": "zella_harris@mosciski.co",
    "phone": "437-451-8117"
  },
  {
    "name": "習慧玲",
    "email": "bell@cole.name",
    "phone": "(253) 283-6854"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [...defualtUsers]
    };
  }

  editUser(name) {
    throw 'Not Implemented.'
  }

  destoryUser(targetName) {
    if (!window.confirm(`Are you sure destory User, ${targetName} ?`)) return;
    this.setState(({ users }) => {
      const newUsers = users.filter(({ name }) => name !== targetName);
      return { users: newUsers }
    })
  }

  render() {
    const { users } = this.state;
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
              <button onClick={() => this.editUser(name)}>Edit</button>
              <button onClick={() => this.destoryUser(name)}>Destroy</button>
            </>
          );
        }
      }
    ];

    return (
      <div className="App">
        <h1>Users List</h1>
        <DataTable data={users} columns={columns} />
      </div>
    );
  }
}

export default App;
