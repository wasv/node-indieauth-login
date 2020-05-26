import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/LoginForm';
import './index.css';

document.title = "IndieAuth Login"

const urlParams = new URLSearchParams(window.location.search);
const rd = urlParams.get('rd');

ReactDOM.render(<LoginForm rd={rd} />, document.getElementById('root'));
