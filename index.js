import { botMove, debug } from "./bot.js";
import { highlight, removeHighlight, inset, removeInset } from "./utility.js";

const chess = new Chess();
const boardId = "board";
let board = null;
let player = "white";
let bot = true;

const onDragStart = (source, piece, position, orientation) => {
  // prevent to move oponent's pieces.
  if (bot) {
    if (
      (orientation === "white" && piece.search(/^w/) === -1) ||
      (orientation === "black" && piece.search(/^b/) === -1)
    )
      return false;
  }

  // prevent to move if it is end of game
  if (
    chess.in_checkmate() ||
    chess.insufficient_material() ||
    chess.in_stalemate()
  ) {
    alert(chess.in_checkmate() ? `game is over` : "game is draw");
    return false;
  }

  // highlight all available move
  highlight(chess, boardId, [
    ...chess.moves({ square: source, verbose: true }).map((move) => move.to),
  ]);
};
const onDrop = (source, target) => {
  // remove all highlighted moves
  removeHighlight(boardId);

  // try to move
  const move = chess.move({
    from: source,
    to: target,
    promotion: "q",
  });

  // validate move
  if (!move) {
    // if not then return to it previous position
    highlight(chess, boardId, []);
    return "snapback";
  }

  // else highlight new move
  highlight(chess, boardId, [source, target], true);

  // check game status
  if (chess.in_checkmate()) {
    alert(`${player} wins the game!`);
    return;
  } else if (chess.insufficient_material() || chess.in_stalemate()) {
    alert("draw!");
    return;
  }

  // next player or bot turn
  player = player == "white" ? "black" : "white";
  if (bot) {
    botMove(chess, board, boardId);
    player = player == "white" ? "black" : "white";
  }
};
const onSnapEnd = () => {
  // update board position on snap
  board.position(chess.fen(), false);
};

board = ChessBoard(boardId, {
  draggable: true,
  dropOffBoard: "snapback",
  position: "start",
  orientation: "white",
  showNotation: true,
  sparePieces: false,
  pieceTheme: "img/chesspieces/{piece}.png",
  appearSpeed: 200,
  moveSpeed: 200,
  snapbackSpeed: 50,
  snapSpeed: 0,
  trashSpeed: 100,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
});

// let loop = true;
// while (loop) {
//   loop = debug(chess, board, boardId);
//   board.position(chess.fen());
// }
