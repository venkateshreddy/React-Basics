import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './App.css';

class Students extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            name: '',
            age: '',
            gender: '',
            qualification: '',
            editId: undefined,
            students: [
                {
                   id: 1, name: 'Ramesh', age: 23, gender: 'Male', qualification: 'BTech'
                },
                {
                    id: 2, name: 'Harish', age: 25, gender: 'Male', qualification: 'MCA'
                },
                {
                    id: 3, name: 'Girish', age: 21, gender: 'Male', qualification: 'MTech'
                }
           ]
        }
    }
    updateStudent = () => {
        const editStudent = { 
            id: this.state.editId,
            name: this.state.name,
            age: this.state.age,
            gender: this.state.gender,
            qualification: this.state.qualification
        }
        const students = this.state.students.map(student => 
            student.id === editStudent.id ? editStudent : student
        );
        this.setState({ 
            students,
            name: '',
            age: '',
            gender: '',
            qualification: '',
            editId: undefined,
            show: false
        });
    }
    editStudent = (event) => {
        const editStudent = this.state.students.find(student => parseInt(event.target.id) === student.id);
        this.setState({
            show: true,
            name: editStudent.name,
            age: editStudent.age,
            gender: editStudent.gender,
            qualification: editStudent.qualification,
            editId: editStudent.id
        })
    }
    createStudent = () => {
        const student = { 
            id: (new Date()).getTime(),
            name: this.state.name,
            age: this.state.age,
            gender: this.state.gender,
            qualification: this.state.qualification
        }

        this.setState({ 
            students: this.state.students.concat([student]),
            name: '',
            age: '',
            gender: '',
            qualification: '',
            show: false
        });
    }
    deleteStudent = (event) => {
        const students = this.state.students.filter(student => student.id !== parseInt(event.target.id, 10));
        this.setState({ students });
    }
    handleClose = () => {
        this.setState({ show: false });
    }
    showForm = () => {
        this.setState({ show: true });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value }, () => {
            console.table([
                { 
                    name: this.state.name,
                    age: this.state.age,
                    gender: this.state.gender,
                    qualification: this.state.qualification
                }
            ])
        })
    }
  render() {
    return (
        <div>
            <h1>Students List</h1>
            <span>
            <i class="fas fa-plus" onClick={this.showForm}></i> 
            </span>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div>
                            <label>Age:</label>
                            <input type="number" name="age" onChange={this.handleChange} value={this.state.age} />
                        </div>
                        <div>
                            <label>Gender:</label>
                            <input type="radio" name="gender" checked={this.state.gender === 'Male'} onClick={this.handleChange} value='Male' /> Male
                            <input type="radio" name="gender" checked={this.state.gender === 'Female'} onClick={this.handleChange} value='Female' /> Female
                        </div>
                        <div>
                            <label>Qualification:</label>
                            <select name="qualification" onChange={this.handleChange} value={this.state.qualification}>
                                <option value='MCA'>MCA</option>
                                <option value='BTech'>BTech</option>
                                <option value='MTech'>MTech</option>
                            </select>
                        </div> 
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    { !this.state.editId && <Button onClick={this.createStudent}>Save</Button> }
                    { this.state.editId && <Button onClick={this.updateStudent}>Update</Button> }
                </Modal.Footer>
            </Modal>
            <table>
                <tr>
                    <th>Sno</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Qualification</th>
                    <th>Actions</th>
                </tr>
                {
                    this.state.students.map((student, index) => 
                        <tr>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.qualification}</td>
                            <td>
                            <i id={student.id} onClick={this.editStudent} class="fas fa-edit"></i> 
                                <i id={student.id} onClick={this.deleteStudent} class="fas fa-trash"></i> 
                            </td>
                        </tr>   
                    )
                }
            </table>
        </div>
    );
  }
}

export default Students;
