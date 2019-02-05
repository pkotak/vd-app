import React from 'react';
import customData from './result.json';
import { Line } from 'rc-progress';

export default class Home extends React.Component{
    constructor(){
        super();
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {goNext: false, currentIndex : 0, userAnswer: '', percentComplete: 0}
    }

    openUrl(mapUrl){
        window.open(mapUrl);
    }

    validateAnswer(userAnswer, actualAnswer) {
        if(userAnswer.toLowerCase() === actualAnswer.toLowerCase()) {
            this.setState({currentIndex : this.state.currentIndex + 1,
                percentComplete: this.state.percentComplete + 25})
        }
    }

    updateInputValue(event) {
        this.setState({userAnswer: event.target.value})
    }

    render() {
        let currentData = customData.result[this.state.currentIndex];
        if(this.state.percentComplete !== 100)
            return (
                <div className="container-fluid">
                    <div className="row">
                        <h2>{currentData.question}</h2>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
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
                        <div className="col-xs-6">
                            <button className="btn btn-danger" onClick={() => this.openUrl(currentData.mapURL)}>Clue</button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <button className="btn btn-primary btn-block" onClick={() => this.validateAnswer(this.state.userAnswer,currentData.answer)}>Next</button>
                    </div>
                    <div className="row">
                        <Line percent={this.state.percentComplete} strokeWidth="2" strokeColor="#228B22" />
                    </div>
                </div>)
        else {
            return (
                <div>
                    Complete
                </div>
            )
        }
    }
}
