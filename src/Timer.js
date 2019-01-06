import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            time: (new Date()).getTime()
        }
    }
    componentDidMount() {
        this.changeTime();
    }
    changeTime = () => {
        this.setState({ time: (new Date()).getTime()}, () => {
            setTimeout(() => this.changeTime(), 1000);
        })
    }
    render() {
        return (
            <div>
                { this.state.time }           
            </div>
        );
    }
}

export default App;
