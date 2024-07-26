import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { myID } from './NotesList'; // Importa myID desde NotesList

export class CreateNote extends Component {
  state = {
    users: [],           // Almacena la lista de usuarios
    userSelected: '',    // Usuario seleccionado
    author: '',          // Autor de la nota
    tittle: '',          // Título de la nota
    content: '',         // Contenido de la nota
    date: new Date(),    // Fecha de la nota, inicializada con la fecha actual
    editing: false,      // Indica si la nota está en modo edición
    idState: ''          // ID de la nota en modo edición
  };

  async componentDidMount() {
    // Establece el ID de la nota en el estado desde myID
    this.setState({
      idState: myID
    });

    // Obtiene la lista de usuarios desde la API
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({ users: res.data.map(user => user.username) });

    // Si hay un ID de nota (modo edición), obtén los detalles de la nota
    if (myID) {
      const res = await axios.get(`http://localhost:4000/api/notes/${this.state.idState}`);

      // Actualiza el estado con los datos de la nota existente
      this.setState({
        tittle: res.data.tittle,
        content: res.data.content,
        date: new Date(res.data.date),    // Convierte la fecha de string a Date object
        userSelected: res.data.author,
        editing: true
      });
      console.log(myID); // Muestra el ID por consola
    } else {
      // Si no hay ID de nota (modo creación), establece editing en falso
      this.setState({
        editing: false
      });
      console.log(myID); // Muestra el ID por consola
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    // Crea un objeto newNote con los datos del formulario
    const newNote = {
      userSelected: this.state.userSelected,
      author: this.state.author,
      tittle: this.state.tittle,
      content: this.state.content,
      date: this.state.date.toISOString()  // Convierte la fecha a formato ISO string
    };

    // Si está en modo edición, realiza una solicitud PUT para actualizar la nota existente
    if (this.state.editing) {
      await axios.put(`http://localhost:4000/api/notes/${this.state.idState}`, newNote);
    } else {
      // Si no está en modo edición, realiza una solicitud POST para crear una nueva nota
      await axios.post('http://localhost:4000/api/notes', newNote);
    }

    // Redirige a la página principal después de guardar la nota
    window.location.href = '/';
    console.log('Note Created'); // Muestra un mensaje en consola
  };

  // Maneja el cambio en los inputs del formulario
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Maneja el cambio en el DatePicker
  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className='col-md-6 offset-md-3'>
        <div className='card card-body'>
          <h4>Create a Note</h4>
          <form onSubmit={this.onSubmit}>
            {/** SELECT USER */}
            <div className='form-group'>
              <select
                className='form-control'
                name='userSelected'
                onChange={this.onInputChange}
                value={this.state.userSelected}
              >
                <option value='' disabled>Select a user</option>
                {this.state.users.map(user => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            {/** TITTLE */}
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Title'
                name='tittle'
                onChange={this.onInputChange}
                value={this.state.tittle}
                required
              />
            </div>

            {/** CONTENT */}
            <div className='form-group'>
              <textarea
                name='content'
                className='form-control'
                placeholder='Content'
                onChange={this.onInputChange}
                value={this.state.content}
                required
              ></textarea>
            </div>

            {/** DATE PICKER */}
            <div className='form-group'>
              <DatePicker
                className='form-control'
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateNote;
