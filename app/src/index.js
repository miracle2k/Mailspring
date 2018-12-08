import "core-js/shim"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";


const React = require('react');
const ReactDOM = require('react-dom');


const nylasAppAccessToken = '';


export default class LoginWrapper extends React.Component {
  static displayName = 'LoginWrapper';

  state = {
    loggedIn: false
  };

  render() {
    return <div style={{margin: 30}}>
      <button onClick={this.openWithFake}>Open UI with fake data</button>
      <button onClick={this.openWithNylas}>Login with Nylas</button>
    </div>
  }

  openWithFake = () => {
    window.mailBackend = 'fake';
    this.props.handleStart();
  };

  openWithNylas = () => {
    window.location.href = `https://api.nylas.com/oauth/authorize?client_id=537zkfdb0nkeziolesy5p7r7u&response_type=token&scope=email&login_hint=foo&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogged-in&namespace_id=9vukh44ht75uslswj0i2hbyik&account_id=9vukh44ht75uslswj0i2hbyik&sid=187&access_token=${nylasAppAccessToken}&provider=gmail&email_address=foo@foo.com`;
  }
}


// Check nylas return
if (location.pathname === '/logged-in') {
  let params = (new URL(document.location)).searchParams;

  window.mailBackend = 'nylas';
  window.nylasToken = params.get('access_token');

  require('./index.real.js');
}


else {
  const x = document.createElement('loginwrapper');
  ReactDOM.render(React.createElement(LoginWrapper, {
    handleStart: () => {
      document.body.removeChild(x);
      require('./index.real.js');
    }
  }), x);
  document.body.appendChild(x);
}

