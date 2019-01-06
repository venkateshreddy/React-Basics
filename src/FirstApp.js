import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import Timer from './Timer';

class App extends Component {
    constructor() {
        super();
        this.state = {
            firstText: "FirstDiv",
            secondText: "SecondDiv"
        }
    }
    changeFirstText = (event) => {
        this.setState({ firstText: event.target.value });
    }
  render() {
    return (
        <div>
            firstText: <input type="text" onChange={this.changeFirstText} />
            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <h1>{ this.state.firstText }</h1>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <h1>{ this.state.secondText }</h1>
                </Col>
            </Row>
            <Timer />
        </div>
    );
  }
}

export default App;
