import { highlight, removeHighlight } from "./utility.js";

const whiteBestPositions = {
  p: [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
    [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
    [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
    [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
    [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
    [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ],
  n: [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
    [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
    [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
    [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
    [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
    [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  ],
  b: [
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
    [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
    [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
    [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
    [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  ],
  r: [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
  ],
  q: [
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  ],
  k: [
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
    [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
  ],
};
const blackBestPositions = { p: [], n: [], b: [], r: [], q: [], k: [] };
for (const piece in whiteBestPositions) {
  blackBestPositions[piece] = whiteBestPositions[piece].slice().reverse();
}

const values = {
  p: 10,
  n: 32,
  b: 33,
  r: 50,
  q: 90,
  k: 0,
};

let positionCount = 0;
let positionEvaluations = {};
const count = (pieces, color) => {
  let sum = 0;
  for (const piece of pieces) {
    sum +=
      values[piece.type] +
      (color === "w"
        ? whiteBestPositions[piece.type][piece.x][piece.y]
        : blackBestPositions[piece.type][piece.x][piece.y]);
  }
  return sum;
};
const getPieces = (chess) => {
  const pieces = { b: [], w: [] };
  let y = 0;
  for (const row of chess.board()) {
    let x = 0;
    for (const grid of row) {
      if (grid !== null) pieces[grid.color].push({ type: grid.type, x, y });
      x++;
    }
    y++;
  }
  return pieces;
};
const sortMoves = (moves) => {
  // sort moves based on: captured piece value and promotion if available
  return moves.sort((moveA, moveB) => {
    const color = moveA.color;

    let evaluationA = 0,
      evaluationB = 0;

    // moveA
    if (moveA.captured) {
      evaluationA += 10;
      const capturedPos = [...moveA.to];
      const capturedPiece = moveA.captured;
      const y = Number.parseInt(capturedPos[1]) - 1,
        x = capturedPos[0].charCodeAt(0) - "a".charCodeAt(0);
      // console.log(capturedPiece, y, x);

      evaluationA +=
        10 * values[capturedPiece] +
        (color === "w"
          ? blackBestPositions[capturedPiece][y][x]
          : whiteBestPositions[capturedPiece][y][x]);
    }
    if (moveA.promotion) {
      evaluationA += values[moveA.promotion];
    }

    // moveB
    if (moveB.captured) {
      evaluationB += 10;
      const capturedPos = [...moveB.to];
      const capturedPiece = moveB.captured;
      const y = Number.parseInt(capturedPos[1]) - 1,
        x = capturedPos[0].charCodeAt(0) - "a".charCodeAt(0);
      // console.log(capturedPiece, y, x);
      evaluationB +=
        10 * values[moveB.captured] +
        (color === "w"
          ? blackBestPositions[capturedPiece][y][x]
          : whiteBestPositions[capturedPiece][y][x]);
    }
    if (moveB.promotion) {
      evaluationB += values[moveB.promotion];
    }
    return evaluationB - evaluationA;
  });
};
const evaluateMove = (chess) => {
  const pieces = getPieces(chess);

  const white = count(pieces["w"], "w");
  const black = count(pieces["b"], "b");
  const evaluation = white - black;

  // relative to current orientation
  return chess.turn() === "w" ? -evaluation : evaluation;
};
const minmaxCaptures = (chess, alpha, beta, bestMove) => {
  const fen = chess.fen();

  if (fen in positionEvaluations) {
    return positionEvaluations[fen];
  }

  const evaluation = -evaluateMove(chess);
  if (evaluation >= beta) return [beta, bestMove];
  alpha = evaluation > alpha ? evaluation : alpha;

  const moves = sortMoves(
    chess.moves({ verbose: true }).filter((move) => move.flags.includes("c"))
  );

  for (const move of moves) {
    positionCount++;
    chess.move({
      from: move.from,
      to: move.to,
      promotion: "q",
    });
    let [evaluation, tempMove] = minmaxCaptures(chess, -beta, -alpha, bestMove);
    evaluation = -evaluation;
    chess.undo();
    if (evaluation >= beta) return [beta, move];
    if (evaluation > alpha || !bestMove) {
      alpha = evaluation;
      bestMove = move;
    }
  }
  return [alpha, bestMove];
};
const minmax = (chess, depth, alpha, beta, bestMove) => {
  // base case
  if (depth === 0) {
    const fen = chess.fen();

    // if position has already occured, dont evaluate again, instead get the evaluation from cache
    if (fen in positionEvaluations) {
      return positionEvaluations[fen];
    }

    positionCount++;

    // evaluate move
    const [evaluation, tempMove] = minmaxCaptures(chess, alpha, beta, bestMove);
    if (evaluation > alpha || !bestMove) {
      bestMove = tempMove;
    }

    // add current position to cache
    positionEvaluations[fen] = [evaluation, bestMove];
    return [evaluation, bestMove];
  }

  // get sorted moves to perform faster alpha beta pruning
  const moves = sortMoves(chess.moves({ verbose: true }));

  if (moves.length === 0) {
    if (chess.in_checkmate()) return [-Infinity, bestMove];
    return [0, bestMove];
  }

  for (const move of moves) {
    chess.move({
      from: move.from,
      to: move.to,
      promotion: "q",
    });
    let [evaluation, tempMove] = minmax(
      chess,
      depth - 1,
      -beta,
      -alpha,
      bestMove
    );
    evaluation = -evaluation;
    chess.undo();
    if (evaluation >= beta) return [beta, move];
    if (evaluation > alpha || !bestMove) {
      alpha = evaluation;
      bestMove = move;
    }
  }
  return [alpha, bestMove];
};
const searchMove = (chess, depth) => {
  // reset positionCount
  positionCount = 0;

  // start timer
  const d1 = new Date().getTime();

  // perform minimax alpha beta pruning to search bestMove
  const [bestEvaluation, bestMove] = minmax(
    chess,
    depth,
    -Infinity,
    Infinity,
    null
  );

  // stop timer
  const d2 = new Date().getTime();

  // calculate diffrence
  const time = d2 - d1;

  console.log(bestEvaluation, bestMove);
  console.log("time:", time / 1000);
  console.log("move:", positionCount);
  console.log("speed:", (positionCount * 1000) / time);
  return bestMove;
};
export const bot = (chess, board, boardId) => {
  // remove all highlighted moves
  removeHighlight(boardId);

  // try to move
  let move = searchMove(chess, 3);
  move = chess.move({
    from: move.from,
    to: move.to,
    promotion: "q",
  });

  // else highlight new move
  highlight(chess, boardId, [move.from, move.to], true);

  // update board
  board.position(chess.fen(), false);

  // check game status
  if (chess.in_checkmate()) {
    alert(`game over`);
    return false;
  } else if (chess.in_draw()) {
    alert("draw!");
    return false;
  }

  return true;
};
