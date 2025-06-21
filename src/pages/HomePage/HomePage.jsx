import React from 'react';
import ChessGameContainer from '../components/ChessGameContainer';

function HomePage() {

  return (
    <div className="home-page-container">
      <h1>Welcome to My Chess Game!</h1>

      <ChessGameContainer /> 

      <p>Feel free to explore and make a move!</p>
    </div>
  );
}

export default HomePage;