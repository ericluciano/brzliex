/* eslint class-methods-use-this:
["error", { "exceptMethods": ["mountLi"] }] */
/* eslint-env es6 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// lodash
import Filter from 'lodash/filter';
// import sortBy from 'lodash/sortBy';

import { Link } from 'react-router-dom';
import { moedas } from '../../constantes/moedas';
import { capitalize, convertToSlug } from '../../utils/utils';

class NavLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: '',
      initialItems: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      list: moedas,
      initialItems: moedas,
    });
  }

  onInputChange(event) {
    let items = this.state.initialItems;
    const search = event.target.value.toLowerCase();
    items = (search.length > 0) ?
      Filter(items, lista => lista.nome.toLowerCase().includes(search))
      : this.state.initialItems;
    this.setState({
      list: items,
    });
  }

  mountLi() {
    const moedasCorrentes = this.state.list || [];
    const items = Object.keys(moedasCorrentes).sort();

    return items.map((moeda, key) => (
      <li
        className="nav-item str"
        key={moeda}
      >
        <Link
          className="nav-link"
          to={`/coin/${convertToSlug(moedasCorrentes[moeda].nome)}`}
          tabIndex={key}
          onClick={this.props.onChangeState}
          onKeyPress={this.props.onChangeState}
        >
          <img
            src={moedasCorrentes[moeda].logo}
            alt={moeda}
            width={moedasCorrentes[moeda].width}
            height={moedasCorrentes[moeda].height}
          />
          {capitalize(moedasCorrentes[moeda].nome)}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="procurar..."
          onChange={this.onInputChange}
        />
        <ul className="navbar-nav pb-4">
          {this.mountLi()}
        </ul>
      </div>
    );
  }
}

NavLinks.propTypes = {
  onChangeState: PropTypes.func.isRequired,
};

export default NavLinks;
