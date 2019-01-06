import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import StudentTile from './StudentTile';
import './App.css';
import AddStudent from './AddStudent';
import axios from 'axios';

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
            students: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/students')
        .then(response => {
            this.setState({ students: response.data })
        })
    }
    updateStudent = () => {
        const editStudent = { 
            id: this.state.editId,
            name: this.state.name,
            age: this.state.age,
            gender: this.state.gender,
            qualification: this.state.qualification
        }
        axios.put(`http://localhost:4000/students/${this.state.editId}`, editStudent)
        .then(response => {
            this.setState({ 
                students: response.data,
                name: '',
                age: '',
                gender: '',
                qualification: '',
                show: false,
                editId: undefined
            });
        });
    }
    editStudent = (id) => {
        const editStudent = this.state.students.find(student => id === student._id);
        this.setState({
            show: true,
            name: editStudent.name,
            age: editStudent.age,
            gender: editStudent.gender,
            qualification: editStudent.qualification,
            editId: editStudent._id
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
        axios.post('http://localhost:4000/students', student)
        .then(response => {
            this.setState({ 
                students: response.data,
                name: '',
                age: '',
                gender: '',
                qualification: '',
                show: false
            });
        })
        
    }
    deleteStudent = (event) => {
        if(window.confirm('Are you sure you want to delete this student?')) {
            axios.delete(`http://localhost:4000/students/${event.target.id}`)
            .then(response => {
                this.setState({ students: response.data });
            })
        }
    }
    handleClose = () => {
        this.setState({ 
            show: false,
            name: '',
            age: '',
            gender: '',
            qualification: ''
        });
    }
    showForm = () => {
        this.setState({ show: true });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }
  render() {
    return (
        <div>
            <h1>Students List</h1>
            <span>
            <i className="fas fa-plus" onClick={this.showForm}></i> 
            </span>
            <Row>
                <AddStudent
                    show={this.state.show}
                    name={this.state.name}
                    age={this.state.age}
                    gender={this.state.gender}
                    qualification={this.state.qualification}
                    handleChange={this.handleChange}
                    create={this.createStudent}
                    update={this.updateStudent}
                    id={this.state.editId}
                    onClose={this.handleClose}
                />
            </Row>
            <Row>
            {
                this.state.students.map((student, index) => 
                  <Col key={index} lg={4} style={{ border: '1px solid'}}>
                    <StudentTile 
                        currentStudent={student} 
                        edit={this.editStudent}
                        delete={this.deleteStudent}
                    />
                  </Col>  
                )
            }
            </Row>
        </div>
    );
  }
}

export default Students;
