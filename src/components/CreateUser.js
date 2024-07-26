import React, { Component } from 'react';
import axios from 'axios';
import e from 'cors';

export class CreateUser extends Component {

  state = {
    users: [],
    username: ''
  };
  async getUsers(){
    try {
      const res = await axios.get('http://localhost:4000/api/users');
      this.setState({ users: res.data });
      console.log(this.state.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async componentDidMount() {
   this.getUsers();
  }

  onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  };
  onSbubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/api/users', {
      username: this.state.username
    })
    this.setState({username: ''})
    this.getUsers();
  } 

  deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      this.getUsers(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  


  render() {
    return (
      <div className='row'>
        <div className='col-md-4'>
          <div className='card card-body'>
            <h3>Create new User</h3>
            <form onSubmit={ this.onSbubmit}>
              <input
                type='text'
                className='form-control'
                onChange={this.onChangeUserName}
                value={this.state.username} // Agrega value para mantener el estado del input
              />
              <button type='submit' className='btn btn-primary'>
                Save
              </button>
            </form>
          </div>
        </div>
        <div className='col-md-8'>
          <ul className='list-group'>
            {
              this.state.users.map(user =>
                <li className='list-group-item list-group-item-action' 
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}>
                  {user.username}
                </li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default CreateUser;
