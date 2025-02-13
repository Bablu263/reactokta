import React from 'react';
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Greeting from './Greeting';

function Home() {
    const [userInfo, setUserInfo] = useState({"name":"please login"});
    const { oktaAuth, authState } = useOktaAuth();
    useEffect(() => {
        if (authState?.isAuthenticated) {
            oktaAuth.getUser().then(setUserInfo);
            //console.log(authState.accessToken);
        }
        }, [authState, oktaAuth]);
    
    const fetchData = async () => {
      console.log('fetching data');
      const accessToken = authState.accessToken;
      if (!accessToken) {
        console.error("No access token found!");
        return;
      }
    
      try {
        console.log('accessTocken from greet s', accessToken.accessToken);
        const response = await fetch('http://localhost:8080/demo/greet', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${accessToken.accessToken}`,
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

  };
  return (
    <div className="page">
      <Link to="/login">
        <button type="button">
          Welcome to market place
        </button>
        <p>{userInfo.name}</p>
        <Greeting data={fetchData}></Greeting>
      </Link>
    </div>
  );
}

export default Home;