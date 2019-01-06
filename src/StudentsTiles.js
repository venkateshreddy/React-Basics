import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import StudentTile from './StudentTile';
import './App.css';
import AddStudent from './AddStudent';

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
    editStudent = (id) => {
        const editStudent = this.state.students.find(student => parseInt(id) === student.id);
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
                this.state.students.map(student => 
                  <Col lg={4} style={{ border: '1px solid'}}>
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
