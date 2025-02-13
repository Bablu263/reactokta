import React from 'react';
function Private() {
  return (
    <>
    <div className="page">
      <div className="warning">
        <h1>Dtect</h1>
        <h2>A  modern AI assitance to dtect anything in data</h2>
        <button onClick={()=> window.location.href = 'http://localhost:3001/login'}>Get IN</button>
      </div>
    </div>

    <div className="page">
      <div className="succss">
        <h1>SCE</h1>
        <h2>A modern tool to perfrom data analysis with AI assitance</h2>
        <button onClick={()=> window.location.href = 'http://localhost:3000/login'}>Get IN</button>
      </div>
    </div>
    </>
  );
}

export default Private;