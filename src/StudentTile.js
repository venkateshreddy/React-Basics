import React from 'react';

class StudentTile extends React.Component {
    render() {
        const student = this.props.currentStudent;
        return (
            <div>
                <div style={{ right: 0, position: 'absolute', padding: '5px' }}>
                    <i onClick={() => this.props.edit(student._id)} className="fas fa-edit"></i> 
                    <i id={student._id} onClick={this.props.delete} className="fas fa-trash"></i>    
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Id:</th>
                            <td>{student._id}</td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>{student.name}</td>
                        </tr>
                        <tr>
                            <th>Age:</th>
                            <td>{student.age}</td>
                        </tr>
                        <tr>
                            <th>Gender:</th>
                            <td>{student.gender}</td>
                        </tr>
                        <tr>
                            <th>Qualification:</th>
                            <td>{student.qualification}</td>
                        </tr>    
                    </tbody>
                </table>
            </div>
        )
    }
}

export default StudentTile;