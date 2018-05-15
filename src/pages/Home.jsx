import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
    };
  }

  componentWillMount() {
    this.setState({
      nome: 'Eric',
    });
  }
  render() {
    return (
      <div>
        ola {this.state.nome}
      </div>
    );
  }
}

export default Home;
