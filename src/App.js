import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerCounter: 0,
      timerSplitData: [],
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
        this.setState({ timerCounter: this.state.timerCounter + 1 });
      }
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.stopWatch);
  }

  convertMillisecond(ms) {
    let seconds = ms / 1000;
    let minutes = seconds / 60;

    let displayms = ms % 100 < 9 ? `0${parseInt(ms % 100)}` : parseInt(ms % 100);
    let displaysec = (seconds % 60) < 10 ? `0${parseInt(seconds % 60)}` : (parseInt(seconds % 60));
    let displaymin = minutes < 10 ? `0${parseInt(minutes)}` : parseInt(minutes);

    return `${displaymin}:${displaysec}.${displayms}`
  }

  splitTime() {
    this.setState({
      timerSplitData: [...this.state.timerSplitData, this.state.timerCounter]
    });
  }

  toggleTimer() {
    this.setState({ isPaused: !this.state.isPaused });
  }

  render() {
    const { timerCounter, timerSplitData, isPaused } = this.state;
    return (
      <div className="App">
        <h1 className="title">Stop Watch Application</h1>

        <div>
          <p className="timerCounter">{this.convertMillisecond(timerCounter)}</p>
          <button
            className="button"
            onClick={this.toggleTimer}
          >{isPaused ? "start" : "pause"}</button>

          {timerCounter === 0 ? null : <button
            className="button"
            onClick={this.splitTime}
          >split</button>}
        </div>

        {timerSplitData.map((timer, index) => {
          return <div className="timerLists" key={index.toString()}>
            <p style={{ marginRight: "80px" }}>{index + 1}.</p>
            <p>{this.convertMillisecond(timer)}</p>
          </div>
        })}
      </div>
    );
  }
}

export default App;
