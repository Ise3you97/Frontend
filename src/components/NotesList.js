import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import {Link} from 'react-router-dom'

export var myID = "";
export class NotesList extends Component {
  state = {
    notes: []
  }

  async getNotes() {
    const res = await axios.get('http://backend-lrbo.onrender.com/api/notes');
    this.setState({ notes: res.data });
  }

  async componentDidMount() {
    this.getNotes();
  }

  deleteNote = async (id) => {
    await axios.delete(`http://backend-lrbo.onrender.com/api/notes/${id}`);
    this.getNotes();
  }

  render() {
    return (
      <div className='row'>
        {
          this.state.notes.map(note => (
            <div className='col-md-4 p-2' key={note._id}>
              <div className='card'>
                <div className='card-body'>
                  <div className='card-header d-flex justify-content-between '> 
                    <h5>{note.tittle}</h5>
                    <Link className='btn btn-secondary' to={`/edit/${note._id}`} onClick={() => myID = note._id}>
                      Edit
                    </Link>
                  </div>
                  <p>{note.content}</p>
                  <p>{note.author}</p>
                  <p>{format(note.date)}</p>
                </div>
                <div className='card-footer'>
                  <button className='btn btn-danger' onClick={() => this.deleteNote(note._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default NotesList;
