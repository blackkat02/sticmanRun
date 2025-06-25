import { coordsToAlgebraic } from './boardUtils'; // Ваша функція

/**
 * Генерує FEN-рядок з поточного стану дошки та гри.
 * @param {Array<Array<string|null>>} board - Матриця дошки.
 * @param {'white' | 'black'} currentPlayer - Поточний гравець.
 * @param {{canWhiteCastleKingSide: boolean, ...}} castleRights - Права на рокіровку.
 * @param {string | null} enPassantTarget - Ціль для взяття на проході.
 * @param {number} halfMoveClock - Лічильник напівходів.
 * @param {number} fullMoveNumber - Повний номер ходу.
 * @returns {string} FEN-рядок.
 */
export const boardToFen = (board, currentPlayer, castleRights, enPassantTarget, halfMoveClock, fullMoveNumber) => {
    // ... складна логіка перетворення матриці та інших параметрів у FEN-рядок
    // Це буде досить велика функція, яка враховує всі деталі FEN.
    // Наприклад:
    let fenBoard = '';
    for (let r = 0; r < 8; r++) {
        let emptyCount = 0;
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece) {
                if (emptyCount > 0) {
                    fenBoard += emptyCount;
                    emptyCount = 0;
                }
                fenBoard += piece.toLowerCase() === piece ? piece : piece.toUpperCase(); // Для FEN, білі фігури - великі літери
            } else {
                emptyCount++;
            }
        }
        if (emptyCount > 0) {
            fenBoard += emptyCount;
        }
        if (r < 7) {
            fenBoard += '/';
        }
    }

    const fenTurn = currentPlayer === 'white' ? 'w' : 'b';

    let fenCastle = '';
    if (castleRights.canWhiteCastleKingSide) fenCastle += 'K';
    if (castleRights.canWhiteCastleQueenSide) fenCastle += 'Q';
    if (castleRights.canBlackCastleKingSide) fenCastle += 'k';
    if (castleRights.canBlackCastleQueenSide) fenCastle += 'q';
    if (fenCastle === '') fenCastle = '-';

    const fenEnPassant = enPassantTarget || '-';

    return `${fenBoard} ${fenTurn} ${fenCastle} ${fenEnPassant} ${halfMoveClock} ${fullMoveNumber}`;
};

// ... також вам знадобиться fenToBoard для завантаження з FEN
export const fenToBoard = (fenString) => {
    // ... складна логіка парсингу FEN-рядка в матрицю та інші параметри
    // Це також буде досить велика функція.
};