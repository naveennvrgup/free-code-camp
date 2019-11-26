import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    // input
    break: 5,
    session: 10,
    // display
    min: 10,
    sec: 0,
    progress: 0,
    // background
    intRef: null,
    freetime: true,
    edit: true
  }

  startClock = () => {
    console.log("started");

    // if already no interval is running then run this code
    // reduce sec, min then switch btw session and break time
    if (!this.state.intRef) {
      let tempIntRef = setInterval(() => {
        if (this.state.sec > 0) {
          this.setState({ sec: this.state.sec - 1 });
        } else if (this.state.min > 0) {
          this.setState({
            min: this.state.min - 1,
            sec: 59
          });
        } else {
          if (this.state.freetime) {
            this.setState({
              min: this.state.break,
              freetime: !this.state.freetime
            });
          } else {
            this.setState({
              min: this.state.session,
              freetime: !this.state.freetime
            })
          }
        }
        this.updateProgress();
      }, 1000);//set interval

      // storing the ref for the interval in the state
      this.setState({ intRef: tempIntRef });
    }// if
    this.setState({ edit: false });
  }// startClock

  pauseClock = () => {
    console.log("paused");

    clearInterval(this.state.intRef);
    this.setState({ intRef: null });
  }// pause clock

  updateProgress = () => {
    let tempProgress;
    if (this.state.freetime) {
      tempProgress = 100 * (this.state.session * 60 - this.state.min * 60 - this.state.sec) / (this.state.session * 60);
    } else {
      tempProgress = 100 * (this.state.break * 60 - this.state.min * 60 - this.state.sec) / (this.state.break * 60);
    }

    this.setState({ progress: tempProgress.toFixed(0) });
  }// update progress

  reset = () => {
    this.pauseClock();

    this.setState({
      break: 5,
      session: 10,
      min: 10,
      sec: 0,
      progress: 0,
      intRef: null,
      freetime: true,
      edit: true
    });
  }

  // helper functions
  breakPlus = () => this.setState({ break: this.state.break + 1 });
  breakMinus = () => {
    if (this.state.break > 0) {
      this.setState({ break: this.state.break - 1 });
    }
  };
  sessionPlus = () => this.setState({
    session: this.state.session + 5,
    min: this.state.session + 5
  });
  sessionMinus = () => {
    if (this.state.session > 0) {
      this.setState({
        session: this.state.session - 5,
        min: this.state.session - 5
      });
    }
  };


  render() {
    return (
      <div className={this.state.edit ? String("container") : String("container noEdit")}>
        {/* header */}
        <h1 className="text-center mt-5 display-4 font-weight-bold">#freecodecamp</h1>
        <div className="row justify-content-center my-5 controls">

          {/* break length dialog */}
          <div className="col-4 text-center">
            <p className="title text-muted">BREAK LENGTH</p>
            <button className="text-danger" onClick={this.breakMinus}>-</button>
            <span className="px-2 h5 mb-5">{this.state.break}</span>
            <button className="text-success" onClick={this.breakPlus}>+</button>
          </div>

          {/* reset */}
          <span className="col-1 text-center px-0 mx-0">
            <button className="btn btn-primary" onClick={this.reset}>reset</button>
          </span>

          {/* session length dialog */}
          <div className="col-4 text-center">
            <p className="tilte text-muted">SESSION LENGTH</p>
            <button className="text-danger" onClick={this.sessionMinus}>-</button>
            <span className="px-2 h5">{this.state.session}</span>
            <button className="text-success" onClick={this.sessionPlus}>+</button>
          </div>
        </div>

        {/* top progress bar */}
        <div className="progress w-50 m-auto bg-dark">
          <div className="progress-bar ml-auto bg-danger" role="progressbar" style={{ "width": this.state.progress + "%" }}></div>
        </div>

        {/* display */}
        <div className="display text-center p-5 w-50 mx-auto disabled">
          <h4 className="typeOfTime">{this.state.freetime ? "WORK SESSION" : "CHLLIN BREAK"}</h4>
          <h2 className="time display-4">
            <span className="min">{this.state.min}</span>:
      <span className="sec">{this.state.sec}</span>
          </h2>

          {/* start and pause buttons */}
          <button className="btn btn-success" onClick={this.startClock}>start</button>
          <button className="btn btn-danger mx-1" onClick={this.pauseClock}>pause</button>
        </div>

        {/* bottom progress bar */}
        <div className="progress w-50 m-auto mt-5 bg-dark">
          <div className="progress-bar" role="progressbar" style={{ "width": this.state.progress + "%" }}></div>
        </div>

        {/* footer */}
        <footer className="text-center fixed-bottom">
          made by #naveensundar
    </footer>
      </div>
    );// return
  }
}

export default App;
