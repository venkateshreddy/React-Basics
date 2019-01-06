import React from 'react'
import { Modal, Button } from 'react-bootstrap';

class AddStudent extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" onChange={this.props.handleChange} value={this.props.name} />
                        </div>
                        <div>
                            <label>Age:</label>
                            <input type="number" name="age" onChange={this.props.handleChange} value={this.props.age} />
                        </div>
                        <div>
                            <label>Gender:</label>
                            <input type="radio" name="gender" checked={this.props.gender === 'Male'} onClick={this.props.handleChange} value='Male' /> Male
                            <input type="radio" name="gender" checked={this.props.gender === 'Female'} onClick={this.props.handleChange} value='Female' /> Female
                        </div>
                        <div>
                            <label>Qualification:</label>
                            <select name="qualification" onChange={this.props.handleChange} value={this.props.qualification}>
                                <option value='MCA'>MCA</option>
                                <option value='BTech'>BTech</option>
                                <option value='MTech'>MTech</option>
                            </select>
                        </div> 
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    { !this.props.id && <Button onClick={this.props.create}>Save</Button> }
                    { this.props.id && <Button onClick={this.props.update}>Update</Button> }
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddStudent;