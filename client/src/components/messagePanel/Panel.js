import React, { Component } from 'react';
import axios from 'axios';

class Panel extends Component {
    state = {
        number: '',
        message: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        axios.post('/', {
            number: this.state.number.replace([0],'+234'),
            message: this.state.message
        })
        .then(data => {
            this.setState({...this.state,
                receiver: data.data.receiver
            });
            alert(`Message sent to ${this.state.receiver}`);
            this.setState({
                number: '',
                message: '',
                receiver: ''
            })

        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container mt-3" style={{width: 500}} >
                <h3>Send Text Message</h3>
                <div className="form-group">
                    <input className="form-control" type="tel" name="number" id="number" placeholder="Enter Phone no." value={this.state.number} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" name="message" id="message" placeholder="Enter Text Message" value={this.state.message} onChange={this.handleChange} />
                </div>
                <input className="btn  btn-dark" type="button" value="Send"  onClick={this.handleSubmit} />
            </div>
        )
    }
}

export default Panel