import React, { Component } from 'react';
import { validateEmail, validatePhone } from '../utils';

class UserForm extends Component {
  constructor(props) {
    super(props);
    if (props.editingUser) {
      this.state = { user: { ...props.editingUser } };
    } else {
      this.state = { user: { name: '', phone: '', email: '' } };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  }

  onSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { user } = this.state;

    onSubmit(user);
  }

  validate() {
    const { user } = this.state;
    const { name, phone, email } = user;
    const { editingUser, users } = this.props;
    const error = {};

    let duplicateName = false;
    if (editingUser) {
      duplicateName = users.some(user => user.name !== editingUser.name && user.name === name)
    } else {
      duplicateName = users.some(user => user.name === name)
    }

    if (duplicateName) {
      error['name'] = "Name is duplicate!"
    }

    if (phone !== '' && !validatePhone(phone)) {
      error['phone'] = "Phone is invalid!  (i.g. 02-1234567)"
    }

    if (email !== '' && !validateEmail(email)) {
      error['email'] = "Email is invalid!"
    }

    return error;
  }

  render() {
    const { user } = this.state;
    const { name, phone, email } = user;
    const { editingUser, onCancel } = this.props; 
    const titleText = editingUser ? 'Edit user' : 'New user';
    const error = this.validate();
    const disabledSubmit = Object.keys(error).length > 0 || email === '';

    return (
      <div className="user-form-container">
        <div className="user-form-content">
          <h2 className="my-3">{ titleText }</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" type="text" name="name" value={name} onChange={this.onChange} />
              { error['name'] && <p className="text-danger">{ error['name'] }</p> }
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input className="form-control"type="text" name="phone" value={phone} onChange={this.onChange} />
              { error['phone'] && <p className="text-danger">{ error['phone'] }</p> }
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" type="email" name="email" value={email} onChange={this.onChange} required />
              { error['email'] && <p className="text-danger">{ error['email'] }</p> }
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm mr-1" disabled={disabledSubmit}>Submit</button>
              <button className="btn btn-light btn-sm" type="button" onClick={onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UserForm;
