import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';

// const storeTokens = (tokens) => {
//   localStorage.setItem('access_token', tokens.access_token);
//   localStorage.setItem('refresh_token', tokens.refresh_token);
// };

// const getAccessToken = () => {
//   return localStorage.getItem('access_token');
// };

// const getRefreshToken = () => {
//   return localStorage.getItem('refresh_token');
// };

function Login() {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = function(res) {
    if (res.status === 'SUCCESS') {
      return oktaAuth.signInWithRedirect({
        sessionToken: res.session.token
      });
    }
  }

  const onError = function(err) {
    console.log('error logging in', err);
  }

  return authState.isAuthenticated ?
    <Navigate to='/' replace /> :
    <OktaSignInWidget
      baseUrl='https://dev-40952775.okta.com'
      onSuccess={onSuccess}
      onError={onError}/>;
}

export default Login;