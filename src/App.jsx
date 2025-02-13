import React from 'react';
import Header from './Header';
import Home from './Home';
import Private from './Private';
import { Route, Routes ,useNavigate} from 'react-router-dom';
import './App.css';
import Login from './Login';
import { LoginCallback, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import SecureRoute from './SecureRoute'; // Import SecureRoute

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-40952775.okta.com/oauth2/default',
  clientId: '0oan9py6yx7nt0Wiz5d7',
  // clientSecret : 'AK1_-ctB-vPgs5gxGd6vgYimy0K5QVtoaOzoG8nQIctPA5Yl6Apu9LOWqlC9efYR',
  redirectUri: window.location.origin + '/callback',
});

function App() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri, window.location.origin));
    console.log(window.location.origin);
  };

  return (
    <div className="App">
      <div className="page">
        <div className="content">
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login'  element={<Login/>}/>
                <Route path="/private" element={<SecureRoute element={<Private />} />} />
                <Route path="/callback" element={<LoginCallback />} />
                {/* Add other routes as needed */}
              </Routes>
            </Security>
        </div>
      </div>
    </div>
  );
}

export default App;
