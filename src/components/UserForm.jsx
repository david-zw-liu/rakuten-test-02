import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    if (props.user) {
      this.state = { ...props.user }
    } else {
      this.state = { name: '', phone: '', email: '' }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const user = this.state;

    onSubmit(user);
  }

  render() {
    const { name, phone, email } = this.state;
    const { onCancel } = this.props; 

    return (
      <form className="user-edit-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" value={phone} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <button>Submit</button><button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    )
  }
}

export default UserForm;
