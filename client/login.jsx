import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/LoginForm';
import './index.css';

document.title = "IndieAuth Login"

const urlParams = new URLSearchParams(window.location.search);
const redirect_to = urlParams.get('redirect_to');

ReactDOM.render(<LoginForm redirect_to={redirect_to} />, document.getElementById('root'));
