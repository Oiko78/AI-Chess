import { highlight, removeHighlight } from "./utility.js";

const getRandomMove = (chess) => {
  // all available moves
  const moves = chess.moves({ verbose: true });
  // random index
  const index = Math.floor(Math.random() * moves.length);

  return moves[index];
};

export const botMove = (chess, board, boardId, update = true) => {
  // remove all highlighted moves
  if (update) removeHighlight(boardId);

  // try to move
  let move = getRandomMove(chess);
  move = chess.move({
    from: move.from,
    to: move.to,
    promote: "q",
  });

  // else highlight new move
  if (update) highlight(chess, boardId, [move.from, move.to], true);

  // update board
  if (update) board.position(chess.fen(), false);

  // check game status
  if (chess.in_checkmate()) {
    alert(`game over`);
    return false;
  } else if (chess.insufficient_material() || chess.in_stalemate()) {
    alert("draw!");
    return false;
  }

  return true;
};

export const debug = (chess, board, boardId) => {
  // remove all highlighted moves
  removeHighlight(boardId);

  // try to move
  let move = getRandomMove(chess, boardId);
  console.log("------------");
  console.log(move);
  move = chess.move({
    from: move.from,
    to: move.to,
    promotion: "q",
  });
  console.log(move);
  console.log("------------");
  console.log(chess.ascii());
  console.log("------------");

  // else highlight new move
  highlight(chess, boardId, [move.from, move.to], true);

  // update board
  board.position(chess.fen(), false);

  // check game status
  if (chess.in_checkmate()) {
    alert(`game over!`);
    return false;
  } else if (chess.insufficient_material() || chess.in_stalemate()) {
    alert("draw!");
    return false;
  }

  return true;
};
