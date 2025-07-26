// HomePage.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx'; // Ensure path is correct and .jsx extension

const HomePage = () => {
  // State for player position: { x: horizontal coordinate, level: vertical level }
  // Start at level 0, which will be displayed as level 1 (first floor)
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 }); 

  // Effect for adding and removing keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      setPlayerPosition(prevPosition => {
        let newX = prevPosition.x;
        // Movement logic: 'KeyD' for forward (right), 'KeyA' for backward (left)
        if (event.code === 'KeyD') { 
          newX = prevPosition.x + 1;
        } else if (event.code === 'KeyA') { 
          newX = prevPosition.x - 1;
        }

        if (newX !== prevPosition.x) {
          // First log: now also shows 1-indexed level for consistency
          console.log(`Гравець переміщено на: X=${newX}, Рівень=${prevPosition.level + 1}`);
          // Second log: shows cell name in X-Level format (1-indexed level)
          console.log(`Клітинка: ${newX}-${prevPosition.level + 1}`); 
          return { ...prevPosition, x: newX };
        }
        return prevPosition;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  // Calculate the current cell name for display (1-indexed level)
  const currentCellName = `${playerPosition.x}-${playerPosition.level + 1}`;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Безкінечне Ігрове Поле</h1>
      <p>
        {/* Display player's level as 1-indexed for consistency */}
        Поточна позиція коня: X={playerPosition.x}, Рівень={playerPosition.level + 1}
        <br />
        **Поле:** {currentCellName}
      </p>
      <GameBoard 
        playerPosition={playerPosition} 
      />
    </div>
  );
};

export default HomePage;

