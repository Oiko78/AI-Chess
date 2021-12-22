import { highlight, removeHighlight } from "./utility.js";

const values = {
  pawn: 10,
  knight: 30,
  bishop: 30,
  rook: 50,
  queen: 90,
  king: 900,
};

const evaluate = () => {};

const randomMove = (chess, boardId) => {
  removeHighlight(boardId);

  const moves = chess.moves({ verbose: true });
  const idx = Math.floor(Math.random() * moves.length);
  const move = chess.move({
    from: moves[idx].from,
    to: moves[idx].to,
    promotion: "q",
  });

  // console.log(
  //   `check: ${chess.in_check()}\n`,
  //   `checkmate: ${chess.in_checkmate()}\n`,
  //   `insufficient material: ${chess.insufficient_material()}\n`,
  //   `stalemate: ${chess.in_stalemate()}\n`,
  //   `repetition: ${chess.in_threefold_repetition()}\n`,
  //   `draw: ${chess.in_draw()}`
  // );

  highlight(chess, boardId, [move.from, move.to], true);
};

export const botMove = (chess, board, boardId, repeat = false) => {
  window.setTimeout(() => {
    randomMove(chess, boardId);
    board.position(chess.fen(), false);

    // cek status game
    if (chess.in_checkmate()) {
      alert(`game over`);
      return;
    } else if (chess.insufficient_material() || chess.in_stalemate()) {
      alert(`draw!`);
      return;
    }

    // kalo bot vs bot
    if (repeat) botMove(chess, board, boardId, repeat);
  }, 50);

  return;
};
