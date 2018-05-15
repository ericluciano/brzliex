/* eslint class-methods-use-this:
["error", { "exceptMethods": ["alert3"] }] */
/* eslint-env es6 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// action creators
import { callApiPrivate, setPrivate } from '../../reducers/criptoActions';

import NavLinks from './navLinks';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offcanvas: 'closed',
      overlay: 'closed',
      toggler: 'collapsed',
    };
  }

  getIconTitleLogin() {
    const resLogged = {
      iconLogin: 'fa-sign-out-alt',
      iconLoginTitle: 'Logout',
    };
    const resNoLogin = {
      iconLogin: 'fa-lock',
      iconLoginTitle: 'Login',
    };
    return (this.props.privateUser.key) ? resLogged : resNoLogin;
  }

  changeState() {
    let { toggler, overlay, offcanvas } = this.state;
    toggler = (toggler === 'closed') ? 'collapsed' : 'closed';
    overlay = (overlay === 'closed') ? 'open' : 'closed';
    offcanvas = (offcanvas === 'closed') ? 'open' : 'closed';
    this.setState({
      offcanvas,
      toggler,
      overlay,
    });
  }

  login() {
    const MySwal = withReactContent(Swal);
    if (this.props.privateUser.key) {
      this.props.setPrivate({
        key: '', secret: '', balance: '', message: 'Logout efetuado.',
      });

      MySwal.fire({
        title: 'Ok!',
        text: 'Logout efetuado com sucesso.',
        type: 'success',
      });
    } else {
      MySwal.mixin({
        input: 'text',
        confirmButtonText: 'Próximo &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2'],
      }).queue([
        {
          title: 'Key',
          text: 'Informe a sua key do Braziliex',
        },
        {
          title: 'Sign',
          text: 'Informe a sua Sign do Braziliex',
        },
      ]).then((result) => {
        if (result.value) {
          MySwal.fire({
            title: 'Tudo certo!',
            text: 'Pronto para enviar',
            confirmButtonText: 'Enviar',
          }).then((res) => {
            if (res) {
              const prv = {
                key: result.value[0],
                secret: result.value[1],
                type: 'balance',
              };
              this.props.callApiPrivate(prv);
            }
          });
        }
      });
    }
  }

  render() {
    const { toggler, overlay, offcanvas } = this.state;
    const { iconLogin, iconLoginTitle } = this.getIconTitleLogin();

    return (
      <div>
        <nav className="navbar fixed-top navbar-light bg-blue">
          <span className="navbar-brand mr-auto mr-lg-0">BRZ {this.props.privateUser.message}</span>
          <div className="d-flex justify-content-center">
            <Link
              className="btn btn-link home-link mr-1"
              to="/"
            >
              <i className="fas fa-home" />
            </Link>
          </div>

          <button
            className={`navbar-toggler p-0 border-0 ${toggler}`}
            type="button"
            onClick={() => this.changeState()}
          >
            <span />
            <span />
            <span />
          </button>
          <div
            className={`navbar-collapse justify-content-end offcanvas-collapse ${offcanvas}`}
            id="navCoin"
          >
            <div
              className="d-flex mb-3 align-items-center justify-content-around actions-menu"
            >
              <div
                className="btn btn-xs btn-outline-primary mr-1"
                onClick={() => this.changeState()}
                role="presentation"
              >
                <i className="fas fa-times" />
              </div>
              <Link
                className="btn btn-xs btn-outline-primary mr-1"
                to="/"
                onClick={() => this.changeState()}
              >
                <i className="fas fa-home" />
              </Link>
              <div
                className="btn btn-xs btn-outline-primary mr-1"
                onClick={() => this.login()}
                role="presentation"
                title={iconLoginTitle}
                alt={iconLoginTitle}
              >
                <i className={`fas ${iconLogin}`} title={iconLoginTitle} />
              </div>
            </div>
            <NavLinks onChangeState={() => this.changeState()} />
          </div>
        </nav>
        <div
          className={`overlay ${overlay}`}
          onClick={() => this.changeState()}
          role="presentation"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { history, match }) => ({
  balance: state.cripto.balance,
  privateUser: state.cripto.privateUser,
  match,
  history,
});

const mapDispatchToProps =
dispatch => bindActionCreators({
  callApiPrivate,
  setPrivate,
}, dispatch);

// Nav.defaultProps = {
//   balance: {},
// };

Nav.propTypes = {
  callApiPrivate: PropTypes.func.isRequired,
  setPrivate: PropTypes.func.isRequired,
  // balance: PropTypes.instanceOf(Object),
  privateUser: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
