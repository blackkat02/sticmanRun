const getPieceSymbol = (pieceType) => {
  const symbols = {
    // Білі фігури (світлі символи)
    'wp': '♙', // White Pawn (U+2659)
    'wn': '♘', // White Knight (U+2658)
    'wb': '♗', // White Bishop (U+2657)
    'wr': '♖', // White Rook (U+2656)
    'wq': '♕', // White Queen (U+2655)
    'wk': '♔', // White King (U+2654)

    // Чорні фігури (темні символи)
    'bp': '♟', // Black Pawn (U+265F)
    'bn': '♞', // Black Knight (U+265E)
    'bb': '♝', // Black Bishop (U+265D)
    'br': '♜', // Black Rook (U+265C) 
    'bq': '♛', // Black Queen (U+265B)
    'bk': '♚'  // Black King (U+265A)
  };
  return symbols[pieceType] || '';
};

export default getPieceSymbol;
