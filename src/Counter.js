import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("did mount", this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevState:", prevState);
    console.log("update");
  }

  componentWillUnmpunt() {
    console.log("unmount");
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  render() {
    const { counter } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>+1</button>
        counter: {counter}
      </div>
    );
  }
}
