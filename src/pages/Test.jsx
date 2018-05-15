import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
    };
  }

  componentWillMount() {
    this.setState({
      nome: 'Test',
    });
  }
  render() {
    return (
      <div>
        Test {this.state.nome}
      </div>
    );
  }
}

export default Test;
