import React from 'react'


function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        backgroundImage: `url(./src/assets/Home.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h1>Welcome to the Weather and Top News App!</h1>
      <p>
        <strong>How to use the app:</strong>
      </p>
      <ul>
        <li>Click on the "Sign Up" button to create a new account.</li>
        <li>If you already have an account, click "Login".</li>
        <li>After logging in, explore current weather reports and trending news stories.</li>
      </ul>
    </div>
  );
}

export default Home
