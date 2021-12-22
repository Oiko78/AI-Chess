import { botMove } from "./bot.js";
import { highlight, removeHighlight, inset, removeInset } from "./utility.js";

let board = null;
const boardId = "board";
const chess = new Chess();

const onDragStart = (source, piece, position, orientation) => {
  // if (
  //   (orientation === "white" && piece.search(/^w/) === -1) ||
  //   (orientation === "black" && piece.search(/^b/) === -1)
  // ) {
  //   return false;
  // }

  if (
    chess.in_checkmate() ||
    chess.insufficient_material() ||
    chess.in_stalemate()
  ) {
    console.log(chess.in_checkmate() ? `game over` : "draw");
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

  const move = chess.move({
    from: source,
    to: target,
    promotion: "q",
  });
  if (!move) {
    // highlight previous move jika ada
    highlight(chess, boardId, []);
    return "snapback";
  }

  // highlight current move
  highlight(chess, boardId, [source, target], true);

  // cek status game
  if (chess.in_checkmate()) {
    return alert(`game over`);
  } else if (chess.insufficient_material() || chess.in_stalemate()) {
    return alert(`draw!`);
  }

  // bot turns
  botMove(chess, board, boardId, false);
  console.log(chess.ascii());
};

const onSnapEnd = () => {
  // update posisi board sekarang
  board.position(chess.fen());
};

function onDragMove(newLoc, oldLoc, source, piece, position, orientation) {
  // custom inset kalo mau dipake
  removeInset(boardId, [source, oldLoc]);
  inset(boardId, [newLoc]);
}

const config = {
  draggable: true,
  dropOffBoard: "trash",
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
  onDragMove: onDragMove,
  onDrop: onDrop,
  // onMouseoutSquare: onMouseoutSquare,
  // onMouseoverSquare: onMouseoverSquare,
  // onMoveEnd: onMoveEnd,
  // onSnapbackEnd: onSnapbackEnd,
  onSnapEnd: onSnapEnd,
};

board = Chessboard(boardId, config);

// window.setTimeout(() => {
//   botMove(chess, board, boardId, true);
// }, 1000);
