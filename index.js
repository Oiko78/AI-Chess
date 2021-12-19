const config = {
  draggable: true,
  position: "start",
};
const board = Chessboard("board", config);
const chess = new Chess();

board.position(chess.fen());

// $(document).click(() => {
//   const moves = chess.moves({ verbose: true });
//   const move = moves[0];
//   chess.move(move);
//   board.position(chess.fen());
// });
