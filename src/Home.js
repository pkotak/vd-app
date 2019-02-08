import React from 'react';
import customData from './result.json';
import { Line } from 'rc-progress';

export default class Home extends React.Component{
    constructor(){
        super();
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {goNext: false, currentIndex : 0, userAnswer: '', percentComplete: 0, strokeColor: '#FF0000'}
    }

    openUrl(mapUrl){
        window.open(mapUrl);
    }

    validateAnswer = (userAnswer, actualAnswer) => {
        if(userAnswer.toLowerCase() === actualAnswer.toLowerCase()) {
            this.setState((prevState, props) => ({currentIndex : prevState.currentIndex + 1,
                percentComplete: prevState.percentComplete + 25}),
                () => {
                    if(this.state.percentComplete >= 50) {
                        this.setState({strokeColor: '#228B22'});
                    }

                    if(this.state.percentComplete === 100)
                        alert('congrats babe')
                });
        }
        document.getElementById("answer").value = '';
    }

    updateInputValue(event) {
        this.setState({userAnswer: event.target.value})
    }

    render() {
        let currentData = customData.result[this.state.currentIndex];
            return (
                <div className="card">
                    <div className="card-header">
                        <h2 className='card-title'>{currentData.question}</h2>
                    </div>
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Answer</span>
                            </div>
                            <input type="text"
                                   className="form-control"
                                   aria-label="Default"
                                   aria-describedby="inputGroup-sizing-default"
                                   id="answer"
                                   onChange={this.updateInputValue}/>
                        </div>
                    </div>
                    <div className="card-body">
                        <button className="btn btn-danger btn-block" onClick={() => this.openUrl(currentData.mapURL)}>Clue</button>
                        <button className="btn btn-primary btn-block" onClick={() => this.validateAnswer(this.state.userAnswer,currentData.answer)}>Next</button>
                    </div>
                    <div className="card-body">
                        <Line percent={this.state.percentComplete} strokeWidth="1" strokeColor={this.state.strokeColor} />
                    </div>
                </div>)
    }
}
