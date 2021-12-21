const onDragStart = (source, piece, position, orientation) => {
  console.log(source, piece, position, orientation);
};

const config = {
  draggable: true,
  dropOffBoard: "snapback",
  position: "start",
  onDragStart: onDragStart,
  // onDragMove: onDragMove,
  // onDrop: onDrop,
  // onMouseoutSquare: onMouseoutSquare,
  // onMouseoverSquare: onMouseoverSquare,
  // onMoveEnd: onMoveEnd,
  // onSnapbackEnd: onSnapbackEnd,
  // onSnapEnd: onSnapEnd,
  orientation: "white",
  showNotation: true,
  sparePieces: false,
  pieceTheme: "img/chesspieces/{piece}.png",
  appearSpeed: 200,
  moveSpeed: 200,
  snapbackSpeed: 50,
  snapSpeed: 25,
  trashSpeed: 100,
};
const board = Chessboard("board", config);
const chess = new Chess();
