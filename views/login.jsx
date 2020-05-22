import React from 'react';
import DefaultLayout from './layouts/default.jsx';
import LoginForm from './components/LoginForm.jsx';

export default (props) => (
    <DefaultLayout title="Login">
      <h1>Login</h1>
      <LoginForm redirect_to={props.redirect_to}/>
    </DefaultLayout>
)
