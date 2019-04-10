import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerCount: 0,
      timerData: [],
      isPaused: true
    }
    this.splitTime = this.splitTime.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  componentDidMount() {
    this.stopWatch = setInterval(() => {
      if (this.state.isPaused) {
        return null;
      } else {
        this.setState({ timerCount: this.state.timerCount + 1 });
      }
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.stopWatch);
  }

  convertMillisecond(ms) {
    let milliSeconds = ms;
    let seconds = milliSeconds / 1000;
    let minutes = seconds / 60;

    return `${parseInt(minutes)} : ${parseFloat(seconds).toFixed(2)}`
  }

  splitTime() {
    this.setState({
      timerData: [this.state.timerCount, ...this.state.timerData]
    });
  }

  toggleTimer() {
    this.setState({ isPaused: !this.state.isPaused });
  }

  render() {
    const { timerCount, timerData, isPaused } = this.state;
    return (
      <div className="App">
        <h1>Stop Timer Application</h1>

        <div style={{ display: "flex", alignItems: "center" }}>
          <p>{this.convertMillisecond(timerCount)}</p>
          <button
            onClick={this.splitTime}
          >split</button>

          <button
            onClick={this.toggleTimer}
          >{isPaused ? "play" : "pause"}</button>
        </div>

        {timerData.map((timer, index) => {
          return <p
            key={index.toString()}
          >
            {this.convertMillisecond(timer)}
          </p>
        })}
      </div>
    );
  }
}

export default App;
