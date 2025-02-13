import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
const SecureRoute = ({ element, ...rest }) => {
  const { oktaAuth ,authState } = useOktaAuth();
  const navigate = useNavigate();


  if(!authState?.isAuthenticated){
    const originalUri = toRelativeUrl(window.location.href,window.location.origin);
    oktaAuth.setOriginalUri(originalUri);
    oktaAuth.signInWithRedirect();
  }

  if (!authState || !authState.isAuthenticated) {
    // Redirect to login if not authenticated
    navigate('/login');
    return null; // Return nothing while redirecting
  }

  return element; // Render the element (protected route) if authenticated
};

export default SecureRoute;
